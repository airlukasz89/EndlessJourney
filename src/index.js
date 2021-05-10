import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'galeria-react';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
