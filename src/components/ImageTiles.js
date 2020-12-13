import React from 'react';
import ImageTile from './ImageTile';

export default function ImageTiles({ images }) {
  return (
    <section id="portfolio">
      <div className="gallery">
        <ul>
          {images.map((name) => (
            <ImageTile image={name} key={name} />
          ))}
        </ul>
      </div>
    </section>
  );
}
