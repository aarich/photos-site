import React from 'react';

/**
 * Simple copyright component
 */
export default function Footer() {
  return (
    <footer>
      <div className="container text-center">
        <p className="credits">&copy; {new Date().getFullYear()} Alex Rich</p>
      </div>
    </footer>
  );
}
