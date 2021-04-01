import React from 'react';
import { Link } from 'react-router-dom';

import { isDevMode, toName } from '../../utils';

type Props = {
  image: string;
};

/**
 * A single tile containing and linking to an image
 */
export default ({ image }: Props) => (
  <li className="col-md-4">
    <div className="wrapper">
      <Link to={`/view/${image}`} className="photo-link">
        {isDevMode() ? (
          <p>IMAGE: {image}</p>
        ) : (
          <img src={`/crop?img=${toName(image)}&w=600&h=400`} alt={image} />
        )}
      </Link>
    </div>
  </li>
);
