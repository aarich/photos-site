import React from 'react';
import { Link } from 'react-router-dom';

export default function ImageTile({ image }) {
  return (
    <li className="col-md-4">
      <div className="wrapper">
        <Link to={`/view/${image}`} className="photo-link">
          <img src={`/crop.php?img=${image}&w=600&h=400`} alt={image} />
        </Link>
      </div>
    </li>
  );
}
