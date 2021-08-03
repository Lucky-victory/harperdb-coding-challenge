const pm2 = require('pm2');
const { readdirSync } = require('fs');

const init = () => {
  const apps = readdirSync('./modules', { withFileTypes: true })
  .filter(module => module.isDirectory())
  .map(module => ({
    name: module.name,
    script: `./modules/${module.name}/index.js`,
    instances: 1,
    exec_mode: 'cluster'
  }));

  pm2.start(apps);
}

init();
