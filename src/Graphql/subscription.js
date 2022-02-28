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
