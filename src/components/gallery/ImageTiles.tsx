import React from 'react';
import ImageTile from './ImageTile';

type Props = {
  images: string[];
};

/**
 * A gallery of images
 * - images: a list of image ids to be displayed
 */
const ImageTiles = ({ images }: Props) => (
  <section id="portfolio">
    <div className="gallery" style={{ minHeight: 400 * 2 }}>
      <ul>
        {images.map((name) => (
          <ImageTile image={name} key={name} />
        ))}
      </ul>
    </div>
  </section>
);

export default ImageTiles;
