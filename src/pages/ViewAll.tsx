import React, { useContext, useEffect, useRef, useState } from 'react';

import About from '../components/gallery/About';
import Footer from '../components/gallery/Footer';
import Header from '../components/gallery/Header';
import ImageTiles from '../components/gallery/ImageTiles';
import Jumbo from '../components/gallery/Jumbo';
import Pager from '../components/gallery/Pager';
import {
  ImageContext,
  PAGE_SIZE,
  getPageParam,
  history,
  setURLParams,
} from '../utils';

type Props = {
  headerImage: string;
  scrollY: number;
  setScrollY: (sy: number) => void;
};

/**
 * The gallery view of all the images
 * - headerImage: the chosen image to display as hero
 */
const ViewAll = ({ headerImage, scrollY, setScrollY }: Props) => {
  const images = useContext(ImageContext);
  const [page, setPage] = useState(() => getPageParam() - 1);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);

  useEffect(() => {
    if (images.length > 0 && page > Math.ceil(images.length / PAGE_SIZE)) {
      setPage(0);
    }

    const offset = PAGE_SIZE * page;
    const start = Math.min(offset, images.length);
    const end = Math.min(offset + PAGE_SIZE, images.length + 1);
    setDisplayedImages(images.slice(start, end));
  }, [page, images]);

  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  const tilesRef = useRef<HTMLBRElement>(null);

  const setPageAndScroll = (newPage: number) => {
    setPage(newPage);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tilesRef.current?.scrollIntoViewIfNeeded();

    setURLParams(newPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollY(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollY]);

  useEffect(() => {
    window.scrollTo(0, scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => history.listen(() => setPage(getPageParam() - 1)), []);

  return (
    <>
      <Header />
      <Jumbo image={headerImage} />
      <About />
      {displayedImages.length === 0 ? (
        <div style={{ minHeight: 400 * 2 }} />
      ) : (
        <>
          <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
          <br ref={tilesRef} />
          <ImageTiles images={displayedImages} />
          <br />
          <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
        </>
      )}
      <Footer />
    </>
  );
};

export default ViewAll;
