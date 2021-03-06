module.exports = {
  apps : [{
    name: 'blog',
    script: './bin/www',

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
      host : '154.8.204.98',
      ref  : 'origin/master',
      repo : 'git@github.com:mission-sun/mission-blog-koa.git',
      path : '/home/root-mission/blog/serve',
      'pre-deploy': "git fetch",
      'post-deploy' : 'npm install --registry=https://registry.npm.taobao.org && pm2 reload ecosystem.config.js --env production'
    }
  }
};


// 'post-deploy' : 'npm install && npm run build && pm2 start build.sh  --interpreter bash'
