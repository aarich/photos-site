import _info from './info';
import { Tag, TagAggregateMode } from './types';
import { isDevMode } from './utils';

const tagToImageMap: Partial<Record<Tag, string[]>> = {};

export const getInfo = () =>
  isDevMode()
    ? {
        10: { tags: [Tag.Beach, Tag.Ocean] },
        11: { tags: [Tag.Ocean] },
        12: { tags: [Tag.Beach] },
      }
    : _info;

export const getTagToImageMap = () => {
  const info = getInfo();

  if (Object.keys(tagToImageMap).length === 0) {
    Object.keys(info).forEach((image) => {
      info[image].tags.forEach((tag) => {
        const images = tagToImageMap[tag] || [];
        images.push(image);
        tagToImageMap[tag] = images;
      });
    });
  }

  return tagToImageMap;
};

export const getImagesForTag = (tag: Tag) => getTagToImageMap()[tag] || [];

const imageHasAllTags = (image: string, tags: Tag[]) =>
  tags.every((tag) => getInfo()[image]?.tags.includes(tag));

export const filterImagesByTags = (
  allImages: string[],
  selectedTags: Tag[],
  tagMode: TagAggregateMode
) => {
  if (selectedTags.length === 0) {
    return allImages;
  }

  const tagToImages = getTagToImageMap();
  const or = new Set<string>();
  selectedTags.forEach((tag) =>
    tagToImages[tag]?.forEach((image) => or.add(image))
  );

  const predicate =
    tagMode === TagAggregateMode.And
      ? (im: string) => imageHasAllTags(im, selectedTags)
      : () => true;

  return Array.from(or)
    .filter(predicate)
    .sort((a, b) => Number.parseInt(b) - Number.parseInt(a));
};

export const toggleTag = (
  tag: Tag,
  selectedTags: Tag[],
  setSelectedTags: (tags: Tag[]) => void
) =>
  selectedTags.includes(tag)
    ? setSelectedTags(selectedTags.filter((t) => t !== tag))
    : setSelectedTags([...selectedTags, tag]);
