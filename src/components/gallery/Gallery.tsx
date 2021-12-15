import React, { forwardRef, RefObject } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { useAppContext } from '../../context/selectors';
import { toggleTag } from '../../utils';
import Filter from './filter/Filter';
import FilterList from './filter/FilterList';
import ImageTiles from './ImageTiles';
import Pager from './Pager';

type Props = {
  images: string[];
  page: number;
  totalPages: number;
  onSetPage: (p: number) => void;
  ref: RefObject<HTMLBRElement>;
};

/**
 * The gallery view of all the images
 * - headerImage: the chosen image to display as hero
 */
const ViewAll = forwardRef<HTMLBRElement, Props>(
  ({ images, page, totalPages, onSetPage }, ref) => {
    const { setSelectedTags, setTagMode, selectedTags } = useAppContext();

    return (
      <>
        <div className="d-flex justify-content-center">
          <ButtonToolbar className="d-flex justify-content-center">
            <Pager current={page} total={totalPages} setPage={onSetPage} />
            <Filter setSelectedTags={setSelectedTags} setTagMode={setTagMode} />
          </ButtonToolbar>
        </div>

        {selectedTags.length > 0 && (
          <div className="d-flex justify-content-center">
            <FilterList
              selectedTags={selectedTags}
              onPressTag={(tag) =>
                toggleTag(tag, selectedTags, setSelectedTags)
              }
            />
          </div>
        )}

        <br ref={ref} />

        {images.length === 0 ? (
          <div
            style={{ minHeight: 400 * 2 }}
            className="d-flex justify-content-center"
          >
            <h2>No Images Here!</h2>
          </div>
        ) : (
          <ImageTiles images={images} />
        )}

        <br />

        <div className="d-flex justify-content-center">
          <Pager current={page} total={totalPages} setPage={onSetPage} />
        </div>
      </>
    );
  }
);

export default ViewAll;
