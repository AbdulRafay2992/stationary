import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import 'tailwindcss/tailwind.css';
import { AUTH_TOKEN, USER } from './constants';

const App = () => {
  
  const [authToken, setAuthToken] = useState(localStorage.getItem(AUTH_TOKEN));
  const [user, setUser] = useState(localStorage.getItem(USER));

  const handleLogin = (tokenAuth) => {
    localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
    localStorage.setItem(USER, tokenAuth.user.group.name);
    setAuthToken(tokenAuth.token);
    setUser(tokenAuth.user.group.name);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER);
    setAuthToken(null);
    setUser(null);
  };
  
  // // handleLogout()

  
  return (
    <div className="center w85">
      <div className="ph3 pv1 background-gray">
        <>Heeelo</>
        {
          user == null? 
            <Login onLogin={handleLogin} />:<></>
        }
        {/* <Router>
          <div className="App">
            {
              user == null ?
                <Routes>
                  <Route path="/" element={<Login onLogin={handleLogin} />}></Route>
                </Routes> : 
                <h1>Logged In as {user}</h1>
            }

          </div>
        </Router> */}
      </div>
    </div>
  );
};

export default App;