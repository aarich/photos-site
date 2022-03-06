import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewImageContainer from './containers/single/ViewImageContainer';
import AppContextProvider from './context/AppContextProvider';
import NoMatch from './pages/NoMatch';
import ViewAll from './pages/ViewAll';
import { chooseRandom, loadImageNames } from './utils';

const App = () => {
  // Constants throughout the app
  const [allImages, setImages] = useState<string[]>([]);
  const [headerImage, setHeaderImage] = useState('');

  useEffect(() => {
    loadImageNames().then((images) => {
      setHeaderImage(chooseRandom(images));
      setImages(images);
    });
  }, []);

  return (
    <AppContextProvider headerImage={headerImage} allImages={allImages}>
      <BrowserRouter>
        <div className="body">
          <Routes>
            <Route path="/" element={<ViewAll />} />
            <Route path="view">
              <Route path=":image" element={<ViewImageContainer />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
