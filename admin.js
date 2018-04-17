const { spawn } = require('child_process');
const fs = require('fs');
const Bundler = require('parcel-bundler');
const path = require('path');
const ghpages = require('gh-pages');
const pkg = require('./package.json');

// Entrypoint file location
const file = path.join(__dirname, './admin/index.html');
const ymlFile = path.join(__dirname, './static/config.yml');

// Bundler options
const options = {
  outDir: './dist/admin', // The out directory to put the build files in, defaults to dist
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
  const exists =
    data
      .toString()
      .split(/\r?\n/)
      .filter(i => i.includes('admin')).length > 0;

  if (exists) {
    const bundler = new Bundler(file, options);
    bundler.bundle().then(bundle => {
      copyFile(
        ymlFile,
        path.join(options.outDir, path.basename(ymlFile)),
        () => {
          fs.writeFileSync(path.join(options.outDir, 'netlify.toml'), `[build]\n\tpublish = "."\n\tcommand = "echo ***** Manager page created *****"`)
          console.log(`${ymlFile} copied`);
          console.log(`creating manager page`);

          ghpages.publish(options.outDir, {
            user: pkg.author,
            branch: 'manager',
            message: 'chore: manager page updated'
          }, err => {
            err ? console.error(err) : console.log(`admin page created`);
          });
        }
      );
    });
  } else {
    console.log('no change on admin/ skip building admin');
  }
});

git.stderr.on('data', data => {
  console.log(`git show error: ${data}`);
});

git.on('close', code => {
  code && console.log(`git show closed with exit code: ${code}`);
});

function copyFile(source, target, cb) {
  let cbed = false;

  const rd = fs.createReadStream(source);
  rd.on('error', done);

  const wr = fs.createWriteStream(target);
  wr.on('error', done);
  wr.on('close', () => done());
  rd.pipe(wr);

  function done(err) {
    if (!cbed) {
      cb(err);
      cbed = true;
    }
  }
}