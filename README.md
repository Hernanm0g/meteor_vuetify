# Meteor + Vue + Vuetify + Auth0 Authentication + Vuex + Vue Router ...
All you need to start your Real Time Web App
## Installation (Dev mode):

1. Install meteor (if is not installed yet).
2. Clone repository
  ``` git clone https://github.com/Hernanm0g/meteor_vuetify.git ```
3. Navigate to directory ``` cd meteor_vuetify ```
4. Edit the settings file: ``` cp settings.example.json settings.json ``` , with your own params.
5. Install node_modules: ``` meteor npm install ```
6. run Meteor: ``` npm start ```
7. Open in browser (http://localhost:3000)
8. Follow instructions to set Auth0 credentials.

![Working](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/working.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)

# Idea
* Back-end: Meteor and it's DDP + Optimistic U*I is wonderful for a rapid deployment and server-side js programming.
* Front-end: Vuejs and Vuetify are great for full-stack developers that want to learn and deliver software fast and continuosly. Even more, vuetify components give the ui an amazing look.
* Vuetify's A La Carte is an essential feature to reduce bundle size and give users a fast page load. We have developed a Meteor package: [meteor-vuetify-loader](https://atmospherejs.com/zer0th/meteor-vuetify-loader), that makes Meteor's default bundler load vuetify components on the fly. Check it out!, this boilerplate has this package already, you dont need to install it.
* User Authentication: Auth0 is a reliable authorization platform that allows several types of authentication, including social media, without having to write a line of code, and with instant results. Auth0 interacts in this boilerplate with meteor-accounts so you might want to use Meteor.user() and Meteor.userId() in both, client and server side.
* Vuex for state management.
* VueRouter for route management.
* EventBus for event listening across components.
* SSR for fast page load and Vue-meta for easy SEO management.

# Check out the Meteor-Vuetify's Performance
![69](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/performance.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)

thanks to SSR, dynamic Async imports and meteor-vuetify-lodaer, we can now have >60 performance score in lighthouse

# What you will find here.
## METEOR@2.2 + vue@2.6.12 + vuetify@2.4.7
![Working](https://raw.githubusercontent.com/Hernanm0g/meteor_vuetify/master/public/working.png?token=AI2CGORDIZCSEMOEWODVD2242L7AG)
## Vuetify A La Carte and Treeshaking.
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
We are using the awesome [OstrioFiles](https://atmospherejs.com/ostrio/files) package to manage uploads. Go to settings.json and set the path you want to store the uploaded files. Enjoy!!
## API creation based on templates
Now you can create your collections via Script. 
### Simple Collection
If you want to create a simple Books Collection just type:

`API_NAME=books npm run createApi`

You'll see your new collection methods and subscriptions inside /imports/api/collections/books.

And you can import your collections from server: 
```javascript
  import {Books} from '/imports/api/collections/books/server
```
or from client:
```javascript
  import {Books} from '/imports/api/collections/books/client
```
### File Collection
If you want to create a File Collection just type:
`MEDIA_API_NAME=booksMedia npm run createApi`

And you can import them the same way you did for simple collections

## SSR
Now you can have faster page loading thanks to akryum:vue-ssr. Check the /imports/startup/server/index.js
### vueMeta for SEO
Thanks to vueMeta, and its integration with vue-ssr and vueRouter, you can declare meta tags, title, and more in your .vue files, and they will be loaded on server side, letting your differents pages to be scanned easily by search engines.
## Testing
Now you can test your app, just by typing:

`npm run test`

You'll see that all your collections' created with the Api Templates have already test files that are executed during the test.

### Code coverage
After running the test script, you can go to http://localhost:3000/coverage and check the code coverage results.

## Deployment to production
[Read this](https://github.com/Hernanm0g/meteor_vuetify/blob/master/DEPLOYMENT.md)
# Contribute
Commit, make PR's, dont hesitate to submit issues.
Enjoy!!