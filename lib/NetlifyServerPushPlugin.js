/**
 * Generate a Netlify HTTP2 Server Push configuration.
 *
 * Options:
 * - headersFile {string} path to the _headers file that should be generated (relative to your output dir)
 */
class NetlifyServerPushPlugin {
  constructor(options) {
    this.options = options;
  }

  generateAssetHeaders(assets) {
    // Turn script files into script tags
    const scriptHeaders = assets.js.map(path => `  Link: ${path}; rel=preload; as=script`);
    const styleHeaders = assets.css.map(path => `  Link: ${path}; rel=preload; as=stylesheet`);
    return `/*\n${scriptHeaders.concat(styleHeaders).join('\n')}`;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
        const assets = htmlPluginData.assets;
        const source = this.generateAssetHeaders(assets);
        compilation.assets[`${this.options.headersFile}`] = {
          source: () => source,
          size: () => source.length
        };
        callback(null, htmlPluginData);
      });
    });
  }
}

export default NetlifyServerPushPlugin;