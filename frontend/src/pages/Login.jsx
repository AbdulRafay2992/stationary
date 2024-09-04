import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../gqloperations/mutations.jsx";

const Login = ({ onLogin }) => {

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {

      variables: {
      email: formState.email,
      password: formState.password,
    },


    onCompleted: ( data ) => {
      console.log('Login Response:', data);
      onLogin(data.tokenAuth);
      window.location.href="/";
    },
    onError: (error) => {
      console.log('errroor')
      console.error('Login error:', error);
    },
  });



  // const handleLogin = async (email, password) => {
  //   try {
  //     await login({ variables: { email, password } }); 

  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };

  return(
    <h1>Login</h1>
  )
  // return (
  //   <div className="flex flex-col items-center justify-center">
  //     {" "}
  //     <h4 className="mt-24 mb-5 text-blue-600 font-bold">
  //       Login
  //     </h4>
  //     <form 
  //       onSubmit={(event) => {
  //         event.preventDefault();
  //         handleLogin(formState.email, formState.password);
  //       }}
  //       className="w-full max-w-xs"
  //     >
  //       <div className="flex flex-col w-full">
  //         <input
  //           value={formState.email}
  //           onChange={(e) =>
  //             setFormState({
  //               ...formState,
  //               email: e.target.value,
  //             })
  //           }
  //           type="text"
  //           placeholder="Your email address"
  //           className="mb-3 border-2 border-blue-600 rounded-lg p-2"
  //           autoComplete="username"
  //         />
  //         <input
  //           value={formState.password}
  //           onChange={(e) =>
  //             setFormState({
  //               ...formState,
  //               password: e.target.value,
  //             })
  //           }
  //           type="password"
  //           placeholder={
  //             formState.login ? "password" : "Choose a safe password"
  //           }
  //           className="mb-3 border-2 border-blue-600 rounded-lg p-2"
  //           autoComplete="current-password"
  //         />
  //       </div>
  //       <div className="flex mt-3">
  //         <button
  //           type="submit"
  //           className="flex-grow mr-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
  //         >
  //           Login
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default Login;