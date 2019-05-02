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

            }
        }
    ]
  }
