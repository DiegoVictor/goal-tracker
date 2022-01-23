import React from 'react';
import ReactDOM from 'react-dom';

import { Style } from 'styles/global';
import Navigation from 'navigation';

ReactDOM.render(
  <React.StrictMode>
    <Style />
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root')
);
