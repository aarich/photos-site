import React from 'react';

/**
 * List of page numbers. Selecting any page jumps directly to it
 * @param {object} props a list of numerical buttons
 *  - setPage: callback function
 *  - current: the current page number (zero-based)
 *  - total: number of pages.
 */
export default function Pager({ setPage, current, total }) {
  const selected = 'btn-secondary';
  const unselected = 'btn-outline-secondary';
  return (
    <div className="d-flex justify-content-center">
      <div className="btn-group" role="group" aria-label="Basic example">
        {Array(total)
          .fill()
          .map((_, i) => (
            <button
              type="button"
              className={'btn ' + (current === i ? selected : unselected)}
              key={i}
              onClick={(e) => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
