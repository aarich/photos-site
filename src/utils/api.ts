import { ExifData } from './types';
import { isDevMode, toName } from './utils';

const DEV_IMAGES = Array(30)
  .fill(0)
  .map((_, i) => `${i}`);

const DEV_EXIF = {
  iso: 'ISO200',
  aperture: 'f/9.0',
  camera: 'Fake camera',
  date: 'September 2021',
  focal: '55/1 mm',
  shutter: '1/5000 s',
};

export const loadImageNames = () =>
  isDevMode()
    ? Promise.resolve(DEV_IMAGES)
    : fetch('/images', { cache: 'no-cache' })
        .then((response) => response.json())
        .then((data) => {
          return data.images;
        });

export const loadExifData = (image: string): Promise<ExifData> =>
  isDevMode()
    ? Promise.resolve(DEV_EXIF)
    : fetch(`/exif?img=${toName(image)}`)
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
