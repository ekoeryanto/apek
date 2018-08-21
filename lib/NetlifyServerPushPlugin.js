/**
 * Generate a Netlify HTTP2 Server Push configuration.
 *
 * Options:
 * - headersFile {string} path to the _headers file that should be generated (relative to your output dir)
 */
function NetlifyServerPushPlugin(options) {
  this.options = options;
}

NetlifyServerPushPlugin.prototype.generateAssetHeaders = function (assets) {
  // Turn script files into script tags
  const scriptHeaders = assets.js.map(path => `  Link: ${path}; rel=preload; as=script`);
  const styleHeaders = assets.css.map(path => `  Link: ${path}; rel=preload; as=stylesheet`);
  return `/*
${scriptHeaders.concat(styleHeaders).join('\n')}
`;
};

NetlifyServerPushPlugin.prototype.apply = function (compiler) {

  compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
    console.log('The compiler is starting a new compilation...');
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
      'MyPlugin',
      (htmlPluginData, callback) => {
        const assets = htmlPluginData.assets;
        const source = this.generateAssetHeaders(assets);
        compilation.assets[`${this.options.headersFile}`] = {
          source: () => source,
          size: () => source.length
        };
        callback(null, htmlPluginData);
        }
    )
  });
};

module.exports = NetlifyServerPushPlugin;