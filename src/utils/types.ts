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
