import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import View from './components/View';
import ViewAll from './components/ViewAll';
import { ImageContext } from './ImageContext';
import { chooseRandom } from './utils/utils';

export default function App() {
  const [images, setImages] = useState([]);
  const [header, setHeader] = useState('');

  useEffect(() => {
    loadImageNames(setImages, setHeader);
  }, []);

  document.title = 'Photos By Alex';

  return (
    <ImageContext.Provider value={images}>
      <Router>
        <div className="body">
          <Switch>
            <Route path="/view">
              <View />
            </Route>
            <Route path="/">
              <ViewAll headerImage={header} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ImageContext.Provider>
  );
}

function loadImageNames(setImages, setHeader) {
  fetch('/images.php')
    .then((response) => response.json())
    .then((data) => {
      setImages(data.images);
      setHeader(chooseRandom(data.images));
    });
}
