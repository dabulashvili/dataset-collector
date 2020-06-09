import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import SentenceList from "./components/sentences-list.component"
import LogIn from "./components/login.component"
import Header from "./components/header.component"
import EditVoice from "./components/edit-voice.component"
import RecordComponent from "./components/record.component"

import { UserProvider, UserContext } from './context/user-context'
import RecordsList from './components/records-list.component';


function App() {
  const history = useHistory();

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(UserContext)

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
    <Header history={history}/>
      <UserProvider>
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/" exact component={() => <Redirect to='/sentences'/>} />
        <PrivateRoute path="/sentences" exact component={SentenceList} />
        <PrivateRoute path="/records" component={RecordsList} />
        <PrivateRoute path="/record/:id?" component={RecordComponent} />
      </UserProvider>
    </Router>
  );
}

export default App;
