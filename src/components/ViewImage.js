import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

export default function ViewImage(props) {
  const next = getNext(props.base);
  const prev = getPrev(props.base);
  let { image } = useParams();

  return (
    <div>
      <Header next={next} prev={prev} />
      <img src={image} />
    </div>
  );
}

function getNext(base) {
  return base;
}

function getPrev(base) {
  return base;
}
