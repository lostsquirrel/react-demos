import React from 'react';
import ReactDOM from 'react-dom';

function activateLasers() {
    console.log('activateLasers....')
}

function SimpleButton() {
    return (
        <button onClick={activateLasers}>
            Activate Lasers
        </button>
    );
}
ReactDOM.render(
    <SimpleButton />,
    document.getElementById('root')
);