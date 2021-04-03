import { createContext } from 'react';

import { Tag, TagAggregateMode } from './types';

type AppState = {
  allImages: string[];
  filteredImages: string[];
  selectedTags: Tag[];
  tagMode: TagAggregateMode;
};

const initialState: AppState = {
  allImages: [],
  filteredImages: [],
  selectedTags: [],
  tagMode: TagAggregateMode.Or,
};

const ImageContext = createContext<AppState>(initialState);
export default ImageContext;
