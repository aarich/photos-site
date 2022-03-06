import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="p-3">
      <h3>f/404. What are you doing here?</h3>
      <p>
        <Link to="/">Return Home</Link>
      </p>
    </div>
  );
};

export default NoMatch;
