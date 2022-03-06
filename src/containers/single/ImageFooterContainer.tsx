import { useEffect, useState } from 'react';
import ImageFooter from '../../components/single/ImageFooter';
import { useAllImages, useExif } from '../../context/selectors';
import { chooseRandom, ExifData, loadExifData } from '../../utils';

type Props = {
  image: string;
  onSetDescription: (exif?: string) => void;
};

const getDescription = (image: string, exif?: ExifData) =>
  exif && 'date' in exif
    ? `Shot in ${exif.date} with a ${exif.camera}.`
    : `Image ${image} has no description`;

/**
 * Loads EXIF data as well as links to original + random
 */
const ImageFooterContainer = ({ image, onSetDescription }: Props) => {
  const [exifData, setExifData] = useState<ExifData>();
  const [randomImage, setRandomImage] = useState('');
  const [description, setDescription] = useState(getDescription(image));

  const allImages = useAllImages();
  const [cachedExif, addExif] = useExif(image);

  useEffect(() => {
    if (cachedExif) {
      setExifData(cachedExif);
    } else {
      loadExifData(image).then((exif) => {
        setExifData(exif);
        addExif({ image, exif });
      });
    }
  }, [addExif, cachedExif, image]);

  useEffect(() => {
    setRandomImage(chooseRandom(allImages, image));
  }, [image, allImages]);

  useEffect(() => {
    const newDescription = getDescription(image, exifData);
    onSetDescription(newDescription);
    setDescription(newDescription);
  }, [exifData, image, onSetDescription]);

  return (
    <ImageFooter
      image={image}
      description={description}
      exifData={exifData}
      randomImage={randomImage}
    />
  );
};

export default ImageFooterContainer;
