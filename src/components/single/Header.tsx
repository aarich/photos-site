import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  newer: string;
  older: string;
  page: number;
};

/**
 * Navigation header
 * - {newer, older} ids of neighboring photos
 * - page the page this image is on
 */
export default ({ newer, older, page }: Props) => {
  const className = older && newer ? '' : 'disabled-link';

  return (
    <div className="back-bar">
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
  );
};
