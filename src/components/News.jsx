import React from "react";
import Endpoints from "../constants/Endpoints.js";
import ApiKeys from "../constants/ApiKeys.js";
import NewsConstants from "../constants/NewsConstants";
import {pollFor} from "../util/pollUtils.js";
import {executeXHR} from "../util/xhrUtils.js";

export default React.createClass({
  
  displayName: 'News',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      newsData: null
    };
  },
  
  componentDidMount: function () {
    pollFor(() => {
      this._getNewsData(NewsConstants.SOURCES.BBC);
    }, this.props.refreshRate);
  },
  
  render: function () {
    return (
      <div id="news">
        { this.state.newsData && <div className="marquee"><span>{ this._renderNewsData() }</span></div> }
      </div>
    );
  },
  
  _getNewsData: function (newsSource) {
    let newsEndpoint = Endpoints.NEWS + newsSource + "&apiKey=" + ApiKeys.NEWS;
    
    executeXHR({
      method: 'GET',
      endpoint: newsEndpoint,
      action: (xhr) => this.setState({newsData: JSON.parse(xhr.responseText)}),
      errorCallback: () => { this.setState({newsData: null}) }
    });
  },
  
  _renderNewsData: function () {
    let newsData = [];
    let newsSeparator = ' ◆ ';
    
    if(this.state.newsData.articles) {
      this.state.newsData.articles.forEach((news) => newsData.push(this._removeFullStopFromNewsDescription(news.description) + newsSeparator));
    } else {
      return NewsConstants.FALLBACK_TEXT;
    }
    
    return newsData;
  },
  
  _removeFullStopFromNewsDescription: function (newsDescription) {
    return newsDescription.substring(0, newsDescription.length - 1);
  }
});
