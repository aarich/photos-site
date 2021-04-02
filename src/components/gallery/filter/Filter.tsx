import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

import { Tag } from '../../../utils';

type Props = {
  selectedTags: Tag[];
  onToggleTag: (tag: Tag) => void;
  and: boolean;
  toggleAnd: () => void;
};

export default ({ selectedTags, onToggleTag, and, toggleAnd }: Props) => {
  const tagOptions = Object.values(Tag);

  return (
    <ButtonGroup>
      <DropdownButton title="Filter" as={ButtonGroup} variant="secondary">
        {tagOptions.sort().map((tag) => (
          <Dropdown.Item
            as={Button}
            key={tag}
            variant="light"
            onClick={() => onToggleTag(tag)}
            active={selectedTags.includes(tag)}
          >
            {tag}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {selectedTags.length > 1 && (
        <Button variant="outline-secondary" onClick={toggleAnd}>
          {and ? 'AND' : 'OR'}
        </Button>
      )}
    </ButtonGroup>
  );
};
