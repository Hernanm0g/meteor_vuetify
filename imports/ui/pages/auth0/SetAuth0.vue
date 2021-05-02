<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title primary-title>
          Auth0 Setup instructions
        </v-card-title>
        <v-card-text>
          <ol>
            <li>
              Go to 
              <a
                href="https://auth0.com/"
                target="_blank"
              >
                Auth0 home page.
              </a> and log in or sign up.
            </li>
            <li>
              On Dashboard, click on Create Application.
            </li>
            <li>
              Type your application name and select Single Page Web Application. Click on Create.
            </li>
            <li>
              On Settings tab, you'll find several fields in blank, type 'http://localhost:3000' (Or your production domain) in 'Allowed Callback URLs', 'Allowed logout Urls' and 'Allowed Web Origins' fields.
            </li>
            <li>
              Now, copy your app's "Client ID", "Domain", "audience" and "callback" (logout callback) fields. There you'll find some examples.
            </li>
            <li>
              Paste them in the file settins.json under public/AUTH0.
            </li>
            <li>
              Go to Home page and click on "Log Me In!!".
            </li>
          </ol>
          <br>
          <p>
            Or if you prefer, you can use our Demo auth0 credentials, it will only work with http://localhost:3000 as url.
            <ul>
              <li>CLIENT_ID = "EcVtt1PoK8fUDCf6paFeh3H6eFfQOtBa"</li>
              <li>DOMAIN = "totoom.eu.auth0.com"</li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script  lang="js" cpl="vuetify">
export default {
  name:"SetAuth0",
  metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Set Auth0',
      meta: [
        { name: 'description', content: 'Meteor Vuetify Integration. SetAth0 Example description.' },
        { name: 'keywords', content: 'Meteor vuetify integraiton. SetAth0 Example keywords' },
      ]
    },
  mounted(){
    this.$store.commit("updateCrumbs", {
      position: 0,
      name: "Set Auth0",
      icon:"mdi-account-question",
      link: {
        name:"setauth0"
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>