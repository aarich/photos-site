import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewImage from '../../components/single/ViewImage';
import { history, PAGE_SIZE, toName, useFilteredImages } from '../../utils';

const setLinks = (
  setNewer: (newer: string) => void,
  setOlder: (older: string) => void,
  setPage: (page: number) => void,
  image: string,
  images: string[]
) => {
  const currentIndex = images.indexOf(image);

  const newer = currentIndex - 1;
  const older = currentIndex + 1;

  setNewer(images[newer < 0 ? images.length - 1 : newer]);
  setOlder(images[older >= images.length ? 0 : older]);

  // Figure out what page this image is on
  setPage(Math.floor(currentIndex / PAGE_SIZE) + 1);
};

/**
 * View a single image and its data
 */
const ViewImageContainer = () => {
  const filteredImages = useFilteredImages();
  const { image } = useParams<{ image: string }>();
  const [newer, setNewer] = useState('');
  const [older, setOlder] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (filteredImages.length === 0) {
      return;
    }

    if (!filteredImages.includes(image)) {
      history.push('/notfound');
      return;
    }

    setLinks(setNewer, setOlder, setPage, image, filteredImages);
  }, [image, filteredImages]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
  const src = `/resize?img=${toName(image)}&w=${w}&h=${h}`;

  return (
    <ViewImage
      image={image}
      newer={newer}
      older={older}
      page={page}
      src={src}
    />
  );
};

export default ViewImageContainer;
