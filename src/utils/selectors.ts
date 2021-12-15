import { useImageContext } from './ImageContext';

export const useAllImages = () => useImageContext().allImages;
export const useFilteredImages = () => useImageContext().filteredImages;
export const useExifData = (image: string) => useImageContext().exifs[image];
export const useAddExif = () => useImageContext().addExif;
