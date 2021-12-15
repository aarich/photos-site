import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  current: string;
  newer: string;
  older: string;
  page: number;
};

/**
 * Navigation header
 * - {newer, older} ids of neighboring photos
 * - page the page this image is on
 */
const ImageHeader = ({ current, newer, older, page }: Props) => {
  const className = older && newer ? '' : 'disabled-link';

  return (
    <div className="row">
      <div className="col-md-6">
        <Link to={`/view/${newer}`} className={className}>
          &larr;&nbsp;Newer
        </Link>{' '}
        |{' '}
        <Link to={`/?p=${page}`}>
          Home <small>[esc]</small>
        </Link>{' '}
        |{' '}
        <Link to={`/view/${older}`} className={className}>
          Older&nbsp;&rarr;
        </Link>
      </div>
      <div className="col-md-6 d-none d-md-block">
        <span className="float-end px-2">
          Want to use this photo?{' '}
          <a
            href={`https://mrarich.com/contact?m=Can you send me an original-quality version of image ${current}?`}
            target="_blank"
            rel="noreferrer"
          >
            Request a free original-quality copy
          </a>
        </span>
      </div>
    </div>
  );
};

export default ImageHeader;
