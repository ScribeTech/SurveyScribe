// src/components/NotFoundPage.js
import React from 'react';
import { Light } from './Theme';
import Header from './Header';

const NotFoundPage = props => (
  <Light>
    <div className="layout-semiwhole">
      <Header />
      <h1>Not Found</h1>
      <p>Double check the URL or contact Customer Support.</p>
    </div>
  </Light>
);

export default NotFoundPage;
