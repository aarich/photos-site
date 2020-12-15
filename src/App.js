import React, { useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './App.css';
import View from './components/View';
import ViewAll from './components/ViewAll';
import { ImageContext } from './ImageContext';
import { chooseRandom, isDevMode } from './utils/utils';
import history from './utils/history.js';

export default function App() {
  // Constants throughout the app
  const [images, setImages] = useState([]);
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
}

function loadImageNames(setImages, setHeader) {
  if (isDevMode()) {
    new Promise(function (resolve, reject) {
      setTimeout(
        () =>
          resolve(
            Array(30)
              .fill()
              .map((_, i) => '' + i)
          ),
        2000
      );
    }).then((result) => {
      setImages(result);
      setHeader(result[0]);
    });
  } else {
    fetch('/images.php', { cache: 'no-cache' })
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
        setHeader(chooseRandom(data.images));
      });
  }
}
