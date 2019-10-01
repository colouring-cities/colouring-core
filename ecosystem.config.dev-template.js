// Template for local development pm2 ecosystem file

// Copy this file and edit to set up pm2 config
// DO NOT COMMIT details to this file (publicly visible)
// See https://pm2.io/doc/en/runtime/guide/ecosystem-file/ for docs
module.exports = {
    apps : [
        {
            name: "app",
            cwd: "./app",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "development",
                TILECACHE_PATH: "./app/tilecache",

                // update these details in private copy
                PGHOST: "hostname",
                PGPORT: 5432,
                PGDATABASE: "databasename",
                PGUSER: "username",
                PGPASSWORD: "longrandomsecret",
                APP_COOKIE_SECRET: "longrandomsecret",
                MAIL_SERVER_HOST: "mail_hostname",
                MAIL_SERVER_PORT: 587,
                MAIL_SERVER_USER: "mail_username",
                MAIL_SERVER_PASSWORD: "longrandompassword",
                WEBAPP_ORIGIN: "http://localhost:3000",
                EXTRACTS_DIRECTORY: "/path/to/extracts",
            }
        }
    ]
  }
