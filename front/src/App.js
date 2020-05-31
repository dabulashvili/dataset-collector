import React, { useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import LogIn from "./components/login.component";
import MainPage from "./components/main-page.component"

import UserContext from './context/user-context';

function App() {

  const [user, setUser] = useState({})

  const updateUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
      return (Object.keys(user).length
        ? <Component {...props} />
        : <Redirect to='/login' />
      )
    }
    } />
  )

  return (
    <Router>
      <Route path="/login" render={() => <LogIn setUser={updateUser}></LogIn>} />
      <UserContext.Provider value={{ user }}>
        <PrivateRoute path="/" exact component={MainPage} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
