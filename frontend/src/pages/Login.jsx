import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../gqloperations/mutations.jsx";
import client from "../apolloClient.js";

const Login = ({ onLogin }) => {

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });
  

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
      client: client,
      variables: {
      email: formState.email,
      password: formState.password,
    },


    onCompleted: ( data ) => {
      console.log('Login Response:', data);
      onLogin(data.tokenAuth);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });



  const handleLogin = async (email, password) => {
    try {
      await login({ variables: { email, password } }); 

    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin(formState.email, formState.password);
        }}
        className="bg-orange rounded-lg shadow-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Login</h2>
        <div className="mb-4">
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Your email address"
            autoComplete="username"
            className="w-3/4 p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="password"
            placeholder={
              formState.login ? "password" : "Choose a safe password"
            }
            autoComplete="current-password"
            className="w-3/4 p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;