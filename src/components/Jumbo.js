import React from 'react';

export default function Jumbo({ image }) {
  const style = {
    backgroundImage: `radial-gradient(circle at 50% 50%,rgba(0,0,0,0.35),rgba(0,0,0,0.66)),url('/crop?img=${image}&w=1600&h=1400')`,
  };
  return (
    <header className="intro" style={style}>
      <div className="intro-body">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h1 className="title">My Photos</h1>
              <p>I shoot stuff</p>
              <a href="#about" className="down-arrow">
                &#42780;
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
