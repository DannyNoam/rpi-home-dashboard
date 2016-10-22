import React from "react";
import {pollFor} from "../util/pollUtils.js";
import {executeXHR} from "../util/xhrUtils.js";

export default React.createClass({
  
  displayName: 'List',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    endpoint: React.PropTypes.string.isRequired,
    editKey: React.PropTypes.string
  },
  
  componentDidMount: function () {
    this._setEditKeys();
    pollFor(() => {
      this._getListData()
    }, this.props.refreshRate);
  },
  
  getInitialState: function () {
    return {
      listItems: null,
      editable: true
    };
  },
  
  render: function () {
    return (
      <div className={ this._constructClassName("list ") }>
        <p className={ this._constructClassName("list-title-")}>{ this.props.label }</p>
        { this.state.listItems && this._renderListItems() }
        { this.state.editable &&
        <div className="list-input">
          <input type="text" id={ this.props.type } className="form-control list" placeholder="Add to the list"/>
          <button type="button" className="btn btn-success list" onClick={ this._addItem.bind(this, this.props.type) }>
            Add
          </button>
        </div>
        }
      </div>
    );
  },
  
  _getListData: function () {
    executeXHR({
      method: 'GET',
      endpoint: this.props.endpoint,
      action: (xhr) => { this.setState({listItems: JSON.parse(xhr.responseText)}) }
    });
  },
  
  _setEditKeys: function () {
    let Combokeys = require("combokeys");
    let combokeys = new Combokeys(document.documentElement);
    let editKey = this.props.editKey || "e";
    
    combokeys.bind(editKey, () => this._setEditable(true));
    combokeys.bind("q", () => this._setEditable(false));
  },
  
  _setEditable: function (isEditable) {
    this.setState({
      editable: isEditable
    });
  },
  
  _renderListItems: function () {
    let renderedItems = [];
    let numberOfItems = this.state.listItems.length;
    
    this.state.listItems.forEach((item) => {
      renderedItems.push(
        <p className={ this._constructClassName("list-item-", numberOfItems) }>
          { item.value }
          { this.state.editable && this._renderRemoveLink(item) }
        </p>
      )
    });
    
    return renderedItems;
  },
  
  _constructClassName: function (prefix, numberOfItems) {
    let listItemSizeClassName = numberOfItems ? this._getListItemSizeClassName(numberOfItems) : "";
    
    return prefix + this.props.type + listItemSizeClassName;
  },
  
  _getListItemSizeClassName: function (numberOfItems) {
    if (numberOfItems < 5) {
      return " list-item-big";
    }
    
    if (numberOfItems >= 5 && numberOfItems < 10) {
      return " list-item-medium";
    }
    
    return " list-item-small";
  },
  
  _renderRemoveLink: function (item) {
    let numberOfItems = this.state.listItems.length;
    let glyphiconClassName = "glyphicon glyphicon-remove " + this._getListItemSizeClassName(numberOfItems);
    
    return (
      <a>
        <span className={ glyphiconClassName } onClick={ this._removeItem.bind(this, item) }></span>
      </a>
    );
  },
  
  _removeItem: function (item) {
    let updatedListItems = this.state.listItems.filter((listItem) => {
      return listItem.value !== item.value
    });
  
    this._updateList(updatedListItems);
  },
  
  _addItem: function (id) {
    let item = this._constructListInputItem(id);
    let updatedListItems = this.state.listItems;
    updatedListItems.push(item);
    
    this._updateList(updatedListItems);
    this._clearListInput(id);
    this._focusOnListInput(id);
  },
  
  _updateList: function (updatedListItems) {
    executeXHR({
      method: 'PUT',
      endpoint: this.props.endpoint,
      action: (xhr) => {
        this.setState({listItems: JSON.parse(xhr.responseText)})
      },
      data: JSON.stringify(updatedListItems),
      contentType: "application/json"
    });
  },
  
  _constructListInputItem: function (id) {
    return {
      value: document.getElementById(id).value
    }
  },
  
  _clearListInput: function (id) {
    document.getElementById(id).value = '';
  },
  
  _focusOnListInput: function (id) {
    document.getElementById(id).focus();
  }
});
