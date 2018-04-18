/**
 * Generate a Netlify HTTP2 Server Push configuration.
 *
 * Options:
 * - headersFile {string} path to the _headers file that should be generated (relative to your output dir)
 */
class NetlifyServerPushPlugin {
  constructor(options) {
    const defaults = { headersFile: '_headers' };
    this.options = Object.assign(defaults, options);
  }

  generateAssetHeaders(assets) {
    // Turn script files into script tags
    const scriptHeaders = assets.js.map(
      path => `\tLink: ${path}; rel=preload; as=script`
    );
    const styleHeaders = assets.css.map(
      path => `\tLink: ${path}; rel=preload; as=stylesheet`
    );
    return `/*\n${scriptHeaders.concat(styleHeaders).join('\n')}\n`;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('NetlifyServerPushPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(
        'NetlifyServerPushPlugin',
        data => {
          const source = this.generateAssetHeaders(data.assets);
          compilation.assets[`${this.options.headersFile}`] = {
            source: () => source,
            size: () => source.length,
          };
        }
      );
    });
  }
}

export default NetlifyServerPushPlugin;