import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($password: String, $username: String!) {
    login(username: $username, password: $password) {
      access_token
      id
      role
    }
  }
`;

export const REGISTER_USER = gql`
  mutation insert_user_one($email: String, $name: String) {
    insert_user_one(object: { email: $email, name: $name }) {
      id
    }
  }
`;

export const INSERT_TWEET_ONE = gql`
  mutation insert_tweet_one($user_id: uuid, $description: String) {
    insert_tweet_one(object: { user_id: $user_id, description: $description }) {
      id
    }
  }
`;

export const INSERT_FOLLOWER_ONE = gql`
  mutation insert_followers_one($followed_by: uuid, $follow_to: uuid) {
    insert_followers_one(
      object: { followed_by: $followed_by, follow_to: $follow_to }
    ) {
      id
    }
  }
`;

export const DELETE_FOLLOWER_ONE = gql`
  mutation delete_followers($followed_by: uuid, $follow_to: uuid) {
    delete_followers(
      where: {
        followed_by: { _eq: $followed_by }
        follow_to: { _eq: $follow_to }
      }
    ) {
      affected_rows
    }
  }
`;
