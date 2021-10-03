import React from 'react';

/**
 * Simple copyright component
 */
const Footer = () => (
  <footer>
    <div className="container text-center">
      <p className="credits">&copy; {new Date().getFullYear()} Alex Rich</p>
    </div>
  </footer>
);

export default Footer;
