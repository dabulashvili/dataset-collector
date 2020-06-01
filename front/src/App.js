import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import MainPage from "./components/main-page.component"
import Login from "./components/login.component"
import SentenceList from "./components/sentences-list.component"

const getInfo = () => {
  const login = localStorage.getItem('login')
  console.log(login)
  return login
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    getInfo()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App() {
  return (
    <Router>
      <Route path="/" exact component={MainPage}/>
      <Route path="/login" exact component={Login}/>
      <PrivateRoute path='/protected' exact component={() => <>protected</>} />
      <PrivateRoute path='/sentences' exact component={SentenceList} />

  </Router>  
  );
}

export default App;
