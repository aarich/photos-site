import React from 'react';

import ImageTile from './ImageTile';

type Props = {
  images: string[];
};

/**
 * A gallery of images
 * @param {list} props a list of image ids to be displayed
 */
export default ({ images }: Props) => (
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
