import { gql } from "@apollo/client";

export const GET_USER_DETAILS = gql`
  query user {
    user {
      created_at
      email
      id
      name
      updated_at
    }
  }
`;

export const GET_USER_DETAILS_BY_ID = gql`
  query user_by_pk($id: uuid!) {
    user_by_pk(id: $id) {
      name
    }
  }
`;

export const GET_ALL_TWEETS = gql`
  query tweet {
    tweet(order_by: { created_at: desc }) {
      created_at
      description
      id
      user {
        id
        name
      }
    }
  }
`;
export const GET_ALL_FOLLOWERS = gql`
  query followers {
    followers {
      follow_to
      followed_by
      id
      user {
        name
        id
      }
    }
  }
`;
