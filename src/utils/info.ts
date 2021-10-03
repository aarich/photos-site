import { ImageInfo } from './types';

const info: { current?: ImageInfo } = {};

export const loadImageInfo = () =>
  fetch('/tags.json', { cache: 'no-cache' })
    .then((response) => response.json())
    .then((data) => {
      info.current = data;
    });

export default info;
