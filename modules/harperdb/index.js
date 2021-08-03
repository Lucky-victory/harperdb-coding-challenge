'use strict';

const axios = require('axios');

const HDB_URL = 'http://localhost:9925';
const HDB_USERNAME = 'HDB_ADMIN'
const HDB_PASSWORD = 'password'

const sendToHDB = (payload) => axios({
  method: 'post',
  url: HDB_URL,
  auth: {
    username: HDB_USERNAME, password: HDB_PASSWORD
  },
  data: payload,
});

const init = async () => {
  try {
    await sendToHDB({ operation: 'create_schema', schema: 'dev' });
  } catch (e) {
    console.log(e.response.data.error);
  }

  try {
    await sendToHDB({ operation: 'create_table', schema: 'dev', table: 'test', hash_attribute: 'id' });
  } catch (e) {
    console.log(e.response.data.error);
  }

  process.on('message', async (message) => {
    try {
      const result = await sendToHDB({ operation: 'insert', schema: 'dev', table: 'test', records: [message.data] });
      console.log(result.data);
    } catch (e) {
      console.log(e.response.data.error);
    }
  })
}

init();


