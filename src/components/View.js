import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import ViewImage from './ViewImage';

/**
 * View to route to an image
 */
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
