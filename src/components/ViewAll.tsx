import React, { useContext, useEffect, useRef, useState } from 'react';

import ImageContext from '../ImageContext';
import history from '../utils/history';
import { PAGE_SIZE } from '../utils/utils';
import Footer from './Footer';
import ImageTiles from './ImageTiles';
import Jumbo from './Jumbo';
import Pager from './Pager';

/**
 * @returns user friendly page number (exact url param)
 */
const getPageParam = () => {
  const p = new URLSearchParams(history.location.search).get('p');
  return p ? Number.parseInt(p) : 1;
};

const setURLParams = (newPage: number) => {
  const urlParams = new URLSearchParams(window.location.search);
  const current = urlParams.get('p');

  const newPageUserFriendly = newPage + 1;
  try {
    if (current && newPageUserFriendly === Number.parseInt(current)) {
      return;
    }
  } catch (e) {
    // Doesn't matter
  }

  if (newPageUserFriendly === 1) {
    urlParams.delete('p');
  } else {
    urlParams.set('p', `${newPageUserFriendly}`);
  }
  history.push(`${window.location.pathname}?${urlParams.toString()}`);
};

const getHeader = () => (
  <nav className="navbar navbar-fixed-top" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand page-scroll" href="https://mrarich.com">
          Alex Rich
        </a>
      </div>
    </div>
  </nav>
);

const getAbout = () => (
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

const getFooter = () => {
  const links = [
    { h: '/feed', n: 'RSS' },
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

      <Footer />
    </>
  );
};

type Props = {
  headerImage: string;
  scrollY: number;
  setScrollY: (sy: number) => void;
};

/**
 * The gallery view of all the images
 * @param {object} props - headerImage: the chosen image to display as hero
 */
const ViewAll = ({ headerImage, scrollY, setScrollY }: Props) => {
  const images = useContext(ImageContext);
  const [page, setPage] = useState(() => getPageParam() - 1);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);

  useEffect(() => {
    if (images.length > 0 && page > Math.ceil(images.length / PAGE_SIZE)) {
      setPage(0);
    }

    const offset = PAGE_SIZE * page;
    const start = Math.min(offset, images.length);
    const end = Math.min(offset + PAGE_SIZE, images.length + 1);
    setDisplayedImages(images.slice(start, end));
  }, [page, images]);

  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  const tilesRef = useRef<HTMLBRElement>(null);

  const setPageAndScroll = (newPage: number) => {
    setPage(newPage);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tilesRef.current?.scrollIntoViewIfNeeded();

    setURLParams(newPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollY(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollY]);

  useEffect(() => {
    window.scrollTo(0, scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      history.listen(() => {
        setPage(getPageParam() - 1);
      }),
    []
  );

  return (
    <>
      {getHeader()}
      <Jumbo image={headerImage} />
      {getAbout()}
      {displayedImages.length === 0 ? (
        <div style={{ minHeight: 400 * 2 }} />
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
};

export default ViewAll;
