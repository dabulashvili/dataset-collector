import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SentencesList from "./sentences-list.component"
import PutVoice from "./put-voice.component"
import EditVoice from "./edit-voice.component"

import { UserContext } from '../context/user-context'

function MainPage() {
  const { state, dispach } = useContext(UserContext)

  return (
    <>
    <Router>
        <Route path="/" exact component={SentencesList} />
        <Route path="/voice" component={PutVoice} />
        <Route path="/voice/:sentenceId" component={EditVoice} />
    </Router>
    </>
  );
}

export default MainPage;
