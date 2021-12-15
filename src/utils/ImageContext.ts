import { createContext, Dispatch, useContext } from 'react';
import { ExifData } from '.';
import { Tag, TagAggregateMode } from './types';

type AppState = {
  allImages: string[];
  filteredImages: string[];
  selectedTags: Tag[];
  tagMode: TagAggregateMode;
  exifs: Record<string, ExifData>;
  addExif: Dispatch<{ image: string; exif: ExifData }>;
};

const initialState: AppState = {
  allImages: [],
  filteredImages: [],
  selectedTags: [],
  tagMode: TagAggregateMode.Or,
  exifs: {},
  addExif: () => null,
};

export const ImageContext = createContext<AppState>(initialState);

export const useImageContext = () => useContext(ImageContext);
