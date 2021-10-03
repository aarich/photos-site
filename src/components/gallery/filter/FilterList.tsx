import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Tag } from '../../../utils';

type Props = {
  selectedTags: Tag[];
  onPressTag: (tag: Tag) => void;
};

const FilterList = ({ selectedTags, onPressTag }: Props) => {
  const sortedTags = [...selectedTags];
  sortedTags.sort();
  return (
    <span className="my-2">
      <ButtonGroup>
        {sortedTags.map((tag) => (
          <Button
            key={tag}
            variant="outline-secondary"
            onClick={() => onPressTag(tag)}
          >
            &times; {tag}
          </Button>
        ))}
      </ButtonGroup>
    </span>
  );
};

export default FilterList;
