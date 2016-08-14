import React from 'react';
import ReactDOM from 'react-dom';

export default function render(app) {
	ReactDOM.render(app, document.querySelector("#root"));
}
