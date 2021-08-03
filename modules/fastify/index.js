'use strict';

const fastify = require('fastify')();
const pm2 = require('pm2');

const sendMessageToHarperDB = (message) => {
  try {
    pm2.connect(() => {
      pm2.list((err, data) => {
        data
        .filter((process) => process.name === 'harperdb')
        .map((process) => pm2.sendDataToProcessId({
            type: 'process:msg',
            topic: 'harperdb',
            data: message,
            id: process.pm_id,
          }, () => console.log('sent to harperdb'))
        );
      });
    });
  } catch (err) {
    console.log(err);
  }
}

fastify.route({
  method: 'POST',
  url: '/',
  handler: async (request) => {
    const { grid_size } = request.body;
    const array_of_arrays = [];
    const total_numbers = Math.pow(grid_size, 2);

    const numbers = [...new Array(total_numbers)]
    .map(() => Math.round(Math.random() * 100))
    .sort((a, b) => a - b)
    .reverse();

    for (let i = 0; i < grid_size; i += 1) {
      const next_subarray = numbers.splice(0, grid_size);
      array_of_arrays.push(next_subarray);
    }

    // send the message to harperdb
    sendMessageToHarperDB({ grid_size: grid_size, array_of_arrays: array_of_arrays });

    // return message to the fastify request
    return { message: `created ${grid_size} x ${grid_size} matrix` };
  },
})

const init = async () => {
  try {
    await fastify.listen(3001);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();
