import React, { useState } from 'react';
import ImageFooterContainer from '../../containers/single/ImageFooterContainer';
import Copyright from '../shared/Copyright';
import ImageHeader from './ImageHeader';

type Props = {
  image: string;
  newer: string;
  older: string;
  page: number;
  src: string;
};

/**
 * View a single image and its data
 */
const ViewImage = ({ image, newer, older, page, src }: Props) => {
  const [alt, setAlt] = useState<string>();
  return (
    <div>
      <ImageHeader current={image} newer={newer} older={older} page={page} />
      <div className="img-display">
        <img src={src} alt={alt} />
      </div>
      <ImageFooterContainer image={image} onSetDescription={setAlt} />
      <Copyright />
    </div>
  );
};

export default ViewImage;
