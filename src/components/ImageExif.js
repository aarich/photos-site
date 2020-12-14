import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toName, chooseRandom } from '../utils/Utils';
import { ImageContext } from '../ImageContext';

export default function ImageExif({ image }) {
  const [exifData, setExifData] = useState(null);
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
              href={'/' + toName(image)}
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
}

/**
 * TODO cache this, even though it's fast
 */
function loadExifData(image, setExifData) {
  setExifData(null);
  fetch(`/exif.php?img=${toName(image)}`)
    .then((response) => response.json())
    .then((data) => setExifData(data));
}

function getExifContent(exifData) {
  if (!exifData) {
    return <p>Loading image data...</p>;
  }

  if (exifData.error) {
    return <p>Error: {exifData.error}</p>;
  }

  const dataPoints = ['aperture', 'iso', 'shutter', 'focal'];

  return (
    <>
      <p className="text-center">
        Shot in {exifData.date} with a {exifData.camera}.
      </p>
      <div className="row">
        {dataPoints.map((key) => {
          return (
            <div className="col-md-3 stats" key={key}>
              <p>{exifData[key]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function chooseRandomImage(image, images, setImage) {
  setImage(chooseRandom(images, image));
}
