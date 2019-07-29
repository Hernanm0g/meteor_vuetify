<template lang="html">
  <v-layout row justify-center>
    <v-dialog v-model="active" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{title}}
        </v-card-title>
        <v-card-text>
          {{text}}
        </v-card-text>
        <v-card-actions>
          <v-btn  color="error" @click="close"><v-icon>close</v-icon>&nbsp;No</v-btn>
          <v-spacer></v-spacer>
          <v-btn  color="success" @click="accepted"><v-icon>check</v-icon>&nbsp;Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { EventBus } from '/imports/methods/event-bus.js';
export default {
  name:"Confirm",
  props: {
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close(){
      EventBus.$emit('confirmed', false);
    },
    accepted(){
      EventBus.$emit('confirmed', true)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
