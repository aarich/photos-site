import React, { useContext, useEffect, useState } from 'react';
import ImageTiles from './ImageTiles';
import Jumbo from './Jumbo';
import Pager from './Pager';
import { ImageContext } from '../ImageContext';

export default function ViewAll() {
  const images = useContext(ImageContext);

  const [header, setHeader] = useState(null);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    if (images.length > 0) {
      setHeader(images[0]);
    }
  }, [images]);

  useEffect(() => {
    const offset = pageSize * page;
    const start = Math.min(offset, images.length);
    const end = Math.min(offset + pageSize, images.length + 1);
    setDisplayedImages(images.slice(start, end));
  }, [page, images]);

  const totalPages = Math.ceil(images.length / pageSize);

  return (
    <>
      {getHeader()}
      <Jumbo image={header} />
      {getAbout()}
      {displayedImages.length === 0 ? (
        <div style={{ minHeight: 400 * 2 }}></div>
      ) : (
        <>
          <Pager current={page} total={totalPages} setPage={setPage} />
          <br />
          <ImageTiles images={displayedImages} />
          <br />
          <Pager current={page} total={totalPages} setPage={setPage} />
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
  ];

  return (
    <>
      <section>
        <div className="container content-section text-center">
          <h2>Cool?</h2>
          <p>
            If you like any of the photos here, I'd love to hear about it! You
            can also check out my projects if you like lame things that are
            kinda nifty for a few seconds.
          </p>
          <div className=" d-flex justify-content-center intro">
            <ul className="list-inline">
              {links.map((item) => (
                <li className="list-inline-item" key={item.n}>
                  <a href={item.h} className="btn btnghost btn-lg">
                    {item.n}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div id="loading"></div>
      <footer>
        <div className="container text-center">
          <p className="credits">&copy; {new Date().getFullYear()} Alex Rich</p>
        </div>
      </footer>
    </>
  );
}
