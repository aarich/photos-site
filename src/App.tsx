import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useLocation } from 'react-router-dom';
import View from './pages/View';
import ViewAll from './pages/ViewAll';
import {
  chooseRandom,
  history,
  ImageContext,
  isDevMode,
  Tag,
  TagAggregateMode,
} from './utils';

const loadImageNames = (setHeader: (h: string) => void) =>
  isDevMode()
    ? Promise.resolve(
        Array(30)
          .fill(0)
          .map((_, i) => `${i}`)
      ).then((result) => {
        setHeader(result[0]);
        return result;
      })
    : fetch('/images', { cache: 'no-cache' })
        .then((response) => response.json())
        .then((data) => {
          setHeader(chooseRandom(data.images));
          return data.images;
        });

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
  const [allImages, setImages] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagMode, setTagMode] = useState(TagAggregateMode.Or);

  const [headerImage, setHeaderImage] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadImageNames(setHeaderImage).then((images) => {
      setImages(images);
      setFilteredImages(images);
    });
  }, []);

  return (
    <ImageContext.Provider
      value={{ allImages, filteredImages, selectedTags, tagMode }}
    >
      <Router history={history}>
        <div className="body">
          <Switch>
            <Route path="/view">
              <View />
            </Route>
            <Route path="/">
              <ViewAll
                {...{
                  headerImage,
                  scrollY,
                  setScrollY,
                  setFilteredImages,
                  setTagMode,
                  setSelectedTags,
                }}
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
