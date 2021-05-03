# Changelog

## Q2.1.10 - 2021-05-02
- Moved routes to /imports/ui/folder
- Fixed bug: Use CreateIndex instead od CreateIndexes on Collection's template
- Updated Meteor to @2.2
- Updated to Vuetify@2.4.11
- Added cpl="vuetify" to script tags. Soon: Remove lang="js" when PR to vue-component is merged
- Update vuetify loader, Loading modules based on env dev or prod.
## @2.0.31 - 2021-03-27
- Updated to meteor@2.1 and Vuetify@2.4.7
- Improved Performance on Home Page
## @2.0.30 - 2021-02-27
- Added sass-variables integration
- Tested with lighter vuetify imports using import Vuetify from 'vuetify/lib/framewor'. This reduces the initial client bundle size to 500Kb
## @2.0.02 - 2021-02-10
- Added HMR
- Added SSR by default using vue-ssr
- Added Vue-meta integrated with SSR for SEO
