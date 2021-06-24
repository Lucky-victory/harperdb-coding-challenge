'use strict';

const name = 'module 1';
const sleepFor = 10000;
let loop = 1;

async function init(loop) {
  console.log(name, loop);
  await sleep(sleepFor);
  init(loop + 1);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

init(loop);
