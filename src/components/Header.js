import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ prev, next }) {
  const className = prev && next ? '' : 'disabled-link';
  // class = back-bar
  return (
    <>
      <Link to={`/view/${next}`} className={className}>
        &larr;&nbsp;Newer
      </Link>{' '}
      |{' '}
      <Link to="/">
        Home <small>[esc]</small>
      </Link>{' '}
      |{' '}
      <Link to={`/view/${prev}`} className={className}>
        Older&nbsp;&rarr;
      </Link>
    </>
  );
}
