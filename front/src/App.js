import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import MainPage from "./components/main-page.component"
import SentenceList from "./components/sentences-list.component"
import LogIn from "./components/login.component"
import Header from "./components/header.component"
import EditVoice from "./components/edit-voice.component"
import SingleRecordComponent from "./components/single-record.component"

// import { AuthService } from './services/auth.service'
import { UserProvider, UserContext } from './context/user-context'


function App(props) {
  const rows = [
    {
      name: 'zoro',
    },
    {
      name: 'zoro0',
    },
    {
      name: 'zoro1',
    },
    {
      name: 'zoro2',
    },
    {
      name: 'zoro3',
    },
  ];
  const history = useHistory();

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(UserContext)

    console.log(state)

    return (
      <Route {...rest} render={(props) => (
        state.user
          ? <Component rows={rows} {...props} />
          : <Redirect to='/login' />
      )} />
    )
  }

  return (
    <Router>
    <Header history={history}/>
      <UserProvider>
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/edit-voice" component={EditVoice} />
        <PrivateRoute path="/single-record/:id" component={SingleRecordComponent} />
        {/*<PrivateRoute path="/" exact component={MainPage} />*/}
        <PrivateRoute rows={rows} history={history} path="/" exact component={SentenceList} />
      </UserProvider>
    </Router>
  );
}

export default App;
