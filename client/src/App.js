import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alerts from './components/Alerts';
import AlertState from './context/alert/AlertState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CreateTask from './components/createTask';
import NavBar from './components/navBar';
import EditTask from './components/editTask';
import HomePage from './components/homePage';

function App() {
  return (
    <AlertState>
      <div className="container">
        <Alerts />
        <Router>
          <NavBar />
          <Switch>
            <Route path="/create" component={CreateTask} />
          </Switch>

          <Route exact path="/" component={HomePage} />
          <Route exact path="/tasks/update/:id" component={EditTask} />
        </Router>
      </div>
    </AlertState>
  );
}

export default App;
