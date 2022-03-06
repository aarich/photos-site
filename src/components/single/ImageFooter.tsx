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
      <div className="container content-section text-center">
        <p className="text-center">{description}</p>
        <div className="row">
          {dataPoints.map((key) => (
            <div className="col-md-3 stats" key={key}>
              <p>{exifData[key]}</p>
            </div>
          ))}
        </div>
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
      <div className="d-md-none text-center mb-3">
        <span className="px-2">
          Want to use this photo?{' '}
          <a
            href={`https://mrarich.com/contact?m=Can you send me an original-quality version of image ${image}?`}
            target="_blank"
            rel="noreferrer"
          >
            Request a free original-quality copy
          </a>
        </span>
      </div>
    </section>
  );
};

export default ImageFooter;
