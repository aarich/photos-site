import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import View from './pages/View';
import ViewAll from './pages/ViewAll';
import {
  chooseRandom,
  ExifData,
  history,
  ImageContext,
  loadImageNames,
  Tag,
  TagAggregateMode,
} from './utils';

type ExifReducer = Reducer<
  Record<string, ExifData>,
  { image: string; exif: ExifData }
>;

const App = () => {
  // Constants throughout the app
  const [allImages, setImages] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagMode, setTagMode] = useState(TagAggregateMode.Or);
  const [exifs, addExif] = useReducer<ExifReducer>(
    (prev, { image, exif }) => ({ ...prev, [image]: exif }),
    {}
  );

  const [headerImage, setHeaderImage] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    loadImageNames().then((images) => {
      setHeaderImage(chooseRandom(images));
      setImages(images);
      setFilteredImages(images);
    });
  }, []);

  return (
    <ImageContext.Provider
      value={{
        allImages,
        filteredImages,
        selectedTags,
        tagMode,
        exifs,
        addExif,
      }}
    >
      <Router history={history}>
        <div className="body">
          <Switch>
            <Route path="/view">
              <View />
            </Route>
            <Route exact path="/">
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
