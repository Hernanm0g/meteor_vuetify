<template>
  <v-card>
    <v-card-title>
      {{$t("home.installed.title")}}
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{$t('home.installed.text_1')}}</span>
        <br>
        <v-icon>mdi-home</v-icon> <a href="https://material.io/tools/icons/?style=baseline">Material Icons</a> installed
        <br>
        <span>{{$t('home.installed.text_2')}}</span>
        <br>
        <br>
        <span>{{$t('home.installed.times_clicked')}} {{ times }}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="orange"
        @click="clicked(clickId)"
      >
        {{$t('home.installed.click_me')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script cpl="vuetify">
  import {Clicks} from '../../../api/collections/clicks/_client'
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