import { createContext, Dispatch, SetStateAction } from 'react';
import { ExifData, Tag, TagAggregateMode } from '../utils';

type AppState = {
  allImages: string[];
  filteredImages: string[];
  headerImage: string;
  selectedTags: Tag[];
  tagMode: TagAggregateMode;
  exifs: Record<string, ExifData>;
  homeScrollY: number;
  addExif: Dispatch<{ image: string; exif: ExifData }>;
  setFilteredImages: Dispatch<SetStateAction<string[]>>;
  setHomeScrollY: Dispatch<SetStateAction<number>>;
  setTagMode: Dispatch<SetStateAction<TagAggregateMode>>;
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
};

const fn = () => null;

const initialState: AppState = {
  allImages: [],
  filteredImages: [],
  headerImage: '',
  selectedTags: [],
  tagMode: TagAggregateMode.Or,
  exifs: {},
  homeScrollY: 0,
  addExif: fn,
  setFilteredImages: fn,
  setHomeScrollY: fn,
  setTagMode: fn,
  setSelectedTags: fn,
};

export const AppContext = createContext<AppState>(initialState);
