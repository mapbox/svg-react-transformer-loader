'use strict';

const loader = require('../index.js');
const loaderUtils = require('loader-utils');
const svgReactTransformer = require('@mapbox/svg-react-transformer');
const babel = require('babel-core');
const babelPresetEs2015 = require('babel-preset-es2015');
const babelPresetReact = require('babel-preset-react');

jest.mock('@mapbox/svg-react-transformer', () => {
  return {
    toComponentModule: jest.fn()
  };
});

jest.mock('loader-utils', () => {
  return {
    getOptions: jest.fn()
  };
});

jest.mock('babel-core', () => {
  return {
    transform: jest.fn()
  };
});

describe('svgReactTransformerLoader', () => {
  let callback;
  let mockContext;
  let mockOptions;
  let transformResult;

  beforeEach(() => {
    callback = jest.fn();
    mockContext = {
      async: jest.fn(() => callback),
      loader
    };
    mockOptions = {};
    loaderUtils.getOptions.mockReturnValue(mockOptions);
    transformResult = Promise.resolve('mockResult');
    svgReactTransformer.toComponentModule.mockReturnValue(transformResult);
    babel.transform.mockReturnValue({ code: 'mockResultCompiled' });
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
      expect(
        svgReactTransformer.toComponentModule
      ).toHaveBeenCalledWith('mockSvg', {
        precompile: true
      });
    });
  });

  test('calls the callback with the result', () => {
    return mockContext.loader('mockSvg').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, 'mockResultCompiled');
    });
  });

  test('precompile: false does not compile result', () => {
    loaderUtils.getOptions.mockReturnValue({ precompile: false });
    return mockContext.loader('mockSvg').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, 'mockResult');
    });
  });

  test('passes errors to the callback', () => {
    svgReactTransformer.toComponentModule.mockReturnValue(
      Promise.reject('mockError')
    );
    return mockContext.loader('mockSvg').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('mockError');
    });
  });
});
