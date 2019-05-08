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
            <br>
            <span>Want to see meteor in action? Open me in another tab and click on "CLICK ME!!" on this tab</span>
            <br>
            <br>
            <span>Times clicked: {{ times }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="clicked">Click Me!!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name:"HelloWorldCard",
  data:() => {
    return {
      times : 0
    }
  },
  methods: {
    clicked: () => {
      console.log("Clickme");
    }
  }
}
</script>

<style lang="css" scoped>
</style>
