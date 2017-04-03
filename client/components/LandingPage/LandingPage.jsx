import React from 'react';
import { Link } from 'react-router-dom';


console.log("link",  Link)
const LandingPage = () => (
  <div>
    <p>LandingPage</p>
    <Link to='/survey'> test link </Link> 
  </div>

);

export default LandingPage;
