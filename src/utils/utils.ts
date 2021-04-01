import React from 'react';

/**
 * returns file name of the image number
 * @param {string} img the number of the image (e.g. 2103)
 */
export const toName = (img: string) => `img/IMG_${img}.JPG`;

/**
 * @param array array of elements
 * @param avoid one element to NOT chose
 * @returns a random element from the array that isn't the avoid element
 */
export const chooseRandom = <T>(array: T[], avoid?: T) => {
  const currentIndex = avoid ? array.indexOf(avoid) : -1;
  let index = currentIndex;

  while (index === currentIndex) {
    index = Math.floor(Math.random() * array.length);
  }

  return array[index];
};

export const isDevMode = () => '_self' in React.createElement('div');

export const PAGE_SIZE = 12;
