# @mapbox/svg-react-transformer-loader

[![Build Status](https://travis-ci.org/mapbox/svg-react-transformer-loader.svg?branch=master)](https://travis-ci.org/mapbox/svg-react-transformer-loader)

Webpack loader to transform SVG files into React component modules.

Runs SVG files through the [`toComponentModule`] function of [svg-react-transformer].
Please read the [svg-react-transformer] documentation for more details.

## Installation

```
npm install @mapbox/svg-react-transformer-loader
```

## Usage

Follow the instructions for using [Webpack loaders](https://webpack.js.org/concepts/loaders/).

**You can pass all of the options from svg-react-transformer's [`toComponentModule`] function** (e.g. SVGO plugins, a component template).

By default, the output of this loader is precompiled with Babel.
You can bypass this step (and use your own compilation) by passing the special option `precompile: false`.

[`toComponentModule`]: https://github.com/mapbox/svg-react-transformer#tocomponentmodule
[svg-react-transformer]: https://github.com/mapbox/svg-react-transformer
