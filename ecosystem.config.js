module.exports = {
  apps: [{
    name: 'Server',
    script: './server/index.js',
    instance_vars: '--harmony',
    exec_mode: 'cluster',
    instances: process.env.INSTANCES || '1',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
