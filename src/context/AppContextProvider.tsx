import { FC, useEffect, useReducer, useState } from 'react';
import { ExifReducer, Tag, TagAggregateMode } from '../utils';
import { AppContext } from './AppContext';

type Props = { allImages: string[]; headerImage: string };

const AppContextProvider: FC<Props> = ({
  children,
  allImages,
  headerImage,
}) => {
  const [homeScrollY, setHomeScrollY] = useState(0);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagMode, setTagMode] = useState(TagAggregateMode.Or);
  const [exifs, addExif] = useReducer<ExifReducer>(
    (prev, { image, exif }) => ({ ...prev, [image]: exif }),
    {}
  );

  useEffect(() => {
    // Update this after the first load
    setFilteredImages(allImages);
  }, [allImages]);

  return (
    <AppContext.Provider
      value={{
        headerImage,
        allImages,
        filteredImages,
        selectedTags,
        tagMode,
        exifs,
        homeScrollY,
        addExif,
        setHomeScrollY,
        setSelectedTags,
        setFilteredImages,
        setTagMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
