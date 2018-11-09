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
    const bundleName = bundle.name;
    if (child) {
      child.removeAllListeners('exit');

      child.on('exit', () => {
        child = spawnProcess(bundleName);
      });
      child.kill();
    } else {
      child = spawnProcess(bundleName);
    }
  }

  bundle = null;
});

function spawnProcess(bundleName) {
  const newProcess = childProcess.spawn(process.argv[0], [bundleName]);

  newProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  newProcess.stderr.on('data', (data) => {
    process.stdout.write(data);
  });

  newProcess.on('exit', (code, signal) => {
    console.log(`Child process exited with code ${code} (${signal})`);
    child = spawnProcess(bundleName);
  });

  return newProcess;
}

bundler.bundle();
