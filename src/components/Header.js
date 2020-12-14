import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation header
 * @param {Object} props - {newer, older} ids of neighboring photos
 */
export default function Header({ newer, older }) {
  const className = older && newer ? '' : 'disabled-link';

  return (
    <div className="back-bar">
      <Link to={`/view/${newer}`} className={className}>
        &larr;&nbsp;Newer
      </Link>{' '}
      |{' '}
      <Link to="/">
        Home <small>[esc]</small>
      </Link>{' '}
      |{' '}
      <Link to={`/view/${older}`} className={className}>
        Older&nbsp;&rarr;
      </Link>
    </div>
  );
}
