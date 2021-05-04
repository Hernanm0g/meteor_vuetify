# Deployment Instructions

## 1. Prepare your server (Ubuntu)
1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Update source: `source .bashrc`
3. Install node and npm using nvm: `nvm install --lts`. (this will install the latest lts version, if you precise another version, run: `nvm ls-remote`, that will list all the versions you can install, and then run `nvm install 12.16.1` if you want the version 12.16.1)
4. Install [pm2](https://github.com/Unitech/pm2): `npm install pm2 -g`. Pm2 will manage your apps availability, check it out. its awesome!!
5. In case you want your db in the same server, install [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) comunity edition.
6. Once installed you can create a db for your app. just type: `mongo your_db_name`.
7. Install [nginx](https://ubuntu.com/tutorials/install-and-configure-nginx#1-overview). `sudo apt-get update && sudo apt-get install nginx`
8. Prepare the nginx proxy server configuration. This can be a little tricky, try this:
   1. `sudo nano /etc/nginx/sites-enabled/yourWebdomain`
   2.  Copy in that file the content of [nginx.config.example](https://github.com/Hernanm0g/meteor_vuetify/blob/master/nginx.config.example) in this repo. Make sure to change yourWebDomain, and set your ssl keys paths.
   3.  Make nginx service to start whenever the server starts: `sudo systemctl enable nginx`
   4.  start nginx service `sudo systemctl restart nginx`
   5.  If everything works well, now yourWebDomain.com points to Meteor app, that now is down, but will serving through port 3001. (btw, you can change this port whenever you want)
9.  Create a folder in your Server user's home directory called build. `mkdir ~/build`. there is where you will upload your app's source code.
10. Create a folder in your Server user's home dir called scripts. `mkdir ~/scripts`. there we will put some useful scripts for fast deployment management.
11. Create a folder in your Server user's home dir called backups. `mkdir ~/backups`. there you can put the db backups or anything else you need to keep save.
12. Create a file in your home directory called settings.json. `touch ~/settings.json`. And paste there your METEOR_SETTINGS json object.
13. Start a node project in your scripts folder. `cd ~/scripts && npm init`. Just press enter to all questions the terminal is going to show you. then you'll see a package.json in scripts folder.
14. Copy these lines into your ~/scripts/package.json, right in the scripts property.
  ```json
  "scripts": {
      "install--server": "tar -C ~/build -xf ~/build/yourAppName.tar.gz && cd ~/build/bundle/programs/server && npm i && npm audit fix",
      "start--prod": "cd ~/build/bundle/ && METEOR_LOG=debug METEOR_PROFILE=1 MONGO_URL=mongodb://127.0.0.1:27017/your_db_name ROOT_URL=https://yourWebDomain.com PORT=3001 METEOR_SETTINGS=$(cat ~/settings.json) pm2 start main.js --time --name='yourAppName'",
      "stop--prod": "pm2 stop yourAppName",
      "backup-db-prod": "mongodump --out=~/backups/ --port 27017 --db your_db_name -v",
      "restore-db-prod": "mongorestore --port 27017 -d your_db_name ~/backups/last"
    },
  ```
  Just make sure you change yourAppName, yourWebDomain and your_db_name

## 2. Prepare you build and upload scripts (Local).

1. Edit your meteor's package.json. Make sure that scripts has these included: 
```json
"scripts":{
    "build--prod": "npm i --production && METEOR_PROFILE=100 meteor --verbose build ../build --server-only --architecture os.linux.x86_64",
    "upload--build": "scp -i ~/yourSshKey.pem ../build/yourAppName.tar.gz yourServerUser@yourServerHostName:~/build/",
    "backup-db-dev": "mongodump --out=../backups/ --port 3001 --db meteor -v"
}
 
```
check that upload--build is uploading your app's compressed bundlo to ~/build directory in your server.

**!!Important**. All your bundles must be mounted outside your Meteor's app, so here we use ../build, relative to Meteor's app folder.

## 3. Deploy your app
1. Run `npm run build--prod` in your local Meteor folder. This will generate the bundle.
2. Run `npm run upload--build` in your local Meteor folder. This will upload the bundle to your server
3. Enter to your server using ssh  `ssh -i ~/yourSshKey.pem yourServerUser@yourServerHostName`
4. In your server, navigate to scripts `cd scripts`
5. If your app is running, make sure you stop it using `npm run stop--prod`
6. Decompress and Install the latest uploaded bundle: `npm run install--server`
7. Start your app using pm2: `npm run start--prod` 
8. Now you can go to yourWebDomain.com, and you should see there you app running.

Enjoy!
