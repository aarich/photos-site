import React from 'react';
import { isDevMode, toName } from '../utils/utils';
import { Link } from 'react-router-dom';

/**
 * A single tile containing and linking to an image
 * @param {String} props {image} id
 */
export default function ImageTile({ image }) {
  return (
    <li className="col-md-4">
      <div className="wrapper">
        <Link to={`/view/${image}`} className="photo-link">
          {isDevMode() ? (
            <p>IMAGE: {image}</p>
          ) : (
            <img
              src={`/crop.php?img=${toName(image)}&w=600&h=400`}
              alt={image}
            />
          )}
        </Link>
      </div>
    </li>
  );
}
