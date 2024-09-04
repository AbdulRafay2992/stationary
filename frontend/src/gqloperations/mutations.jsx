import { gql } from "@apollo/client";

export const CREATE_OWNER = gql`
mutation createOwner(
  $email: String!
  $username: String! 
  $password1: String! 
  $password2: String!
) {
  createOwner(
    email: $email,
    username: $username,
    password1: $password1,
    password2: $password2
    ) {
      token
      user{
        id
        username
        email
        dateJoined
      }
    }
  }
`;

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

export const CREATE_ADMIN = gql`
mutation createAdmin(
  $email: String!
  $username: String! 
  $password1: String! 
  $password2: String!,
  $business: ID!
) {
  createAdmin(
    email: $email,
    username: $username,
    password1: $password1,
    password2: $password2,
    business: $business
    ) {
    user{
      id
      username
      email
      dateJoined
    }
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation updateAdmin(
    $admin: ID!
    $email: String!
    $username: String! 
    $password: String!
  ) {
    updateAdmin(
      admin: $admin,
      email: $email,
      username: $username,
      password: $password
      ) {
        user{
          id
          username
          email
          dateJoined
        }
      }
    }
`;

export const DELETE_ADMIN = gql`
  mutation deleteAdmin(
    $business: ID!
    $admin: ID!
  ) {
    deleteAdmin(
      business: $business,
      admin: $admin,
      ) {
        done
      }
    }
`;

export const CREATE_BUSINESS = gql`
  mutation createBusiness($name: String!, $businessType: String!) {
    createBusiness(name: $name, businessType: $businessType) {
      id
      name
      businessType
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation updateBusiness($id: ID!, $name: String!, $businessType: String!) {
    updateBusiness(id: $id, name: $name, businessType: $businessType) {
      success
      business {
        id
        name
        businessType
      }
    }
  }
`;

export const DELETE_BUSINESS = gql`
  mutation deleteBusiness($id: ID!) {
    deleteBusiness(id: $id) {
      success
    }
  }
`;

export const CREATE_ACCOUNT_CHART = gql`
    mutation createChartOfAccount ($business:ID!,$chart:ID, $accountHead:ID!, $accountCategory: ID!, $accountName: String!){
      createChartOfAccount(business: $business,chart:$chart, accountHead: $accountHead, accountCategory: $accountCategory accountName: $accountName){
        chartOfAccount{
          id
          accountName
          accountHead{
            id
            name
            typeName
          }
          accountCategory{
            id
            name
          }
          business{
            name
          }
        }
      }
    }
  `

export const DELETE_ACCOUNT_CHART = gql`
mutation deleteChartOfAccount ($chart: ID!){
  deleteChartOfAccount(chart:$chart){
    result
  }
}
`;
