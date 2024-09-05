import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "https://api.prostworkspace.com/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const GET_ENTITIES = gql`
  query GetEntities($userId: String!) {
    entities(where: {
      user: {eq: $userId}
    }) {
      uid
      userId
      title
      description
      deadline
      status
      type
      doneAt
      workspaceUid
    }
  }
`;

export const SAVE_ENTITY = gql`
  mutation SaveEntity($uid: String!, $userId: String!, $title: String!, $description: String!, $deadline: String!, $status: String!, $type: String!, $workspaceUid: String) {
    saveEntity(
      uid: $uid
      userId: $userId
      title: $title
      description: $description
      deadline: $deadline
      status: $status
      type: $type
      workspaceUid: $workspaceUid
    ) {
      uid
      userId
      title
      description
      deadline
      status
      type
      workspaceUid
    }
  }
`;

export const DELETE_ENTITY = gql`
  mutation DeleteEntity($userId: String!, $uid: String!) {
    deleteEntity(userId: $userId, uid: $uid) {
      errors
    }
  }
`;

export const GET_WORKSPACES = gql`
  query GetWorkspaces($userId: String!) {
    workspaces(where: {
      user: {eq: $userId}
    }) {
      uid
      name
    }
  }
`;


