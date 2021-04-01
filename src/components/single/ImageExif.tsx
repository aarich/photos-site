import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ExifData,
  ExifSuccess,
  ImageContext,
  chooseRandom,
  toName,
} from '../../utils';

type Props = {
  image: string;
};

/**
 * TODO cache this, even though it's fast
 */
function loadExifData(image: string, setExifData: (data?: ExifData) => void) {
  setExifData();
  fetch(`/exif?img=${toName(image)}`)
    .then((response) => response.text())
    .then((text) => {
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = { error: 'Failed to parse EXIF data.' };
      }
      setExifData(data);
    });
}

function getExifContent(exifData?: ExifData) {
  if (!exifData) {
    return <p>Loading image data...</p>;
  }

  if ('error' in exifData) {
    return <p>Error: {exifData.error}</p>;
  }

  const dataPoints: (keyof ExifSuccess)[] = [
    'aperture',
    'iso',
    'shutter',
    'focal',
  ];

  return (
    <>
      <p className="text-center">
        Shot in {exifData.date} with a {exifData.camera}.
      </p>
      <div className="row">
        {dataPoints.map((key) => (
          <div className="col-md-3 stats" key={key}>
            <p>{exifData[key]}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function chooseRandomImage<T>(image: T, images: T[], setImage: (i: T) => void) {
  setImage(chooseRandom(images, image));
}

/**
 * Loads EXIF data as well as links to original + random
 * @param image id of image
 */
const ImageExif: React.FunctionComponent<Props> = ({ image }) => {
  const [exifData, setExifData] = useState<ExifData>();
  const [randomImage, setRandomImage] = useState('');

  const images = useContext(ImageContext);

  useEffect(() => {
    loadExifData(image, setExifData);
  }, [image]);

  useEffect(() => {
    chooseRandomImage(image, images, setRandomImage);
  }, [image, images]);

  return (
    <section>
      <div className="container content-section text-center">
        {getExifContent(exifData)}
        <ul className="list-inline intro">
          <li className="list-inline-item">
            <a
              href={`'/${toName(image)}`}
              className="btn btn-lg"
              target="_blank"
              rel="noreferrer"
            >
              Direct Link
            </a>
          </li>
          <li className="list-inline-item">
            <Link to={`/view/${randomImage}`} className="btn btn-lg">
              Random photo
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ImageExif;
