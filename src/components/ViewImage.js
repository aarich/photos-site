import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageContext } from '../ImageContext';
import Header from './Header';
import ImageExif from './ImageExif';
import { PAGE_SIZE, toName } from '../utils/utils';
import Footer from './Footer';
import history from '../utils/history';

/**
 * View a single image and its data
 */
export default function ViewImage() {
  const images = useContext(ImageContext);
  let { image } = useParams();
  const [newer, setNewer] = useState('');
  const [older, setOlder] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    if (!images.includes(image)) {
      history.push('/');
    }

    setLinks(setNewer, setOlder, setPage, image, images);
  }, [image, images]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        history.push(`/?p=${page}`);
      } else if (e.key === 'ArrowLeft') {
        history.push(`/view/${newer}`);
      } else if (e.key === 'ArrowRight') {
        history.push(`/view/${older}`);
      }
    };

    document.body.addEventListener('keyup', handler);

    return () => document.body.removeEventListener('keyup', handler);
  }, [newer, older, page]);

  const w = window.innerWidth;
  const h = window.innerHeight;
  const src = '/resize.php?img=' + toName(image) + '&w=' + w + '&h=' + h;

  return (
    <div>
      <Header newer={newer} older={older} page={page} />
      <div className="img-display">
        <img src={src} alt="display" />
      </div>
      <ImageExif image={image} />
      <Footer />
    </div>
  );
}

function setLinks(setNewer, setOlder, setPage, image, images) {
  const currentIndex = images.indexOf(image);

  const newer = currentIndex - 1;
  const older = currentIndex + 1;

  setNewer(images[newer < 0 ? images.length - 1 : newer]);
  setOlder(images[older >= images.length ? 0 : older]);

  // Figure out what page this image is on
  setPage(Math.floor(currentIndex / PAGE_SIZE) + 1);
}
