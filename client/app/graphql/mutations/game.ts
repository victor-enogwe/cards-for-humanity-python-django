import { gql } from 'client/app/utils/gql';
import { GAME_NODE_FRAGMENT } from '../fragments';

export const CREATE_GAME_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      game {
        ...GameNode
      }
    }
  }
`;

export const CREATE_GAME_LOCAL_MUTATION = gql`
  ${GAME_NODE_FRAGMENT}

  mutation CreateGameLocal($input: CreateGameInput!) {
    createGameLocal(input: $input) @client {
      ...GameNode
    }
  }
`;
