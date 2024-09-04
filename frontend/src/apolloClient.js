import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an HttpLink instance with the GraphQL endpoint
const httpLink = new HttpLink({
  //  uri: process.env.REACT_APP_BACK_URL,
  uri: "http://localhost:8000/graphql/", // Make sure to include the trailing slash //we can use .env
  headers: {
    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
  }
});

// Create an ApolloClient instance with the HttpLink and cache configuration
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


// export const publicClient = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://localhost:8000/publicgraphql/'
//   }), // Use this client for your public endpoint
//   cache: new InMemoryCache(),
// });

export default client;