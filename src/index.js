import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/layout/Content';
//require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
      <Content/>
  </React.StrictMode>,
  document.getElementById('root')
);
