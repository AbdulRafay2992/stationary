import { gql } from "@apollo/client";

export const GET_ADMINS = gql`
query admins($business: ID!)  {
  admins(business: $business) {
    id
    user {
      username
      email
    }
  }
}
`;

export const GET_USERS = gql`
  query users{
    users{
        id
        username
    }
  }
`;

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

export const GET_BUSINESSES = gql`
  query businesses {
    businesses {
      id
      name
      businessType
    }
  }
`;

export const GET_BUSINESS_TYPES = gql`
  query businessTypes{
    businessTypes
  }
`;

export const GET_CATEGORIES = gql`
query accountCategory($head: ID) {
  accountCategory (head:$head){
    id
    name
  }
}
`;
export const GET_CHART_OF_ACCOUNTS = gql`
query chartOfAccounts($business:ID) {
  chartOfAccounts(business: $business) {
    id
    accountName
    accountHead {
      id
      name
      typeName
    }
    accountCategory {
      id
      name
    }
    business {
      name
    }
  }
  accountHeadCategories {
    id
    name
    typeName
    categories {
      id
      name
    }
  }
}
`;