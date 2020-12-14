import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import ViewImage from './ViewImage';

export default function View() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:image`}>
          <ViewImage base={match.path} />
        </Route>
        <Route path={match.path}>
          <ReturnHome />
        </Route>
      </Switch>
    </div>
  );
}

function ReturnHome() {
  const history = useHistory();
  history.push('/');
  return null;
}
