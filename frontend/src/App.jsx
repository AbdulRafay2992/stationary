import React, { useState } from 'react';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Salesman from './pages/Salesman';
import { AUTH_TOKEN, USER } from './constants';

const App = () => {
  
  const [authToken, setAuthToken] = useState(localStorage.getItem(AUTH_TOKEN));
  const [user, setUser] = useState(localStorage.getItem(USER));

  const handleLogin = (tokenAuth) => {
    localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
    localStorage.setItem(USER, tokenAuth.user.group.name);
    setAuthToken(tokenAuth.token);
    setUser(tokenAuth.user.group.name);
    window.location.href="/";
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER);
    setAuthToken(null);
    setUser(null);
    window.location.href="/";
  };
  
  return (
    <div>
      <div> 
        {(() => {
          switch (user) {
            case null:
              return <Login onLogin={handleLogin} />;
            case "admin":
              return <Admin onLogout={handleLogout} />;
            case "salesman":
              return <Salesman onLogout={handleLogout} />;
          }
        })()}
      </div>
    </div>
  );
};

export default App;