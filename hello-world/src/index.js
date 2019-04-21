import React from 'react';
import ReactDOM from 'react-dom';

const name = 'React';
const hello = <h1>Hello, {name}</h1>;

ReactDOM.render(
    hello,
    document.getElementById('root')
);