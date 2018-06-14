/* eslint-disable import/no-extraneous-dependencies */
const Bundler = require('parcel-bundler');
const childProcess = require('child_process');

const file = 'index.js';
const options = { target: 'node', 'bundle-node-modules': true };

const bundler = new Bundler(file, options);

const runBundle = process.argv.includes('run');
let bundle = null;
let child = null;

bundler.on('bundled', (compiledBundle) => {
  bundle = compiledBundle;
});

bundler.on('buildEnd', () => {
  if (runBundle && bundle !== null) {
    if (child) {
      child.stdout.removeAllListeners('data');
      child.stderr.removeAllListeners('data');
      child.removeAllListeners('exit');
      child.kill();
    }
    child = childProcess.spawn('node', [bundle.name]);

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      process.stdout.write(data);
    });

    child.on('exit', (code) => {
      console.log(`Child process exited with code ${code}`);
      child = null;
    });
  }

  bundle = null;
});

bundler.bundle();
