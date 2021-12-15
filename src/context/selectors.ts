import { Dispatch, useContext } from 'react';
import { ExifData } from '../utils';
import { AppContext } from './AppContext';

type UseExifReturn = [
  ExifData | undefined,
  Dispatch<{ image: string; exif: ExifData }>
];

export const useAppContext = () => useContext(AppContext);
export const useAllImages = () => useAppContext().allImages;
export const useFilteredImages = () => useAppContext().filteredImages;
export const useExif = (image: string): UseExifReturn => [
  useAppContext().exifs[image],
  useAppContext().addExif,
];
