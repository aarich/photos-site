import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import About from '../components/gallery/About';
import Footer from '../components/gallery/Footer';
import Gallery from '../components/gallery/Gallery';
import Header from '../components/gallery/Header';
import Jumbo from '../components/gallery/Jumbo';
import {
  getPageParam,
  PAGE_SIZE,
  scrollIntoViewIfNeeded,
  setURLParams,
  Tag,
  TagAggregateMode,
  useImageContext,
} from '../utils';
import { filterImagesByTags } from '../utils/filters';

type Props = {
  headerImage: string;
  scrollY: number;
  setScrollY: (sy: number) => void;
  setFilteredImages: (images: string[]) => void;
  setSelectedTags: (tags: Tag[]) => void;
  setTagMode: (mode: TagAggregateMode) => void;
};

const calcTotalPages = (images: string[]) =>
  Math.ceil(images.length / PAGE_SIZE);

/**
 * The gallery view of all the images
 * - headerImage: the chosen image to display as hero
 */
const ViewAll = ({
  headerImage,
  scrollY,
  setScrollY,
  setFilteredImages,
  setSelectedTags,
  setTagMode,
}: Props) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { allImages, filteredImages, selectedTags, tagMode } =
    useImageContext();
  const [page, setPage] = useState(() => getPageParam(params) - 1);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(calcTotalPages(allImages));
  const [filteredImagesHaveBeenSet, notifyFilteredImagesHaveBeenSet] =
    useReducer(() => true, false);

  useEffect(() => {
    if (allImages.length === 0 || !filteredImagesHaveBeenSet) {
      // Hold off on this until images have loaded
      return;
    }
    const calculatedTotalPages = calcTotalPages(filteredImages);
    const clampedPage = Math.max(Math.min(page, calculatedTotalPages - 1), 0);

    const offset = PAGE_SIZE * clampedPage;
    const start = Math.min(offset, filteredImages.length);
    const end = Math.min(offset + PAGE_SIZE, filteredImages.length + 1);

    setDisplayedImages(filteredImages.slice(start, end));
    setTotalPages(calculatedTotalPages);
    setPage(clampedPage);
    if (clampedPage !== page) {
      setURLParams(clampedPage, params, navigate);
    }
  }, [
    allImages.length,
    filteredImages,
    page,
    params,
    filteredImagesHaveBeenSet,
    navigate,
  ]);

  useEffect(() => {
    if (allImages.length > 0) {
      filterImagesByTags(allImages, selectedTags, tagMode).then(
        setFilteredImages
      );
      notifyFilteredImagesHaveBeenSet();
    }
  }, [allImages, selectedTags, setFilteredImages, tagMode]);

  const tilesRef = useRef<HTMLBRElement>(null);

  const setPageAndScroll = (newPage: number) => {
    setPage(newPage);

    if (tilesRef.current) {
      scrollIntoViewIfNeeded(tilesRef.current);
    }

    setURLParams(newPage, params, navigate);
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
    // @ts-expect-error https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1195
    window.scroll({ top: scrollY, behavior: 'instant' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setPage(getPageParam(params) - 1), [params]);

  return (
    <>
      <Header />
      <Jumbo image={headerImage} />
      <About />
      <Gallery
        images={displayedImages}
        onSetPage={setPageAndScroll}
        page={page}
        ref={tilesRef}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setTagMode={setTagMode}
        totalPages={totalPages}
      />
      <Footer />
    </>
  );
};

export default ViewAll;
