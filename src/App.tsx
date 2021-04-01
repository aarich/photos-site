import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import View from './components/View';
import ViewAll from './components/ViewAll';
import ImageContext from './ImageContext';
import history from './utils/history';
import { chooseRandom, isDevMode } from './utils/utils';

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
          </Switch>
        </div>
      </Router>
    </ImageContext.Provider>
  );
};

export default App;
