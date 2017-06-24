'use strict';

const loaderUtils = require('loader-utils');
const svgReactTransformer = require('@mapbox/svg-react-transformer');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();
  return svgReactTransformer
    .toComponentModule(source, options)
    .then(result => {
      callback(null, result);
    })
    .catch(callback);
};
