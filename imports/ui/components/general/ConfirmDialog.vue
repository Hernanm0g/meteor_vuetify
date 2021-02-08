<template lang="html">
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="confirm.dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title>
          {{ confirm.title }}
        </v-card-title>
        <v-card-text
          v-html="confirm.text"
        />
        <v-card-actions>
          <v-btn
            color="error"
            @click="close"
          >
            <v-icon>mdi-close</v-icon>&nbsp;No
          </v-btn>
          <v-spacer />
          <v-btn
            color="success"
            @click="accepted"
          >
            <v-icon>mdi-check</v-icon>&nbsp;Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="js">
import { EventBus } from '../../mixins/general/event-bus';
export default {
  name:"ConfirmDialog",
  computed: {
    confirm:{
      get(){
        return this.$store.state.confirm
      },
      set(){

      }
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
