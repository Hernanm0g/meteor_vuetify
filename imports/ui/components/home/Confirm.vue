<template>
  <!-- Confirm -->
  <v-card>
    <v-card-title>
      {{$t('home.confirm.title')}}
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{$t('home.confirm.text_1')}}</span>
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
        <span>{{$t('home.confirm.text_2')}}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="orange"
        @click="showConfirm('Are you sure?', 'Really, really sure?')"
      >
        {{$t('home.confirm.show')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script cpl="vuetify">
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