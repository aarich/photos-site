import { ExifData } from './types';
import { isDevMode, toName } from './utils';

export const loadImageNames = () =>
  isDevMode()
    ? Promise.resolve(
        Array(30)
          .fill(0)
          .map((_, i) => `${i}`)
      )
    : fetch('/images', { cache: 'no-cache' })
        .then((response) => response.json())
        .then((data) => {
          return data.images;
        });

export const loadExifData = (image: string) =>
  fetch(`/exif?img=${toName(image)}`)
    .then((response) => response.text())
    .then((text) => {
      let data: ExifData;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { error: 'Failed to parse EXIF data.' };
      }
      return data;
    });
