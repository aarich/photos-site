import React, { useContext, useEffect, useRef, useState } from 'react';
import ImageTiles from './ImageTiles';
import Jumbo from './Jumbo';
import Pager from './Pager';
import { ImageContext } from '../ImageContext';
import Footer from './Footer';

/**
 * The gallery view of all the images
 * @param {object} props - headerImage: the chosen image to display as hero
 */
export default function ViewAll({ headerImage }) {
  const images = useContext(ImageContext);

  const [displayedImages, setDisplayedImages] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const offset = pageSize * page;
    const start = Math.min(offset, images.length);
    const end = Math.min(offset + pageSize, images.length + 1);
    setDisplayedImages(images.slice(start, end));
  }, [page, images]);

  const totalPages = Math.ceil(images.length / pageSize);
  const tilesRef = useRef(null);

  const setPageAndScroll = (newPage) => {
    setPage(newPage);
    tilesRef.current.scrollIntoViewIfNeeded();
  };

  return (
    <>
      {getHeader()}
      <Jumbo image={headerImage} />
      {getAbout()}
      {displayedImages.length === 0 ? (
        <div style={{ minHeight: 400 * 2 }}></div>
      ) : (
        <>
          <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
          <br ref={tilesRef} />
          <ImageTiles images={displayedImages} />
          <br />
          <Pager current={page} total={totalPages} setPage={setPageAndScroll} />
        </>
      )}
      {getFooter()}
    </>
  );
}

function getHeader() {
  return (
    <nav className="navbar navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand page-scroll" href="https://mrarich.com">
            MR. ARICH
          </a>
        </div>
      </div>
    </nav>
  );
}

function getAbout() {
  return (
    <section id="about">
      <div className="container content-section text-center intro">
        <h2>I went outside once</h2>
        <p>
          I enjoy hiking and stuff and then one time I bought an old DSLR camera
          to capture things I see. Here are some of my favorites.
        </p>
      </div>
    </section>
  );
}

function getFooter() {
  const links = [
    { h: '/feed.php', n: 'RSS' },
    { h: 'https://mrarich.com/contact', n: 'Contact' },
    { h: 'https://projects.mrarich.com', n: 'Projects' },
    { h: 'https://mrarich.com', n: 'Site Home' },
    { h: 'https://github.com/aarich/photos-site', n: 'Source Code' },
  ];

  return (
    <>
      <section>
        <div className="container content-section intro">
          <h2>Cool?</h2>
          <p>
            If you like any of the photos here, I'd love to hear about it! You
            can also check out my projects if you like lame things that are
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

      <Footer />
    </>
  );
}
