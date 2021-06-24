module.exports = {
  apps : [{
    name: "module1",
    script: "./modules/module1/index.js",
    instances  : 4,
    exec_mode  : "cluster"
  },{
    name: "module2",
    script: "./modules/module2/index.js",
    instances  : 4,
    exec_mode  : "cluster"
  }]
}
