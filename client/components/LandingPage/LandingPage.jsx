import React from 'react';
import { Link } from 'react-router';

console.log('link', Link);
const LandingPage = () => (
  <div>
    <p>LandingPage</p>
    <Link to="/" >Survy Test link</Link>
  </div>

);

export default LandingPage;
