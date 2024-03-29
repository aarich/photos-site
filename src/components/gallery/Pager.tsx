import { Button, ButtonGroup } from 'react-bootstrap';

type Props = {
  setPage: (page: number) => void;
  current: number;
  total: number;
};

/**
 * List of page numbers. Selecting any page jumps directly to it
 *  - setPage: callback function
 *  - current: the current page number (zero-based)
 *  - total: number of pages.
 */
const Pager = ({ setPage, current, total }: Props) =>
  total > 0 ? (
    <ButtonGroup className="mx-1">
      {Array(total)
        .fill(0)
        .map((_, i) => (
          <Button
            variant={current === i ? 'secondary' : 'outline-secondary'}
            key={i}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </Button>
        ))}
    </ButtonGroup>
  ) : null;

export default Pager;
