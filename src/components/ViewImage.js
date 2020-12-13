import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageContext } from '../ImageContext';
import Header from './Header';
import ImageExif from './ImageExif';

export default function ViewImage() {
  const images = useContext(ImageContext);
  let { image } = useParams();
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');

  useEffect(() => {
    if (images.length === 0) {
      return;
    }
    setLinks(setNext, setPrev, image, images);
  }, [image, images]);

  const w = window.innerWidth;
  const h = window.innerHeight;
  const src = 'resize.php?img=' + image + '&w=' + w + '&h=' + h;

  return (
    <div>
      <Header next={next} prev={prev} />
      <div className="img-display">
        <img src={src} alt="display" />
      </div>
      <ImageExif image={image} />
    </div>
  );
}

function setLinks(setNext, setPrev, image, images) {
  const currentIndex = images.indexOf(image);
  const next = currentIndex + 1;
  const prev = currentIndex - 1;

  setNext(images[next >= images.length ? 0 : next]);
  setPrev(images[prev < 0 ? images.length - 1 : prev]);
}
