# Meteor + Webpack + Vue + Vuetify + VueLoader + Auth0 Authentication + Vuex + Vue Router ...
All you need to start your Real Time Web App
## Installation (Dev mode):

1. Install meteor (if is not installed yet).
2. Clone repository
  ``` git clone https://github.com/Hernanm0g/meteor_vuetify.git ```
3. Navigate to directory ``` cd meteor_vuetify ```
4. Run ``` meteor npm install ```
5. run Meteor ``` meteor ```
6. Open in browser (localhost:3000)
7. Follow instructions to set Auth0 credentials.

![Working](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/working.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)

# Idea
* Back-end: Meteor and it's DDP + Optimistic UI is wonderful for a rapid deployment and server-side js programming.
* Front-end: Vuejs and Vuetify are great for full-stack developers that want to learn and deliver software fast and continuosly. Even more, vuetify components give the ui an amazing look.
* Vuetify's A La Carte is an essential features to reduce bundle size and give users a fast page load. But Meteor's legacy bundler will not help, as VueLoader needs Webpack@^4 to load the components as are requested. 
* User Authentication: Auth0 is a reliable authorization platform that allows several types of authentication, including social media, without having to write a line of code, and with instant results. Auth0 interacts in this boilerplate with meteor-accounts so you might want to use Meteor.user() and Meteor.userId() in both, client and server side.
* Vuex for state management.
* VueRouter for route management.
* EventBus for event listening across components.

# Webpack configuration
[thanks ardatan!](https://github.com/ardatan/meteor-webpack)
This boilerplate is already configured with webpack, if you want to configure webpack bundler in your meteor project, follow the steps [below!](#webpack-installation-steps)...

# What you will find here.
## METEOR@1.11.1 + vue@2.6.12 + vuetify@2.3.15
![Working](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/working.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
## Vuetify A La Carte.
[A la carte!](https://vuetifyjs.com/en/customization/a-la-carte/)
## Authentication with Auth0 Universal Login and Meteor-accounts
![login](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/login.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
![mongol](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/mongol.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)

* You can easily access methods login and logout in any component via vuex action: `this.$store.dispatch('login')` or `this.$store.dispatch('logout')`
* **Dont forget to set your auth0 credentias**
## Page Router and State Management (VueRouter and Vuex)
![vuex&VueRouter](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/vuerouter.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
## Profile Page with avatar.
![profile](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/profile.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
![avatar](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/avatar.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
Enjoy!!
## Template API folder
**Important!**: Take into account that webpack will not resolve correctly Meteor.isClient and Meteor.isServer methods, so its really, really important to keep client side code and server side code in different files. Thats why you'll find in `/imports/api` folder all the api collections distributed in three files: server.js (For server side code), client.js (for client side code) and shared.js (For shared code e.g. Meteor Methods). Use the template folder in `/imports/api/template/` to get the basic scaffolding for every collection. 
* When importing in client use `import {Template} from '/imports/api/template/client'`
* When importing in server use `import {Template} from '/imports/api/template/server'`


# Webpack installation steps
This project already has Webpack built-in, but if you want to know how we did it, here are some steps you can try:
1. `meteor remove ecmascript es5-shim static-html`
2. Remove this lines from package.json:
```
  "mainModule": {
    "client": "client/main.js",
    "server": "server/main.js"
  }
```
3.  Add ardatan's packages:  
   `meteor add ardatan:webpack ardatan:webpack-dev-middleware`
4. Install webpack, babel, loaders and more devDependencies:  
   `meteor npm i -D webpack @babel/core @babel/preset-env html-webpack-plugin webpack-meteor-externals vue-loader@15.9.3 vue-template-compiler vue-style-loader vuetify-loader css-loader sass sass-loader deepmerge babel-loader file-loader webpack-dev-middleware webpack-hot-middleware webpack-hot-server-middleware @babel/plugin-syntax-dynamic-import webpack-node-externals`
5. Create webpack.config.js as in this package.
6. Create .meteorignore as in this package.
7. Add a .babelrc file as in this package.
8. Start your app `meteor`, wait until the bundle finishes and enjoy.
