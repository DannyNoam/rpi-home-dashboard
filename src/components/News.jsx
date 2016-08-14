import React from 'react';

import Endpoints from '../constants/Endpoints.js';
import ApiKeys from '../constants/ApiKeys.js';
import NewsConstants from '../constants/NewsConstants';
import { pollFor } from '../util/pollUtils.js';
import { executeXHR } from '../util/xhrUtils.js';

export default React.createClass({

	displayName: 'News',

	getInitialState: function () {
	    return {
	        newsData: null
	    };
	},

	componentDidMount: function () {
		pollFor(() => { this._getNewsData(NewsConstants.BBC); }, this.props.refreshRate);
	},

	render: function () {
		return (
			<div id="news">
				{ this.state.newsData && <div className="marquee"><span>{ this._renderNewsData() }</span></div> }
			</div>
		);
	},

	_getNewsData: function (newsSource) {
		var newsEndpoint = Endpoints.NEWS + newsSource + "&apiKey=" + ApiKeys.NEWS;

	    executeXHR('GET', newsEndpoint, (xhr) => this.setState({ newsData: JSON.parse(xhr.responseText)}));
	},

	_renderNewsData: function () {
		var newsData = [];
		var newsSeparator = ' ◆ '

		this.state.newsData.articles.forEach((news) => newsData.push(this._removeFullStopFromNewsDescription(news.description) + newsSeparator));

		return newsData;
	},

	_removeFullStopFromNewsDescription: function (newsDescription) {
		return newsDescription.substring(0, newsDescription.length - 1);
	}
});
