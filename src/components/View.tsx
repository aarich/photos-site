import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import ViewImage from './ViewImage';

const ReturnHome = () => {
  const history = useHistory();
  history.push('/');
  return null;
};

/**
 * View to route to an image
 */
export default () => {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:image`}>
          <ViewImage />
        </Route>
        <Route path={match.path}>
          <ReturnHome />
        </Route>
      </Switch>
    </div>
  );
};
