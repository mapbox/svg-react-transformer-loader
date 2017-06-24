'use strict';

const loader = require('./index.js');
const loaderUtils = require('loader-utils');
const svgReactTransformer = require('@mapbox/svg-react-transformer');

describe('svgReactTransformerLoader', () => {
  let callback;
  let mockContext;
  let transformResult;

  beforeEach(() => {
    callback = jest.fn();
    mockContext = {
      async: jest.fn(() => callback),
      loader
    };
    transformResult = Promise.resolve('mockResult');
    jest.spyOn(loaderUtils, 'getOptions').mockReturnValue('mockOptions');
    jest.spyOn(svgReactTransformer, 'toComponentModule').mockReturnValue(transformResult);
  });

  afterEach(() => {
    loaderUtils.getOptions.mockRestore();
    svgReactTransformer.toComponentModule.mockRestore();
  });

  test('registers as async', () => {
    return mockContext.loader('mockSvg').then(() => {
      expect(mockContext.async).toHaveBeenCalledTimes(1);
    });
  });

  test('gets options', () => {
    return mockContext.loader('mockSvg').then(() => {
      expect(loaderUtils.getOptions).toHaveBeenCalledTimes(1);
      expect(loaderUtils.getOptions).toHaveBeenCalledWith(mockContext);
    });
  });

  test('passes arguments to toComponentModule', () => {
    return mockContext.loader('mockSvg').then(() => {
      expect(svgReactTransformer.toComponentModule).toHaveBeenCalledTimes(1);
      expect(svgReactTransformer.toComponentModule).toHaveBeenCalledWith('mockSvg', 'mockOptions');
    });
  });

  test('calls the callback with the results', () => {
    return mockContext.loader('mockSvg').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, 'mockResult');
    });
  });

  test('passes errors to the callback', () => {
    svgReactTransformer.toComponentModule.mockReturnValue(Promise.reject('mockError'));
    return mockContext.loader('mockSvg').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('mockError');
    });
  });
});
