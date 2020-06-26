# Meteor + Webpack + Vue + Vuetify + VueLoader + Auth0 Authentication + Vuex + Vue Router ...
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
* Back-end: Meteor and its DDP + Optimistic UI is wonderful for a rapid deployment and server-side js programming.
* Front-end: Vuejs and Vuetify are great for full-stack developers that want to learn and deliver software fast and continuosly. Even more, vuetify components give the ui an amazing look.
* Vuetify's A La Carte its an essential features to reduce bundle size and give users a fast page load. But Meteor's legacy bundler will not help, as VueLoader needs Weebpack@^4 to load the components as are requested. 
* User Authentication: Auth0 is a reliable authorization platform that allows several types of authentication, including social media, without having to write a line of code, and with instant results. Auth0 interacts in this boilerplate with meteor-accounts so you might want to use Meteor.user() and Meteor.userId() in both, client and server side.
* Vuex for state management.
* VueRouter for route management.
* EventBus for event listening.

# Webpack configuration
![thanks ardatan](https://github.com/ardatan/meteor-webpack)
This boilerplate is already configured with webpack, but if you want to try it follow the steps below...

# What you will find here.
## METEOR@1.10.2 + vue@2.6.11 + vuetify@2.3.2
![Working](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/working.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
## Vuetify A La Carte.
![A la carte](https://vuetifyjs.com/en/customization/a-la-carte/)
## Authentication with Auth0 lock 11.15.0. and Meteor-accounts
![login](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/login.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
![mongol](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/mongol.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
## Page Router and State Management (VueRouter and Vuex)
![vuex&VueRouter](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/vuerouter.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
## Profile Page with avatar.
![profile](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/profile.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
![avatar](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/avatar.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
Enjoy!!


# Webpack installation steps
1. `meteor remove ecmascript es5-shim static-html`
2. Remove this lines from package.json:
```
  "mainModule": {
    "client": "client/main.js",
    "server": "server/main.js"
  }
```
3. Add ardatan's packages:  
   `meteor add ardatan:webpack ardatan:webpack-dev-middleware`
4. Install webpack, babel, loaders and more devDependencies:  
   `meteor npm i -D webpack @babel/core @babel/preset-env html-webpack-plugin webpack-meteor-externals npm install vue-loader@15.9.3 vue-template-compiler vue-style-loader vuetify-loader css-loader sass sass-loader deepmerge babel-loader file-loader webpack-dev-middleware webpack-hot-middleware webpack-hot-server-middleware`
5. Create webpack.config.js as in this package.
6. Create .meteorignore as in this package
7. Start your app `NO_HMR=1 meteor`, wait until the bundle finishes and enjoy.