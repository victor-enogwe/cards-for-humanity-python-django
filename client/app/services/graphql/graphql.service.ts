import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  FetchResult,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  split,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Storage } from '@ionic/storage';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { IonicStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { sha256 } from 'crypto-hash';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Definition } from '../../@types/global';
import { IntrospectionLink, resolvers, typeDefs, typePolicies } from '../../graphql';
import possibleTypes from '../../graphql/possible-types';
import { HttpLinkService } from '../http-link/http-link.service';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  directives = 'directive @client on FIELD';
  cache: InMemoryCache = new InMemoryCache({
    canonizeResults: true,
    resultCaching: true,
    addTypename: true,
    typePolicies,
    possibleTypes: possibleTypes.possibleTypes,
  });
  ssr = isPlatformServer(this.platformId);
  introspectionLink = new IntrospectionLink();
  headersLink = setContext(this.headers.bind(this));
  errorLink = onError(this.handleErrors.bind(this));
  persistedQueryLink = createPersistedQueryLink({ sha256 });
  wsLink = this.ssr
    ? new ApolloLink()
    : new WebSocketLink({ uri: environment.WS_LINK, options: { reconnect: true, connectionParams: { authToken: '' }, lazy: true } });
  link = from([
    this.introspectionLink,
    this.persistedQueryLink,
    this.headersLink,
    split(this.queryKind.bind(this), this.httpLink, this.wsLink),
  ]);
  config: ApolloClientOptions<NormalizedCacheObject> = {
    link: this.link,
    cache: this.cache,
    connectToDevTools: !environment.production,
    queryDeduplication: true,
    typeDefs,
    assumeImmutableResults: true,
    name: 'cah',
    version: '0.1',
    ssrMode: this.ssr,
    uri: environment.HTTP_LINK,
    resolvers,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        returnPartialData: true,
        errorPolicy: 'none',
      },
      mutate: {
        errorPolicy: 'none',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'none',
      },
    },
  };

  constructor(
    private readonly storage: Storage,
    private httpLink: HttpLinkService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService,
  ) {}

  async initCache() {
    return this.storage.create().then((store) =>
      persistCache({
        cache: this.cache,
        key: '__cah',
        debug: !environment.production,
        storage: new IonicStorageWrapper(store),
      }),
    );
  }

  queryKind({ query }: any): boolean {
    const { kind, operation }: Definition = getMainDefinition(query);
    switch (kind) {
      case 'OperationDefinition':
        switch (operation) {
          case 'subscription':
            return false;
          default:
            return true;
        }
      default:
        return true;
    }
  }

  headers(_: any, { headers }: any): { headers: { [key: string]: string } } {
    return {
      headers: {
        Accept: 'charset=utf-8',
        'Content-Type': 'application/json',
        'X-CSRFToken': this.cookieService.get('csrftoken'),
        ...headers,
      },
    };
  }

  handleErrors({ graphQLErrors, networkError }: ErrorResponse): Observable<FetchResult> | void {
    const messages = graphQLErrors ? graphQLErrors.map(({ message }) => message).join('. \n') : networkError?.message;
    throw new Error(messages);
  }
}
