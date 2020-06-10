import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import SentenceList from "./components/sentences-list.component"
import LogIn from "./components/login.component"
import TopBar from "./components/app-bar.component"
import RecordComponent from "./components/record.component"

import { UserProvider, UserContext } from './context/user-context'
import RecordsList from './components/records-list.component';


function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => {

    const { state } = useContext(UserContext)
    return (
      <Route {...rest} render={(props) => (
        state.user
          ? <TopBar {...props}>
            <Component {...props}></Component>
          </TopBar>
          : <Redirect to='/login' />
      )} />
    )
  }

  return (
    <Router>
      <UserProvider>
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/" exact component={() => <Redirect to='/sentences' />} />
        <PrivateRoute path="/sentences" exact component={SentenceList} />
        <PrivateRoute path="/records" component={RecordsList} />
        <PrivateRoute path="/record/:id?" component={RecordComponent} />
      </UserProvider>
    </Router>
  );
}

export default App;
