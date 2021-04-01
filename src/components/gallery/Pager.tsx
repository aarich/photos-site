import React from 'react';

type Props = {
  setPage: (page: number) => void;
  current: number;
  total: number;
};

/**
 * List of page numbers. Selecting any page jumps directly to it
 *  - setPage: callback function
 *  - current: the current page number (zero-based)
 *  - total: number of pages.
 */
export default ({ setPage, current, total }: Props) => {
  const selected = 'btn-secondary';
  const unselected = 'btn-outline-secondary';
  return (
    <div className="d-flex justify-content-center">
      <div className="btn-group" role="group" aria-label="Basic example">
        {Array(total)
          .fill(0)
          .map((_, i) => (
            <button
              type="button"
              className={`btn ${current === i ? selected : unselected}`}
              key={i}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
};
