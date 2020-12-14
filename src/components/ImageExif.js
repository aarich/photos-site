import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toName } from '../utils/utils';
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
        {showExifContent(exifData)}
        <div className="row">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href={toName(image)}
                className="btn btnghost btn-lg"
                target="_blank"
                rel="noreferrer"
              >
                Direct Link
              </a>
            </li>
            <li className="list-inline-item">
              <Link to={`/view/${randomImage}`} className="btn btnghost btn-lg">
                Random photo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function loadExifData(image, setExifData) {
  fetch(`/exif.php?img=${toName(image)}`)
    .then((response) => response.json())
    .then((data) => setExifData(data));
}

function showExifContent(exifData) {
  if (!exifData) {
    return <p>Loading image data...</p>;
  }

  if (exifData.error) {
    return <p>Error: {exifData.error}</p>;
  }

  const dataPoints = ['aperture', 'iso', 'shutter', 'focal'];

  return (
    <>
      <div className="row">
        <p className="text-center">
          Shot in {exifData.date} with a {exifData.camera}.
        </p>
      </div>
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
  const currentIndex = images.indexOf(image);
  let index = currentIndex;
  while (index === currentIndex) {
    index = Math.floor(Math.random() * images.length);
  }
  setImage(images[index]);
}
