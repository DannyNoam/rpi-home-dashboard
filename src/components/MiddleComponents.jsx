import React from 'react';

import Calendar from './Calendar.jsx';
import List from './List.jsx';
import GifStream from './GifStream.jsx';

import refreshRates from '../config/refreshRates.js';
import Endpoints from '../constants/Endpoints.js';

export default React.createClass({

	displayName: 'MiddleComponents',

	render: function () {
		return (
			<div className="middle-components">
				<div className="left-side-component">
					<Calendar refreshRate={ refreshRates.CALENDAR } />
				</div>
				<div className="right-side-components">
					<GifStream refreshRate={ refreshRates.GIF } />
					<List refreshRate={ refreshRates.LIST } label="Shopping List" type="shopping" endpoint={ Endpoints.SHOPPING_LIST } editKey="s" id="shopping"/>
					<List refreshRate={ refreshRates.LIST } label="To Do List" type="todo" endpoint={ Endpoints.TODO_LIST } editKey="t" id="todo" />
				</div>
			</div>
		);
	}
});
