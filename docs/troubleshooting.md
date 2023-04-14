# Troubleshooting Colouring Cities

## 502 Error
If you get a 502 error on the server after updating the deployment, there are a few solutions you can try to fix it.
Note: This seems to often occur after the dependencies (package-lock.json) have been update.

- The quickest and easiest solution is to do a full reboot of the server, to get rid of any caching issues.
- Alternatively, try deleting all of the files in the deployment folder (i.e. /var/www/colouring-london/app for Colouring London) before rebuilding/redeploying the app, as that will get rid of any erroneous files.
