const { spawn } = require('child_process');
const { join, resolve, basename } = require('path');
const pify = require('pify');
const Bundler = require('parcel-bundler');
const rimraf = pify(require('rimraf'));
const copy = require('copy-concurrently');

// Entrypoint file location
const file = join(__dirname, './admin/index.html');
const CONFIG_FILE = resolve('./admin/config.yml');

// Bundler options
const options = {
  outDir: resolve('./dist/admin'), // The out directory to put the build files in, defaults to dist
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
git.stdout.on('data', async data => {
  const exists =
    data
      .toString()
      .split(/\r?\n/)
      .filter(i => i.includes('admin')).length > 0;

  if (exists) {
    // delete ouput directory
    await rimraf(options.outDir);

    // bundle the admin
    await new Bundler(file, options);

    // copy config.yml to dist
    await copy(CONFIG_FILE, join(options.outDir, basename(CONFIG_FILE)));
  } else {
    console.log('no change on admin/ skip building admin');
  }
});

git.stderr.on('data', data => {
  console.log(`git show error: ${data}`);
});

git.on('close', code => {
  code !== 0 && console.log(`git show closed with exit code: ${code}`);
});