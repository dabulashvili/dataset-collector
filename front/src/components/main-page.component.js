import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SentencesList from "./sentences-list.component"
import PutVoice from "./put-voice.component"
import EditVoice from "./edit-voice.component"

function MainPage() {
  return (
    <Router>

      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
            {/* <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" /> */}
          </a>
          <Link to="/" className="navbar-brand">Dataset recording app</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Sentences</Link>
              </li>
              <li className="navbar-item">
                <Link to="/voice" className="nav-link">Record</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/" exact component={SentencesList} />
        <Route path="/voice" component={PutVoice} />
        <Route path="/voice/:sentenceId" component={EditVoice} />
      </div>

    </Router>
  );
}

export default MainPage;
