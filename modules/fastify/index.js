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

    // create an array of arrays.
    // the main array should have ${grid_size} rows
    // the sub arrays should each have ${grid_size} elements
    const array_of_arrays = [];
    /*
    const numbers = [...new Array(grid_size * grid_size)].map(() => Math.round(Math.random() * 100)).sort().reverse();

    console.log(numbers);
    */

    // send the message to harperdb
    sendMessageToHarperDB({ grid_size: grid_size, array_of_arrays: array_of_arrays });

    // return message to the fastify request
    return { message: `created ${grid_size} x ${grid_size} matrix` };
  },
})

const init = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();
