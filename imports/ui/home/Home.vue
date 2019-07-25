<template lang="html">
  <v-layout row wrap>
    <!-- Meteor and vuetify -->
    <v-flex xs12 sm6 md4 d-flex>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Meteor and vuetify are now installed!!</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <span class="grey--text">This is an example of vuetify's v-card</span>
            <br>
            <v-icon>home</v-icon> <a href="https://material.io/tools/icons/?style=baseline">Material Icons</a> installed
            <br>
            <v-icon>fa fa-link</v-icon> <a href="https://fontawesome.com/">Fontawesome</a> installed
            <br>
            <br>
            <span>Want to see meteor in action? Open me in another tab and click on "CLICK ME!!" on this card.</span>
            <br>
            <br>
            <span>Times clicked: {{ times }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="orange" @click="clicked(click_id)">Click Me!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- Auth0  and meteor-accounts-->
    <v-flex xs12 sm6 md4 d-flex>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://apod.nasa.gov/apod/image/1906/Fusco-BigSurKonaMWBioluminescenceMars-exif1024.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">User Authentication with Auth0</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <span class="grey--text">Auth0 Lock and meteor-accounts!!</span>
            <br>
            <v-icon>fas fa-sign-in-alt</v-icon> <a href="https://auth0.com/docs/libraries/lock/v11" target="_blank">Auth0 Lock</a> via CDN.
            <br>
            <v-icon>person</v-icon> <a href="https://guide.meteor.com/accounts.html" target="_blank">Meteor-accounts</a> installed.
            <br>
            <br>
            <span v-if="!settedAuth0">Want to see auth0 and meteor-accounts in action? click on "Set Auth0!!" on this card.</span>
            <span v-else-if="!authenticated">Want to see auth0 and meteor-accounts in action? click on "Log me in!!" on this card.</span>
            <span v-else>Want to see auth0 and meteor-accounts in action? deploy mongol "ctrl+m". Now you can use Meteor.user() and Meteor.userId() on Client and server side. <strong>Check out the Profile page.</strong></span>
            <br>
            <br>
            <span>Authenticated: <strong>{{ authenticated }}</strong></span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="orange" v-if="!settedAuth0" :to="{name:'setauth0'}">Set AUTH0!!</v-btn>
          <v-btn text color="orange" @click="login" v-else-if="!authenticated">Log me in!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- Vue router and Vuex -->
    <v-flex xs12 sm6 md4 d-flex>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://apod.nasa.gov/apod/image/1906/NoctilucentNetherlands_Simmering_1080.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Page Router and State Management</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <span class="grey--text">Vue Router and Vuex</span>
            <br>
            <v-icon>link</v-icon> <a href="https://router.vuejs.org/" target="_blank">Vue router</a> installed.
            <br>
            <v-icon>cloud</v-icon> <a href="https://vuex.vuejs.org/" target="_blank">Vuex</a> installed.
            <br>
            <br>
            <span>Want to see VueRouter and Vuex in action? Click on "Change route!!" on this card and watch the breadcrumbs above.</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="orange" :to="{name:'about'}">Change route!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- Profile page -->
    <v-flex xs12 sm6 md4 d-flex>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://apod.nasa.gov/apod/image/1906/D7X7411-2Loic_1024.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Profile page with Avatar.</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <span class="grey--text">Users can edit their profile info.</span>
            <br>
            <v-icon>person</v-icon> <a href="https://docs.meteor.com/api/accounts.html#Meteor-users" target="_blank">Meteor.users.update()</a>.
            <br>
            <v-icon>face</v-icon> <a href="https://github.com/VeliovGroup/Meteor-Files" target="_blank">ostrio-files</a> For avatar private links.
            <br>
            <br>
            <span v-if="!authenticated">Want to see meteor.users.update() and meteor-files? Log in first.</span>
            <span v-else>Want to see meteor.users.update() and meteor-files in action? Click on "See Profile!!" on this card.</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="orange" :to="{name:'profile'}" v-if="authenticated">See Profile!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- Confirm -->
    <v-flex xs12 sm6 md4 d-flex>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://apod.nasa.gov/apod/image/1904/M33Meteor_Chokshi_960.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">EventBus and Custom Confirm Dialogs</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <span class="grey--text">Listen to events in the DOM with EventBus.</span>
            <br>
            <v-icon>offline_bolt</v-icon> <a href="https://alligator.io/vuejs/global-event-bus/" target="_blank">EventBus</a> for event listeners.
            <br>
            <v-icon>touch_app</v-icon> <a href="https://vuetifyjs.com/en/components/dialogs" target="_blank">Vuetify Dialogs</a>
            <br>
            <br>
            <span>Want to see EventBus and Confirm Dialogs in action? click on "Show!!" on this card.</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="orange" @click="showConfirm('Are you sure?', 'Really, really sure?')">Show!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- SnackBar -->
    <v-flex xs12 sm6 md4 d-flex>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://apod.nasa.gov/apod/image/1905/crs17spaceXboggs1024.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Notifications with SnackBar</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <span class="grey--text">Vuetify Snackbars are great for users notifications!!</span>
            <br>
            <v-icon>cloud</v-icon> <a href="https://vuex.vuejs.org/" target="_blank">Vuex</a> for state management.
            <br>
            <v-icon>sms</v-icon> <a href="https://vuetifyjs.com/en/components/snackbars" target="_blank">Vuetify Snackbars</a>
            <br>
            <br>
            <span>Want to see SnackBars in action? Click on "Show" buttons on this card.</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="success" @click="showSnack('success')">Show!!</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="showSnack('error')">Show!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Clicks } from "/imports/api/clicks"
import { AUTH0 } from '/imports/auth0-variables'

export default {
  name:"Home",
  methods: {
    clicked(id) {
      self=this;
      if(!id){
        Clicks.insert(
          {
            times:1
          },
          (err, result) => {
            self.addOne(id)
            return
          }
        )
      } else {
        this.addOne(id);
      }

    },
    addOne(id) {
      Clicks.update(
        {
          _id : id
        },
        {
          $inc: {
            times : 1
          }
        }
      )
    },
    login(){
      this.$emit("logmein");
    },
    showSnack(color, text=false){
      if (!text) {
        text:"This is "+color+"."
      }
      this.$store.commit("snack",{
        color,
        text
      });
    },
    showConfirm(title, text){
      this.confirm(title, text).then((res)=>{
        if (!res) {
          this.showSnack("error", "Not accepted");
          return;
        }
        this.showSnack("success", "Accepted");
      })
    }
  },
  computed: {
    settedAuth0(){
      return !!AUTH0.CLIENT_ID && !!AUTH0.DOMAIN
    }
  },
  meteor: {
    times(){
      clicks = Clicks.find({}).fetch();
      this.click_id = !!clicks.length ? clicks[0]._id : 0;
      return !!clicks.length ? clicks[0].times: 0;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
