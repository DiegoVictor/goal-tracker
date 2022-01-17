import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './navigation';
import { Style } from './themes/global';

ReactDOM.render(
  <React.StrictMode>
    <Style />
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root')
);
