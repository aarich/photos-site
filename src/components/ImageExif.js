import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                href={`%PUBLIC_URL%/img/${image}`}
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
  console.log('LOADING EXIFDATA');
  new Promise(function (resolve, reject) {
    setTimeout(
      () =>
        resolve({
          aperture: 'AP',
          iso: 'ISO',
          shutter: 'shu',
          focal: 'foc',
          date: 'sep 2019',
          camera: 'canon',
        }),
      2000
    );
  }).then((result) => {
    setExifData(result);
  });
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
