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
    <>
      <ButtonGroup className="mx-3">
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
      </ButtonGroup>
      {selectedTags.length > 1 && (
        <ButtonGroup>
          <Button
            variant={and ? 'secondary' : 'outline-secondary'}
            onClick={() => !and && toggleAnd()}
          >
            AND
          </Button>
          <Button
            variant={and ? 'outline-secondary' : 'secondary'}
            onClick={() => and && toggleAnd()}
          >
            OR
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
