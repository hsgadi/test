import { gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
  subscription tweet {
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

export const GET_USER_DETAILS = gql`
  subscription user {
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
  subscription user_by_pk($id: uuid!) {
    user_by_pk(id: $id) {
      name
    }
  }
`;

export const GET_ALL_FOLLOWERS = gql`
  subscription followers {
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
