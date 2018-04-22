const { spawn } = require('child_process');
const fs = require('fs');
const Bundler = require('parcel-bundler');
const path = require('path');
const ghpages = require('gh-pages');
const pkg = require('../package.json');
const cp = require('cp');
const cheerio = require('cheerio');

const argued = check => process.argv.indexOf(check) > -1

// Entrypoint file location
const file = path.join(__dirname, './index.html');
const ymlFile = path.join(__dirname, './config.yml');

// Bundler options
const options = {
  outDir: path.join(__dirname, '../dist/admin'), // The out directory to put the build files in, defaults to dist
  // outFile: 'index.html', // The name of the outputFile
  publicUrl: '/', // The url to server on, defaults to dist
  watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
  target: 'browser', // browser/node/electron, defaults to browser
  logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
  detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
};

const git = spawn('git', ['show', '--pretty=format:', '--name-only']);
git.stdout.on('data', data => {
  const shoudBuild = argued('-force') ||
    data
      .toString()
      .split(/\r?\n/)
      .filter(i => i.includes('admin')).length > 0;

  if (shoudBuild && !argued('-skip')) {
    process.env.NODE_ENV = 'production'
    const bundler = new Bundler(file, options);
    bundler.bundle().then(bundle => {
      console.log('creating _headers from bundled html');
      const html = fs.readFileSync(path.join(options.outDir, 'index.html')).toString();
      const $ = cheerio.load(html);
      let _headers = `/*\n`
      $('link[rel=preload]')
      .each((i, {attribs}) => {
        _headers +=`\tLink: <${attribs.href}>; rel=${attribs.rel}; as=${attribs.as}\n`
      })
      fs.writeFileSync(path.join(options.outDir, '_headers'), _headers);

      console.log('copying config.yml')
      cp.sync(ymlFile, path.join(options.outDir, path.basename(ymlFile)))

      console.log('creating netlify.toml file')
      fs.writeFileSync(path.join(options.outDir, 'netlify.toml'), `[build]\n\tpublish = "."\n\tcommand = "echo ***** Manager page created *****"`)

      console.log(`creating manager page`);
      if(!argued('-nopublish')) ghpages.publish(options.outDir, {
        user: pkg.author,
        branch: 'manager',
        message: 'chore: manager page updated'
      }, err => {
        err ? console.error(err) : console.log(`admin page created`);
      });
    });
  } else {
    console.log('skip building admin');
  }
});

git.stderr.on('data', data => {
  console.log(`git show error: ${data}`);
});

git.on('close', code => {
  code && console.log(`git show closed with exit code: ${code}`);
});