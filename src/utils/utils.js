/**
 * returns file name of the image number
 * @param {string} img the number of the image (e.g. 2103)
 */
export function toName(img) {
  return `img/IMG_${img}.JPG`;
}

export function chooseRandom(array, avoid) {
  const currentIndex = avoid ? array.indexOf(avoid) : -1;
  let index = currentIndex;

  while (index === currentIndex) {
    index = Math.floor(Math.random() * array.length);
  }

  return array[index];
}
