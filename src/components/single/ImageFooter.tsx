import React from 'react';
import { Link } from 'react-router-dom';
import { ExifData, ExifSuccess, toName } from '../../utils';

type Props = {
  image: string;
  description?: string;
  exifData?: ExifData;
  randomImage: string;
};

const dataPoints: (keyof ExifSuccess)[] = [
  'aperture',
  'iso',
  'shutter',
  'focal',
];

const ImageFooter = ({ image, description, exifData, randomImage }: Props) => {
  if (!exifData) {
    return <p>Loading image data...</p>;
  }

  if ('error' in exifData) {
    return <p>Error: {exifData.error}</p>;
  }

  return (
    <section>
      <div className="container content-section text-center"></div>
      <p className="text-center">{description}</p>
      <div className="row">
        {dataPoints.map((key) => (
          <div className="col-md-3 stats" key={key}>
            <p>{exifData[key]}</p>
          </div>
        ))}
      </div>
      <div>
        <ul className="list-inline intro">
          <li className="list-inline-item">
            <a
              href={`/${toName(image)}`}
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

export default ImageFooter;
