import React from 'react';
import ReactDOM from 'react-dom';
import Base from './Base';
import '../node_modules/bulma/css/bulma.min.css';
import './Base.css';

const debug = true;

const backend = debug ?'http://localhost:5000' : '';


//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Base  debug/>, document.getElementById('root'));

export default backend

