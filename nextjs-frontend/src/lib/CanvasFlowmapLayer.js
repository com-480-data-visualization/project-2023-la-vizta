import * as TWEEN from "@tweenjs/tween.js";

// this.options
// getOrigin( feature ) => L.LatLng
// getDest( feature )  => L.LatLng
// isOrigin( feature ) => boolean

const originStyle = (renderer) => ({
  renderer: canvasRenderer, // recommended to use L.canvas()
  radius: 5,
  weight: 2,
  color: "rgb(195, 255, 62)",
  fillColor: "rgba(195, 255, 62, 0.6)",
  fillOpacity: 1,
});

const destinationStyle = (renderer) => ({
  renderer: canvasRenderer,
  radius: 2.5,
  weight: 0.25,
  color: "rgb(17, 142, 170)",
  fillColor: "rgb(17, 142, 170)",
  fillOpacity: 1,
});

const canvasRenderer = L.canvas();
const CanvasFlowmapLayer = L.GeoJSON.extend({
  options: {
    canvasBezierStyle: {
      type: "simple",
      symbol: {
        strokeStyle: "rgba(255, 0, 51, 0.8)",
        lineWidth: 0.75,
        lineCap: "round",
        shadowColor: "rgb(255, 0, 51)",
        shadowBlur: 1.5,
      },
    },
    animatedCanvasBezierStyle: {
      type: "simple",
      symbol: {
        strokeStyle: "rgb(255, 46, 88)",
        lineWidth: 1.25,
        lineDashOffsetSize: 4, // custom property used with animation sprite sizes
        lineCap: "round",
        shadowColor: "rgb(255, 0, 51)",
        shadowBlur: 2,
      },
    },
    pathDisplayMode: "all",
    wrapAroundCanvas: true,
    animationStarted: false,
    animationEasingFamily: "Cubic",
    animationEasingType: "In",
    animationDuration: 2000,

    pointToLayer: function (geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
    },

    style: function (geoJsonFeature) {
      const isOrigin = false; // TODO: way to get origin
      return (isOrigin ? originStyle : destinationStyle)(canvasRender);
    },
  },

  _customCanvases: [],

  initialize: function (geoJson, options) {
    L.setOptions(this, options);

    this._animationProperties = {
      offset: 0,
      resetOffset: 200,
      repeat: Infinity,
      yoyo: false,
    };

    this._animationPropertiesDynamic = {
      duration: null,
      easingInfo: null,
    };

    this._layers = {};

    // beginning of customized initialize method
    if (geoJson && this.options.originAndDestinationFieldIds) {
      this.setfeatures(geoJson);
    }

    // Tween animation settings
    this.setAnimationDuration(this.options.animationDuration);
    this.setAnimationEasing(
      this.options.animationEasingFamily,
      this.options.animationEasingType
    );
    this._animationTween = new TWEEN.Tween(this._animationProperties)
      .to(
        { offset: this._animationProperties.resetOffset },
        this._animationPropertiesDynamic.duration
      )
      .easing(this._animationPropertiesDynamic.easingInfo.tweenEasingFunction)
      .repeat(this._animationProperties.repeat)
      .yoyo(this._animationProperties.yoyo)
      .start();
  },

  setfeatures: function (features) {
    this.features = features;
    this.addData(features);
    return this;
  },

  onAdd: function (map) {
    L.GeoJSON.prototype.onAdd.call(this, map);

    this._animationCanvasElement = this._insertCustomCanvasElement(
      map,
      this.options
    );

    // create new canvas element for manually drawing bezier curves
    //  - most of the magic happens in this canvas element
    //  - this canvas element is established last because it will be
    //    inserted before (underneath) the animation canvas element
    this._canvasElement = this._insertCustomCanvasElement(map, this.options);

    // create a reference to both canvas elements in an array for convenience
    this._customCanvases = [this._canvasElement, this._animationCanvasElement];

    // establish custom event listeners
    map.on("move", this._resetCanvas, this);
    map.on("moveend", this._resetCanvasAndWrapGeoJsonCircleMarkers, this);
    map.on("resize", this._resizeCanvas, this);
    map.on("zoomanim", this._animateZoom, this);

    // calculate initial size and position of canvas
    // and draw its content for the first time
    this._resizeCanvas();
    this._resetCanvasAndWrapGeoJsonCircleMarkers();

    return this;
  },

  onRemove: function (map) {
    L.GeoJSON.prototype.onRemove.call(this, map);
    this._clearCanvas();
    this._customCanvases.forEach((canvas) => L.DomUtil.remove(canvas));

    map.off("move", this._resetCanvas, this);
    map.off("moveend", this._resetCanvasAndWrapGeoJsonCircleMarkers, this);
    map.off("resize", this._resizeCanvas, this);
    map.off("zoomanim", this._animateZoom, this);

    return this;
  },

  bringToBack: function () {
    L.GeoJSON.prototype.bringToBack.call(this);
    L.DomUtil.toBack(this._animationCanvasElement);
    L.DomUtil.toBack(this._canvasElement);
    return this;
  },

  bringToFront: function () {
    L.DomUtil.toFront(this._canvasElement);
    L.DomUtil.toFront(this._animationCanvasElement);
    L.GeoJSON.prototype.bringToFront.call(this);
    return this;
  },

  setAnimationDuration: function (milliseconds) {
    milliseconds = Number(milliseconds) || this.options.animationDuration;

    // change the tween duration on the active animation tween
    if (this._animationTween) {
      this._animationTween.to(
        {
          offset: this._animationProperties.resetOffset,
        },
        milliseconds
      );
    }

    this._animationPropertiesDynamic.duration = milliseconds;
  },

  setAnimationEasing: function (easingFamily, easingType) {
    var tweenEasingFunction;
    if (
      TWEEN.Easing.hasOwnProperty(easingFamily) &&
      TWEEN.Easing[easingFamily].hasOwnProperty(easingType)
    ) {
      tweenEasingFunction = TWEEN.Easing[easingFamily][easingType];
    } else {
      easingFamily = this.options.animationEasingFamily;
      easingType = this.options.animationEasingType;
      tweenEasingFunction = TWEEN.Easing[easingFamily][easingType];
    }

    // change the tween easing function on the active animation tween
    if (this._animationTween) {
      this._animationTween.easing(tweenEasingFunction);
    }

    this._animationPropertiesDynamic.easingInfo = {
      easingFamily: easingFamily,
      easingType: easingType,
      tweenEasingFunction: tweenEasingFunction,
    };
  },

  playAnimation: function () {
    this.options.animationStarted = true;
    this._redrawCanvas();
  },

  stopAnimation: function () {
    this.options.animationStarted = false;
    this._redrawCanvas();
  },

  _updateDisplayAndResetCanvas: function (cb) {
    for (const feature of features) {
      feature.properties._isSelectedForPathDisplay = cb(feature);
    }
    this._resetCanvas();
  },

  clearAllPathSelections: function () {
    this._updateDisplayAndResetCanvas(() => false);
  },
  // TODO: origin
  selectAllFeaturesForPathDisplay: function () {
    this._updateDisplayAndResetCanvas((feature) => feature.properties.isOrigin);
  },

  _insertCustomCanvasElement: function (map, options) {
    const canvas = L.DomUtil.create("canvas", "leaflet-zoom-animated");
    const originProp = L.DomUtil.testProp([
      "transformOrigin",
      "WebkitTransformOrigin",
      "msTransformOrigin",
    ]);
    canvas.style[originProp] = "50% 50%";
    const pane = map.getPane(options.pane);
    pane.insertBefore(canvas, pane.firstChild);
    return canvas;
  },

  _getSharedOriginOrDestinationFeatures: function (testFeature) {
    // TODO: origin
    var isOriginFeature = testFeature.properties.isOrigin;
    var sharedOriginFeatures = [];
    var sharedDestinationFeatures = [];

    if (isOriginFeature) {
      // for an ORIGIN point that was interacted with,
      // make an array of all other ORIGIN features with the same ORIGIN ID field
      var originUniqueIdField =
        this.options.originAndDestinationFieldIds.originUniqueIdField;
      var testFeatureOriginId = testFeature.properties[originUniqueIdField];
      sharedOriginFeatures = this.features.filter(function (feature) {
        return (
          feature.properties.isOrigin &&
          feature.properties[originUniqueIdField] === testFeatureOriginId
        );
      });
    } else {
      // for a DESTINATION point that was interacted with,
      // make an array of all other ORIGIN features with the same DESTINATION ID field
      var destinationUniqueIdField =
        this.options.originAndDestinationFieldIds.destinationUniqueIdField;
      var testFeatureDestinationId =
        testFeature.properties[destinationUniqueIdField];
      sharedDestinationFeatures = this.features.filter(function (feature) {
        return (
          feature.properties.isOrigin &&
          feature.properties[destinationUniqueIdField] ===
            testFeatureDestinationId
        );
      });
    }

    return {
      isOriginFeature: isOriginFeature, // Boolean
      sharedOriginFeatures: sharedOriginFeatures, // Array of features
      sharedDestinationFeatures: sharedDestinationFeatures, // Array of features
    };
  },

  _animateZoom: function (e) {
    // see: https://github.com/Leaflet/Leaflet.heat
    var scale = this._map.getZoomScale(e.zoom);
    var offset = this._map
      ._getCenterOffset(e.center)
      ._multiplyBy(-scale)
      .subtract(this._map._getMapPanePos());

    if (L.DomUtil.setTransform) {
      this._customCanvases.forEach(function (canvas) {
        L.DomUtil.setTransform(canvas, offset, scale);
      });
    } else {
      this._customCanvases.forEach(function (canvas) {
        canvas.style[L.DomUtil.TRANSFORM] =
          L.DomUtil.getTranslateString(offset) + " scale(" + scale + ")";
      });
    }
  },

  _resizeCanvas: function () {
    var size = this._map.getSize();
    this._customCanvases.forEach(function (canvas) {
      canvas.width = size.x;
      canvas.height = size.y;
    });
    this._resetCanvas();
  },

  _resetCanvas: function () {
    if (!this._map) return;

    // update the canvas position and redraw its content
    var topLeft = this._map.containerPointToLayerPoint([0, 0]);
    this._customCanvases.forEach(function (canvas) {
      L.DomUtil.setPosition(canvas, topLeft);
    });

    this._redrawCanvas();
  },

  _resetCanvasAndWrapGeoJsonCircleMarkers: function () {
    this._resetCanvas();
    this._wrapGeoJsonCircleMarkers();
  },

  _redrawCanvas: function () {
    if (this._map && this.features) {
      this._clearCanvas();
      this._drawSelectedCanvasPaths(false);

      if (this._animationFrameId) {
        L.Util.cancelAnimFrame(this._animationFrameId);
      }

      if (
        this.options.animationStarted &&
        this.features.some(function (feature) {
          return feature.properties._isSelectedForPathDisplay;
        })
      ) {
        this._animator();
      }
    }
  },

  _clearCanvas: function () {
    this._customCanvases.forEach(function (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    });

    if (this._animationFrameId) {
      L.Util.cancelAnimFrame(this._animationFrameId);
    }
  },

  _screenPoint: function (latlngGetter) {
    this._map.latLngToContainerPoint(
      this._wrapAroundLatLng(latlngGetter(feature))
    );
  },

  _drawSelectedCanvasPaths: function (animate) {
    const ctx = animate
      ? this._animationCanvasElement.getContext("2d")
      : this._canvasElement.getContext("2d");
    const originAndDestinationFieldIds =
      this.options.originAndDestinationFieldIds;

    for (const feature of features) {
      if (!feature.properties._isSelectedForPathDisplay) continue;

      const { symbol } = animate
        ? this.options.animatedCanvasBezierStyle
        : this.options.canvasBezierStyle;
      const drawFunc = animate
        ? this._animateCanvasLineSymbol
        : this._applyCanvasLineSymbol;
      const screenOriginPoint = this._screenPoint(this.options.getOrigin);
      const screenDestinationPoint = this._screenPoint(this.options.getDest);

      ctx.beginPath();
      drawFunc(ctx, symbol, screenOriginPoint, screenDestinationPoint);
      ctx.stroke();
      ctx.closePath();
    }
  },

  _applyCanvasLineSymbol: function (
    ctx,
    symbolObject,
    screenOriginPoint,
    screenDestinationPoint
  ) {
    ctx.lineCap = symbolObject.lineCap;
    ctx.lineWidth = symbolObject.lineWidth;
    ctx.strokeStyle = symbolObject.strokeStyle;
    ctx.shadowBlur = symbolObject.shadowBlur;
    ctx.shadowColor = symbolObject.shadowColor;
    ctx.moveTo(screenOriginPoint.x, screenOriginPoint.y);
    ctx.bezierCurveTo(
      screenOriginPoint.x,
      screenDestinationPoint.y,
      screenDestinationPoint.x,
      screenDestinationPoint.y,
      screenDestinationPoint.x,
      screenDestinationPoint.y
    );
  },

  _animateCanvasLineSymbol: function (
    ctx,
    symbolObject,
    screenOriginPoint,
    screenDestinationPoint
  ) {
    ctx.lineCap = symbolObject.lineCap;
    ctx.lineWidth = symbolObject.lineWidth;
    ctx.strokeStyle = symbolObject.strokeStyle;
    ctx.shadowBlur = symbolObject.shadowBlur;
    ctx.shadowColor = symbolObject.shadowColor;
    ctx.setLineDash([
      symbolObject.lineDashOffsetSize,
      this._animationProperties.resetOffset - symbolObject.lineDashOffsetSize,
    ]);
    ctx.lineDashOffset = -this._animationProperties.offset; // this makes the dot appear to move when the entire top canvas is redrawn
    ctx.moveTo(screenOriginPoint.x, screenOriginPoint.y);
    ctx.bezierCurveTo(
      screenOriginPoint.x,
      screenDestinationPoint.y,
      screenDestinationPoint.x,
      screenDestinationPoint.y,
      screenDestinationPoint.x,
      screenDestinationPoint.y
    );
  },

  _animator: function (time) {
    this._animationCanvasElement
      .getContext("2d")
      .clearRect(
        0,
        0,
        this._animationCanvasElement.width,
        this._animationCanvasElement.height
      );
    this._drawSelectedCanvasPaths(true);
    TWEEN.update(time);
    this._animationFrameId = L.Util.requestAnimFrame(this._animator, this);
  },

  _wrapGeoJsonCircleMarkers: function () {
    this.eachLayer((layer) => {
      layer.setLatLng(this._wrapAroundLatLng(layer.getLatLng()));
    }, this);
  },

  _wrapAroundLatLng: function (latLng) {
    if (this._map && this.options.wrapAroundCanvas) {
      var wrappedLatLng = latLng.clone();
      var mapCenterLng = this._map.getCenter().lng;
      var wrapAroundDiff = mapCenterLng - wrappedLatLng.lng;
      if (wrapAroundDiff < -180 || wrapAroundDiff > 180) {
        wrappedLatLng.lng += Math.round(wrapAroundDiff / 360) * 360;
      }
      return wrappedLatLng;
    } else {
      return latLng;
    }
  },
});

export default CanvasFlowmapLayer;
