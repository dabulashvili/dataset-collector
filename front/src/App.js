import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MainPage from "./components/main-page.component"
import login from "./components/login.component"

function App() {
  return (
    <MainPage></MainPage>
  );
}

export default App;
