import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import MainPage from "./components/main-page.component"
import LogIn from "./components/login.component"

// import { AuthService } from './services/auth.service'
import { UserProvider, UserContext } from './context/user-context'


function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(UserContext)

    console.log(state)

    return (
      <Route {...rest} render={(props) => (
        state.user
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )
  }

  return (
    <Router>
      <UserProvider>
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/" exact component={MainPage} />
      </UserProvider>
    </Router>
  );
}

export default App;
