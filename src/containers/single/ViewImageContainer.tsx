import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ViewImage from '../../components/single/ViewImage';
import { useFilteredImages } from '../../context/selectors';
import { PAGE_SIZE, toName } from '../../utils';

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
  const navigate = useNavigate();
  const filteredImages = useFilteredImages();
  const { image } = useParams<{ image: string }>();
  const [newer, setNewer] = useState('');
  const [older, setOlder] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (filteredImages.length === 0) {
      // wait for now
    } else if (!image || !filteredImages.includes(image)) {
      navigate('/', { replace: true });
    } else {
      setLinks(setNewer, setOlder, setPage, image, filteredImages);
    }
  }, [image, filteredImages, navigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(`/?p=${page}`);
      } else if (e.key === 'ArrowLeft') {
        navigate(`/view/${newer}`);
      } else if (e.key === 'ArrowRight') {
        navigate(`/view/${older}`);
      }
    };

    document.body.addEventListener('keyup', handler);

    return () => document.body.removeEventListener('keyup', handler);
  }, [newer, older, page, navigate]);

  const w = window.innerWidth;
  const h = window.innerHeight;
  if (!image) {
    return null;
  }

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
