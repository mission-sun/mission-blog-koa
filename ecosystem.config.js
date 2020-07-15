module.exports = {
  apps : [{
    name: 'nodeDeployfe',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root-mission',
      host : '49.234.222.116',
      ref  : 'origin/master',
      repo : 'https://github.com/mission-sun/mission-blog.git',
      path : '/home/root-mission/blog/static',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};


// 'post-deploy' : 'npm install && npm run build && pm2 start build.sh  --interpreter bash'
