import Copyright from '../shared/Copyright';

const links = [
  { h: '/feed', n: 'RSS' },
  { h: 'https://mrarich.com/contact', n: 'Contact' },
  { h: 'https://projects.mrarich.com', n: 'Projects' },
  { h: 'https://mrarich.com', n: 'Site Home' },
  { h: 'https://github.com/aarich/photos-site', n: 'Source Code' },
];

const Footer = () => (
  <>
    <section>
      <div className="container content-section intro px-5">
        <h2>Cool?</h2>
        <p>
          If you like any of the photos here, I&apos;d love to hear about it!
          You can also check out my projects if you like lame things that are
          kinda nifty for a few seconds.
        </p>
        <ul className="list-inline">
          {links.map((item) => (
            <li className="list-inline-item" key={item.n}>
              <a
                href={item.h}
                className="btn btn-lg"
                target="_blank"
                rel="noreferrer"
              >
                {item.n}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <Copyright />
  </>
);

export default Footer;
