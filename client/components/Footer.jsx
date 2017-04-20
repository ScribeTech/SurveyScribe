import React from 'react';

const authors = [
  { name: 'Nathan Clark Baumgartner', url: 'https://github.com/Clarkbaum', key: Math.random() },
  { name: 'Megan Rabuse', url: 'https://github.com/mrabuse', key: Math.random() },
  { name: 'Elijah Schow', url: 'https://github.com/elijah-schow', key: Math.random() },
  { name: 'Jin Chung', url: 'https://github.com/chungw51993', key: Math.random() },
];

const Footer = props => (
  <footer>
    Created by {authors.map(({ name, url, key }, i) => (
      <span key={key}>
        {i ? ', ' : ''}
        <a href={url} rel="noopener noreferrer" className="fancy">
          {name}
        </a>
      </span>
    ))}
    .
  </footer>
);

export default Footer;
