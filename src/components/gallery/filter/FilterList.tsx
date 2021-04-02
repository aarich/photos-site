import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import { Tag } from '../../../utils';

type Props = {
  selectedTags: Tag[];
  onPressTag: (tag: Tag) => void;
};

export default ({ selectedTags, onPressTag }: Props) => (
  <span className="my-2">
    <ButtonGroup>
      {selectedTags.sort().map((tag) => (
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
