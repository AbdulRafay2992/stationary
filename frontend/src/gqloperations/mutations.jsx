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
mutation delItem ($id: ID!) {
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
export const ItemInput = gql`
  input ItemInput {
    id: Int!
    quantity: Int!
    discount: Int!
  }
`;
export const BillItem = gql`
  input BillItem {
      id: Int!
      quantity: Int!
      discount: Int!
    }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($bill: [BillItem!]!) {
    createOrder(bill: $bill) {
      bill
    }
  }
`;
export const UPDATE_ITEM_PRICE_MUTATION = gql`
  mutation UpdateItemPrice($id: ID!, $price: Int!) {
    updateItemPrice(id: $id, price: $price) {
      item {
        id
        price
      }
    }
  }
`;

export const UPDATE_ITEM_STOCK_MUTATION = gql`
  mutation UpdateItemStock($id: ID!, $stock: Int!) {
    updateItemStock(id: $id, stock: $stock) {
      item {
        id
        stock
      }
    }
  }
`;