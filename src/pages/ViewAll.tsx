import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { ButtonToolbar } from 'react-bootstrap';

import About from '../components/gallery/About';
import Filter from '../components/gallery/filter/Filter';
import FilterList from '../components/gallery/filter/FilterList';
import Footer from '../components/gallery/Footer';
import Header from '../components/gallery/Header';
import ImageTiles from '../components/gallery/ImageTiles';
import Jumbo from '../components/gallery/Jumbo';
import Pager from '../components/gallery/Pager';
import {
  ImageContext,
  PAGE_SIZE,
  Tag,
  TagAggregateMode,
  getPageParam,
  history,
  setURLParams,
} from '../utils';
import { filterImagesByTags, toggleTag } from '../utils/filters';

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
  const { allImages, filteredImages, selectedTags, tagMode } = useContext(
    ImageContext
  );
  const [page, setPage] = useState(() => getPageParam() - 1);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(calcTotalPages(allImages));
  const [
    filteredImagesHaveBeenSet,
    notifyFilteredImagesHaveBeenSet,
  ] = useReducer(() => true, false);

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
      setURLParams(clampedPage);
    }
  }, [allImages.length, filteredImages, page, filteredImagesHaveBeenSet]);

  useEffect(() => {
    if (allImages.length > 0) {
      setFilteredImages(filterImagesByTags(allImages, selectedTags, tagMode));
      notifyFilteredImagesHaveBeenSet();
    }
  }, [allImages, selectedTags, setFilteredImages, tagMode]);

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

      <div className="d-flex justify-content-center">
        <ButtonToolbar className="d-flex justify-content-center">
          <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
          <Filter setSelectedTags={setSelectedTags} setTagMode={setTagMode} />
        </ButtonToolbar>
      </div>

      {selectedTags.length > 0 && (
        <div className="d-flex justify-content-center">
          <FilterList
            selectedTags={selectedTags}
            onPressTag={(tag) => toggleTag(tag, selectedTags, setSelectedTags)}
          />
        </div>
      )}

      <br ref={tilesRef} />

      {displayedImages.length === 0 ? (
        <div
          style={{ minHeight: 400 * 2 }}
          className="d-flex justify-content-center"
        >
          <h2>No Images Here!</h2>
        </div>
      ) : (
        <ImageTiles images={displayedImages} />
      )}

      <br />

      <div className="d-flex justify-content-center">
        <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
      </div>

      <Footer />
    </>
  );
};

export default ViewAll;
