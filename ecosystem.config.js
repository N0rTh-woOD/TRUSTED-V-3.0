module.exports = {
  apps: [
    {
      name: 'trusted-v-backend',
      cwd: '/var/www/trusted-v/backend',
      script: 'venv/bin/uvicorn',
      args: 'server:app --host 0.0.0.0 --port 8001',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/trusted-v-backend-error.log',
      out_file: '/var/log/pm2/trusted-v-backend-out.log',
      log_file: '/var/log/pm2/trusted-v-backend-combined.log',
      time: true,
    },
  ],
};
