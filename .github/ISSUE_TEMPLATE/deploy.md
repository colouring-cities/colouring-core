---
name: Deploy Colouring London
about: Checklist for deploying an update
title: ''
labels: ''
assignees: ''

---

Deploy checklist:

- [ ] wait for CI to pass
- [ ] log on to VPN
- [ ] log in to staging, pull changes and build

        ssh staging.colouring.london
        sudo su - colouringlondonstaging
        cd /var/www/colouring-london
        git pull
        npm ci
        npm run build
        pm2 restart all

- [ ] user acceptance test https://clstaging.casa.ucl.ac.uk/
- [ ] log in to production, pull changes and build as for staging

Optional steps:

- [ ] run database migrations
- [ ] clear and rebuild tile cache
