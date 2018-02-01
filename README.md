Webpack critical css plugin
---------------------------

## About

This is a Webpack plugin for generating critical css using [penthouse][1]. It
creates a new file in the chunk with suffix `.critical` before file extension.

Eg:

Your output: `styles.css`

New output: `styles.critical.css`


## Install

```sh
yarn add --dev webpack-critical-css-plugin
```

## Usage

In your **webpack.config.js**:

```javascript
const CriticalCssPlugin = require("webpack-critical-css-plugin");


const criticalHTML = {
  yourChunk: "file:///" + path.join(__dirname, "example.com.html"), // local html file
  anotherChunk: "https://example.com" // live url
};

entry: {
  yourChunk: path.join(__dirname, "yourChunk"),
  anotherChunk: path.join(__dirname, "anotherChunk"),
  yetAnotherChunk: path.join(__dirname, "yetAnotherChunkChunk"),
  ...
}

plugins: [
  ...,
  new CriticalCssPlugin({
    criticalHTML
  }),
  ...,
]
```

## Author

Mạnh Tài


[1]: https://github.com/pocketjoso/penthouse
