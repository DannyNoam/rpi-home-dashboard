import React from "react";
import refreshRates from "../config/refreshRates.js";
import News from "./News.jsx";
import Time from "./Time.jsx";
import Weather from "./Weather.jsx";

export default React.createClass({
  
  displayName: 'BottomDisplay',
  
  render: function () {
    return (
      <div>
        <News refreshRate={ refreshRates.NEWS }/>
        <Time />
        <Weather refreshRate={ refreshRates.WEATHER }/>
      </div>
    );
  }
});
