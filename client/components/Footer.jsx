import React from 'react';

const authors = [
  { name: 'Nathan Clark Baumgartner', url: 'https://github.com/Clarkbaum' },
  { name: 'Megan Rabuse', url: 'https://github.com/mrabuse' },
  { name: 'Elijah Schow', url: 'https://github.com/elijah-schow' },
  { name: 'Jin Chung', url: 'https://github.com/chungw51993' },
];

const Footer = props => (
  <footer>
    Created by {authors.map(({ name, url }, i) => (
      <span>
        {i ? ', ' : ''}
        <a href={url} rel="noopener noreferrer">
          {name}
        </a>
      </span>
    ))}
    .
  </footer>
);

export default Footer;
