import React from "react";

export default React.createClass({
  
  displayName: 'Calendar',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired
  },
  
  componentDidMount: function () {
    setInterval(() => {
      this._refreshCalendar()
    }, this.props.refreshRate);
  },
  
  render: function () {
    return (
      <iframe
        src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffcccc&amp;src=micky_whufc%40hotmail.com&amp;color=%231B887A&amp;src=en.uk%23holiday%40group.v.calendar.google.com&amp;color=%fff&amp;ctz=Europe%2FLondon"
        id="calendar" className="calendar" scrolling="no"></iframe>
    );
  },
  
  _refreshCalendar: function () {
    let iframe = document.getElementById('calendar');
    iframe.src = iframe.src;
  }
});
