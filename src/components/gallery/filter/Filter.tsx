import React, { useContext } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

import { ImageContext, Tag, TagAggregateMode } from '../../../utils';
import { toggleTag } from '../../../utils/filters';

type Props = {
  setSelectedTags: (tags: Tag[]) => void;
  setTagMode: (mode: TagAggregateMode) => void;
};

export default ({ setSelectedTags, setTagMode }: Props) => {
  const tagOptions = Object.values(Tag);
  const tagModes = Object.values(TagAggregateMode);

  const { tagMode, selectedTags } = useContext(ImageContext);

  return (
    <>
      <ButtonGroup className="mx-1">
        <DropdownButton title="Filter" as={ButtonGroup} variant="secondary">
          {tagOptions.sort().map((tag) => (
            <Dropdown.Item
              as={Button}
              key={tag}
              variant="light"
              onClick={() => toggleTag(tag, selectedTags, setSelectedTags)}
              active={selectedTags.includes(tag)}
            >
              {tag}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </ButtonGroup>
      {selectedTags.length > 1 && (
        <ButtonGroup className="mx-1">
          {tagModes.map((mode) => (
            <Button
              key={mode}
              variant={tagMode === mode ? 'secondary' : 'outline-secondary'}
              onClick={() => setTagMode(mode)}
            >
              {mode}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </>
  );
};
