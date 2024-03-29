import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { useAppContext } from '../../../context/selectors';
import { Tag, TagAggregateMode, toggleTag } from '../../../utils';

type Props = {
  setSelectedTags: (tags: Tag[]) => void;
  setTagMode: (mode: TagAggregateMode) => void;
};

const Filter = ({ setSelectedTags, setTagMode }: Props) => {
  const tagOptions = Object.values(Tag);
  tagOptions.sort();
  const tagModes = Object.values(TagAggregateMode);

  const { tagMode, selectedTags } = useAppContext();

  return (
    <>
      <ButtonGroup className="mx-1">
        <DropdownButton title="Filter" as={ButtonGroup} variant="secondary">
          {tagOptions.map((tag) => (
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

export default Filter;
