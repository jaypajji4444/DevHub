import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

const App=()=>(
  <Fragment>
  <Navbar/>
  <Landing/>
  </Fragment>
)

export default App;
