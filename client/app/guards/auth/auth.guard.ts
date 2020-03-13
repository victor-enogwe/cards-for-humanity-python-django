import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { map, catchError, first } from 'rxjs/operators'
import { of } from 'rxjs'
import { CanActivateType } from '../../@types/global'
import { AuthService } from '../../services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate({ routeConfig: { path } }: ActivatedRouteSnapshot): CanActivateType {
    return this.authService.authState.pipe(
      first(),
      map(token => token ? true : this.router.parseUrl('/auth')),
      catchError(() => of(this.router.parseUrl('/auth'))),
    )
  }
}
