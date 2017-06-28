# @mapbox/svg-react-transformer-loader

[![Build Status](https://travis-ci.org/mapbox/svg-react-transformer-loader.svg?branch=master)](https://travis-ci.org/mapbox/svg-react-transformer-loader)

Webpack loader to transform SVG files into React components.

Runs SVG files through the `toComponentModule` function of [svg-react-transformer](https://github.com/mapbox/svg-react-transformer).

You can pass all of [the options from `toComponentModule`](https://github.com/mapbox/svg-react-transformer#tocomponentmodule) (e.g. SVGO plugins, a component template).

**The output of the default template includes JSX and ES2015 (`class`), so you should chain this loader with the [`babel-loader`](https://github.com/babel/babel-loader).**
