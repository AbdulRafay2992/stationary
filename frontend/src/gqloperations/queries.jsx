import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      firstName
      lastName
    }
  }
`;

export const GET_ITEMS = gql`
query items($query: String) {
  items(query: $query) {
    id
    name
    price
    stock
    addTime
    image
  }
}
`;

export const GET_SALESMEN = gql`
  query salesmen{
    salesmen {
      user{
        id
        username
      }
      password
    }
}
`;