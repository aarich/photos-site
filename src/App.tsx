import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useLocation } from 'react-router-dom';

import View from './pages/View';
import ViewAll from './pages/ViewAll';
import { ImageContext, chooseRandom, history, isDevMode } from './utils';

function loadImageNames(
  setImages: (images: string[]) => void,
  setHeader: (h: string) => void
) {
  if (isDevMode()) {
    Promise.resolve(
      Array(30)
        .fill(0)
        .map((_, i) => `${i}`)
    ).then((result) => {
      setImages(result);
      setHeader(result[0]);
    });
  } else {
    fetch('/images', { cache: 'no-cache' })
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
        setHeader(chooseRandom(data.images));
      });
  }
}

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match for &apos;<code>{location.pathname}</code>&apos;
      </h3>
    </div>
  );
}

const App = () => {
  // Constants throughout the app
  const [images, setImages] = useState<string[]>([]);
  const [header, setHeader] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadImageNames(setImages, setHeader);
  }, []);

  return (
    <ImageContext.Provider value={images}>
      <Router history={history}>
        <div className="body">
          <Switch>
            <Route path="/view">
              <View />
            </Route>
            <Route path="/">
              <ViewAll
                headerImage={header}
                scrollY={scrollY}
                setScrollY={setScrollY}
              />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </ImageContext.Provider>
  );
};

export default App;
