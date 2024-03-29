import { toName } from '../../utils';

type Props = {
  image: string;
};

/**
 * Contains page title and a link to the #about section for quick scroll
 * image - id of photo chosen to be background
 */
const Jumbo = ({ image }: Props) => {
  const url = `/crop?img=${toName(image)}&w=1600&h=1400`;
  const style = {
    backgroundImage: `radial-gradient(circle at 50% 50%,rgba(0,0,0,0.35),rgba(0,0,0,0.66)),url('${url}')`,
    minHeight: Math.min(window.innerHeight, 1400),
  };

  return (
    <header className="intro" style={style}>
      <div className="intro-body">
        <div className="container">
          <h1 className="title">My Photos</h1>
          <p>I shoot stuff</p>
          <a href="#about" className="down-arrow btn">
            &#42780;
          </a>
        </div>
      </div>
    </header>
  );
};

export default Jumbo;
