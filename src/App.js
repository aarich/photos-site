import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import View from './components/View';
import ViewAll from './components/ViewAll';
import { ImageContext } from './ImageContext';

export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImageNames(setImages);
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
              <ViewAll />
            </Route>
          </Switch>
        </div>
      </Router>
    </ImageContext.Provider>
  );
}

function loadImageNames(setImages) {
  console.log('LOADING IMAGES');
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(['1', '2', '3', '4', '5', '6', '7', '8']), 2000);
  }).then((result) => {
    setImages(result);
  });
}
