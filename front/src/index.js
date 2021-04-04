import React from 'react';
import ReactDOM from 'react-dom';
import Base from './Base';
import '../node_modules/bulma/css/bulma.min.css';
import './Base.css';

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    var debug = true;
else
    var debug = false;
  
const backend = debug ?'http://localhost:5000' : '';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Base  debug/>, document.getElementById('root'));

export default backend

