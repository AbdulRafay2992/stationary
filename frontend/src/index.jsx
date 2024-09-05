import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

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

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
