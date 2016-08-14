import React from 'react';

import { pollFor } from '../util/pollUtils.js';
import { getHumanReadableTimeObject } from '../util/timeUtils.js';

export default React.createClass({

	displayName: 'Time',

	getInitialState: function () {
	    return {
	        time: null
	    };
	},

	componentDidMount: function () {
		pollFor(() => { this._setTime() }, this.props.refreshRate);
	},

	render: function () {
		return (
			<div id="time">
				{ this.state.time && <p className="time">{ this.state.time }</p> }
			</div>
		);
	},

	_setTime: function () {
		this.setState({
			time: getHumanReadableTimeObject()
		});
	}
});
