<template>
  <v-card>
    <v-img
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>
        Meteor and vuetify are now installed!!
      </v-card-title>
    </v-img>
    <v-card-text>
      <div>
        <span class="grey--text">This is an example of vuetify's v-card</span>
        <br>
        <v-icon>mdi-home</v-icon> <a href="https://material.io/tools/icons/?style=baseline">Material Icons</a> installed
        <br>
        <v-icon>fa fa-link</v-icon> <a href="https://fontawesome.com/">Fontawesome</a> installed
        <br>
        <br>
        <span>Want to see Meteor's Real Time Subscription in action? Open me in another tab and click on "CLICK ME!!" on this card.</span>
        <br>
        <br>
        <span>Times clicked: {{ times }}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="orange"
        @click="clicked(clickId)"
      >
        Click Me!!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  import {Clicks} from '../../../api/collections/clicks/client'
  export default {
    name:"Installed",
    meteor: {
      $subscribe: {
        "clicks.get.all": [0,1] // Skip, limit
      },
      click(){
        return Clicks.findOne()
      }
    },
    computed: {
      clickId(){
        return this.click ? this.click._id : undefined
      },
      times(){
        return this.click ? this.click.times : 0
      }
    },
    methods: {
      clicked(_id){
        if(!_id){
          // Create a click
          Meteor.call(
            "clicks.upsert",
            {
              times:1
            }
          )
          return
        }
        Meteor.call(
          "clicks.inc",
          {
            _id,
            times:1
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>