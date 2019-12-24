import React from 'react';
import './App.css';
import { LoginPage, AdminPage } from '../src/pages';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  console.log(process.env.REACT_APP_BASE_URL, 'env')
  return (
    <Router>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/admin" component={AdminPage} />
    </Router>
  );
}

export default App;
