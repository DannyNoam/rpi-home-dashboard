import React from 'react';

import Endpoints from '../constants/Endpoints.js';

import { pollFor } from '../util/pollUtils.js';
import { executeXHR } from '../util/xhrUtils.js';

import fileExtension from 'file-extension';

export default React.createClass({

	displayName: 'GifStream',

	componentDidMount: function () {
		pollFor(() => { this._getImageData() }, this.props.refreshRate);
	},

	getInitialState: function () {
	    return {
	        imageData: null
	    };
	},

	render: function () {
		return (
			<div className="image-stream">
				{ this.state.imageUrl && this.state.imageAttributes && this._renderImage() }
			</div>
		);
	},

	_getImageData: function () {
		executeXHR('GET', Endpoints.REDDIT.GIFS, (xhr) => {
			const FIRST_IMAGE = 0;
			var imageUrl = JSON.parse(xhr.responseText).data.children[FIRST_IMAGE].data.url;

			if(this._getImageFileType(imageUrl) === "gifv") {
				imageUrl = this._convertToGif(imageUrl);
			}

			this.setState({
				imageUrl: imageUrl,
			});

			this._getImageAttributes(this);
		});
	},

	_renderImage: function () {
		var imageSource = this.state.imageUrl;
		var imageFileType = this._getImageFileType(imageSource);
		var className = this._getImageClassName();

		return this._renderGif(imageSource, className);

	},

	_getImageClassName: function (imageAttributes) {
		var { width, height } = this.state.imageAttributes;

		return width > height ? "width-100" : "height-100";
	},

	_getVerticallyAlignedMarginTopPixels: function () {
		const IMAGE_AREA_HEIGHT = 270;
		var actualImageWidth = window.innerWidth / 4;
		var heightDivisionFactor = this.state.imageAttributes.width / actualImageWidth;
		var actualImageHeight = this.state.imageAttributes.height / heightDivisionFactor;

		var remainingSpaceToFillPx = IMAGE_AREA_HEIGHT - actualImageHeight;
		return Math.round(remainingSpaceToFillPx / 2);
	},

	_renderGif: function (imageSource, className) {
		var style;
		var constructedClassName = "image-stream " + className;

		if(className === "width-100") {
			style = {
				marginTop: this._getVerticallyAlignedMarginTopPixels()
			}
		}

		return (
			<img className={ constructedClassName } src={ imageSource } style={ style }></img>
		);
	},

	_convertToGif: function (imageSource) {
		return imageSource.substring(0, imageSource.length - 1);
	},

	_getImageFileType: function (imageUrl) {
		return fileExtension(imageUrl);
	},

	_getImageAttributes: function (globalContext) {
		var image = new Image();

    	image.onload = function () {
        	var imageAttributes = {
        		width: this.naturalWidth,
        		height: this.naturalHeight
        	}

        	globalContext.setState({
        		imageAttributes: imageAttributes
        	});
        };

        image.src = this.state.imageUrl;
	}
});
