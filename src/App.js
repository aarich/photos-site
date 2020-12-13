import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import View from './components/View';
import ViewAll from './components/ViewAll';

export default function App() {
  return (
    <Router>
      <div className="body">
        <Switch>
          <Route path="/view">
            <View />
          </Route>
          <Route path="/">
            <ViewAll />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
