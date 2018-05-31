import hello from './lib';

let counter = 0;
function wait() {
  counter += 1;
  console.log(counter);
  hello();
  setTimeout(wait, 1000);
}

wait();
