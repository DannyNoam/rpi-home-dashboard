import React from 'react';

import { pollFor } from '../util/pollUtils.js';
import { executeXHR, executePutXHR } from '../util/xhrUtils.js';
import underscore from 'underscore';

export default React.createClass({

	displayName: 'List',

	componentDidMount: function () {
		this._setEditKeys();
		pollFor(() => { this._getListData() }, this.props.refreshRate);
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
	  					<input type="text" id={ this.props.id } className="form-control list" placeholder="Add to the list" />
	  					<button type="button" className="btn btn-success list" onClick={ this._addItem.bind(this, this.props.id) }>Add</button>
  					</div>
				}
			</div>
		);
	},

	_getListData: function () {
		executeXHR('GET', this.props.endpoint, (xhr) => this.setState({ listItems: JSON.parse(xhr.responseText)}));
	},

	_setEditKeys: function () {
		  var Combokeys = require("combokeys");
		  var combokeys = new Combokeys(document.documentElement);

	      combokeys.bind(this.props.editKey, () => this._setEditable(true));
	      combokeys.bind("q", () => this._setEditable(false));
	},

	_setEditable: function (isEditable) {
		this.setState({
			editable: isEditable
		});
	},

	_renderListItems: function () {
		var renderedItems = [];
		var numberOfItems = this.state.listItems.length;

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
		var listItemSizeClassName = numberOfItems ? this._getListItemSizeClassName(numberOfItems) : "";

		return prefix + this.props.type + listItemSizeClassName;
	},

	_getListItemSizeClassName: function (numberOfItems) {
		if(numberOfItems < 5) {
			return " list-item-big";
		}

		if(numberOfItems >= 5 && numberOfItems < 10) {
			return " list-item-medium";
		}

		return " list-item-small";
	},

	_renderRemoveLink: function (item) {
		var numberOfItems = this.state.listItems.length;
		var glyphiconClassName = "glyphicon glyphicon-remove " + this._getListItemSizeClassName(numberOfItems);

		return (
			<a>
          		<span className={ glyphiconClassName } onClick={ this._removeItem.bind(this, item) }></span>
       		</a>
       	);
	},

	_removeItem: function (item) {
		var updatedListItems = this.state.listItems.filter((listItem) => { return listItem.value !== item.value });

		executeXHR('PUT', this.props.endpoint, (xhr) => { this.setState({ listItems: JSON.parse(xhr.responseText)}) }, JSON.stringify(updatedListItems), "application/json");
	},

	_addItem: function (id) {
		var item = this._constructListInputItem(id);
		var updatedListItems = this.state.listItems;
		updatedListItems.push(item);

		executeXHR('PUT', this.props.endpoint, (xhr) => { this.setState({ listItems: JSON.parse(xhr.responseText)}) }, JSON.stringify(updatedListItems), "application/json");
		this._clearListInput(id);
		this._focusOnListInput(id);
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
