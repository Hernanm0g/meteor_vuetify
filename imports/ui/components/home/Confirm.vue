<template>
  <!-- Confirm -->
  <v-card>
    <v-card-title>
      EventBus and Custom Confirm Dialogs
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">Listen to events in the DOM with EventBus.</span>
        <br>
        <v-icon>mdi-lightbulb-group</v-icon> <a
          href="https://alligator.io/vuejs/global-event-bus/"
          target="_blank"
        >EventBus</a> for event listeners.
        <br>
        <v-icon>mdi-thumb-up</v-icon> <a
          href="https://vuetifyjs.com/en/components/dialogs"
          target="_blank"
        >Vuetify Dialogs</a>
        <br>
        <br>
        <span>Want to see EventBus and Confirm Dialogs in action? click on "Show!!" on this card.</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="orange"
        @click="showConfirm('Are you sure?', 'Really, really sure?')"
      >
        Show!!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  import ConfirmMixin from '../../mixins/general/confirm'
  export default {
    name:"Confirm",
    mixins:[
      ConfirmMixin  
    ],
    methods: {
      showConfirm(title,text){
        this.confirm({title, text})
          .then(res=>{
            if (!res) {
              this.$store.commit("snack", {
                text: "Not accepted",
                color:"error"
              })
              return;
            }
            this.$store.commit("snack", {
                text: "Accepted",
                color:"success"
              })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>