import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

console.log('public url: ', process.env.PUBLIC_URL);

ReactDOM.render(<App />, document.getElementById('root'));
