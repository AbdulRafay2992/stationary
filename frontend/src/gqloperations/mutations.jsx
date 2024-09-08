import { gql } from "@apollo/client";



export const LOGIN_MUTATION = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      user{
        email
        group{
          name
        }
      }
    }
  }
`;

export const NEW_ITEM_MUTATION = gql`
mutation newItem ($name: String!, $price: String!, $image: String!) {
  newItem(name: $name, price: $price, image: $image) {
    item {
      name
      price
      image
    }
  }
}
`;
export const DEL_ITEM_MUTATION = gql`
mutation delItem ($id: Int!) {
  delItem(id: $id) {
    done
  }
}`;

export const NEW_SALESMAN_MUTATION = gql`
mutation newSalesman(
  $username: String! 
  $password: String!
) {
  newSalesman(
    username: $username,
    password: $password,
    ) {
      user {
        password
        user {
          username
        }
      }
  }
}
`;
export const DEL_SALESMAN_MUTATION = gql`
mutation delSalesman ($id: Int!) {
  delSalesman(id: $id) {
    done
  }
}`;