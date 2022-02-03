import React from 'react';
import ReactDOM from 'react-dom';

import { Theme } from 'styles/theme';
import Navigation from 'navigation';

ReactDOM.render(
  <React.StrictMode>
    <Theme />
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root')
);
