import React from 'react';

import Endpoints from '../constants/Endpoints.js';

export default React.createClass({

	displayName: 'Calendar',

	componentDidMount: function () {
	     setInterval(() => { this._refreshCalendar() }, this.props.refreshRate);
	},

	render: function () {
		return (
			<iframe src={ Endpoints.CALENDAR } id="calendar" className="calendar" frameborder="0" scrolling="no" align="left"></iframe>
		);
	},

	_refreshCalendar: function () {
		var iframe = document.getElementById('calendar');
		iframe.src = iframe.src;
	}
});
