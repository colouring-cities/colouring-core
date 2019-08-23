// Template for production ecosystem file

// Copy this file and edit to set up pm2 config
// DO NOT COMMIT details to this file (publicly visible)
// See https://pm2.io/doc/en/runtime/guide/ecosystem-file/ for docs
module.exports = {
    apps: [
        {
            name: "colouringlondon",
            script: "./app/build/server.js",
            instances: 2,
            env: {
                NODE_ENV: "production",
                PGHOST: "hostname",
                PGPORT: 5432,
                PGDATABASE: "databasename",
                PGUSER: "username",
                PGPASSWORD: "longrandomsecret",
                APP_COOKIE_SECRET: "longrandomsecret",
                TILECACHE_PATH: "/path/to/tile/cache",
                MAIL_SERVER_HOST: "mail_hostname",
                MAIL_SERVER_PORT: 587,
                MAIL_SERVER_USER: "mail_username",
                MAIL_SERVER_PASSWORD: "longrandompassword",
            }
        }
    ]
}
