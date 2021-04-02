export type ExifData = ExifError | ExifSuccess;

export type ExifError = { error: string };
export type ExifSuccess = {
  date: string;
  camera: string;
  aperture: string;
  iso: string;
  shutter: string;
  focal: string;
};

export enum Tag {
  Sunset = 'Sunset',
  Sunrise = 'Sunrise',
  Beach = 'Beach',
  Ocean = 'Ocean',
  Mountain = 'Mountain',
  Snow = 'Snow',
  Lake = 'Lake',
  Flowers = 'Flowers',
  Macro = 'Macro',
  Wildlife = 'Wildlife',
  Yosemite = 'Yosemite',
  Structures = 'Structures',
  International = 'International',
  Perspective = 'Perspective',
  Waterfall = 'Waterfall',
  NationalPark = 'National Park',
  Fall = 'Fall',
}

export type ImageInfo = {
  [image: string]: { tags: Tag[] };
};
