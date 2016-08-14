import React from 'react';

import refreshRates from '../config/refreshRates.js';

import TravelInformation from './TravelInformation.jsx';
import BottomDisplay from './BottomDisplay.jsx';
import MiddleComponents from './MiddleComponents.jsx';

export default React.createClass({

	displayName: 'Root',

	render: function () {
		return (
			<div>
				<TravelInformation />
				<BottomDisplay />
				<MiddleComponents />
			</div>
		);
	}
});
