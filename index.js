'use strict';

const loaderUtils = require('loader-utils');
const babel = require('babel-core');
const babelPresetEs2015 = require('babel-preset-es2015');
const babelPresetReact = require('babel-preset-react');
const svgReactTransformer = require('@mapbox/svg-react-transformer');

const defaultOptions = {
  precompile: true
};

module.exports = function(source) {
  let options = loaderUtils.getOptions(this);
  options = Object.assign(defaultOptions, options);
  const callback = this.async();
  return svgReactTransformer
    .toComponentModule(source, options)
    .then(result => {
      if (options.precompile) {
        result = babel.transform(result, {
          presets: [babelPresetEs2015, babelPresetReact]
        }).code;
      }
      callback(null, result);
    })
    .catch(callback);
};
