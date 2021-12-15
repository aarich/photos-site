import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ViewImageContainer from '../containers/single/ViewImageContainer';

const ReturnHome = () => {
  const history = useHistory();
  history.push('/');
  return null;
};

/**
 * View to route to an image
 */
const View = () => {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:image`}>
          <ViewImageContainer />
        </Route>
        <Route path={match.path}>
          <ReturnHome />
        </Route>
      </Switch>
    </div>
  );
};

export default View;
