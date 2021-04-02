import React, {
  useCallback,
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
  getPageParam,
  history,
  setURLParams,
} from '../utils';
import { filterImagesByTags } from '../utils/filters';

type Props = {
  headerImage: string;
  scrollY: number;
  setScrollY: (sy: number) => void;
};

const calcTotalPages = (images: string[]) =>
  Math.ceil(images.length / PAGE_SIZE);
/**
 * The gallery view of all the images
 * - headerImage: the chosen image to display as hero
 */
const ViewAll = ({ headerImage, scrollY, setScrollY }: Props) => {
  const images = useContext(ImageContext);
  const [page, setPage] = useState(() => getPageParam() - 1);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(calcTotalPages(images));
  const [and, toggleAnd] = useReducer((a) => !a, false);

  useEffect(() => {
    if (images.length === 0) {
      // Hold off on this until images have loaded
      return;
    }
    const filteredImages = filterImagesByTags(images, selectedTags, and);
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
  }, [page, images, selectedTags, and]);

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

  const toggleTag = useCallback(
    (tag: Tag) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    },
    [selectedTags]
  );

  return (
    <>
      <Header />
      <Jumbo image={headerImage} />
      <About />

      <div className="row justify-content-center">
        <ButtonToolbar>
          <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
          <Filter
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
            and={and}
            toggleAnd={toggleAnd}
          />
        </ButtonToolbar>
      </div>
      {selectedTags.length > 0 && (
        <div className="row justify-content-center">
          <FilterList selectedTags={selectedTags} onPressTag={toggleTag} />
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
      <div className="row justify-content-center">
        <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
      </div>
      <Footer />
    </>
  );
};

export default ViewAll;
