module.exports = {
  apps: [
    {
      name: "meu-app-dev",
      script: "npm",
      args: "run dev",
      cwd: "/FinanceFull", // ajusta para a pasta do projeto
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: true,
      ignore_watch: [
        "node_modules",
        "logs",
        ".git"
      ],
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "logs/err.log",
      out_file: "logs/out.log"
    }
  ]
}
