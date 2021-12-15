import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewImageContainer from './containers/single/ViewImageContainer';
import NoMatch from './pages/NoMatch';
import ViewAll from './pages/ViewAll';
import {
  chooseRandom,
  ExifData,
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
      <BrowserRouter>
        <div className="body">
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            <Route path="view">
              <Route path=":image" element={<ViewImageContainer />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ImageContext.Provider>
  );
};

export default App;
