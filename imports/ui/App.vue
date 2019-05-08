<template lang="html">
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Meteor and vuetify are now installed!!</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">This is an example of vuetify's v-card</span>
            <br>
            <v-icon>home</v-icon> Material Icons installed
            <br>
            <v-icon>fa fa-link</v-icon> Fontawesome installed
            <br>
            <br>
            <span>Want to see meteor in action? Open me in another tab and click on "CLICK ME!!" on this tab</span>
            <br>
            <br>
            <span>Times clicked: {{ times }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="clicked(click_id)">Click Me!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import { Clicks } from "/imports/api/clicks"
export default {
  name:"HelloWorldCard",
  data() {
    return {
      click_id:0
    }
  },
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
