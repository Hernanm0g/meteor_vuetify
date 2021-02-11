<template lang="html">
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @keyup.native.enter="save"
          >
            <v-row>
              <!-- given_name -->
              <v-col
                cols="12"
                sm="6"
                class="d-flex"
              >
                <v-text-field
                  v-model="values.given_name"
                  :counter="50"
                  label="Given Name"
                  required
                  :rules="[notEmpty]"
                  hint="p.e: Natalia"
                  prepend-icon="mdi-face"
                />
              </v-col>
              <!-- family_name -->
              <v-col
                cols="12"
                sm="6"
                class="d-flex"
              >
                <v-text-field
                  v-model="values.family_name"
                  :counter="50"
                  label="Family Name"
                  required
                  :rules="[notEmpty]"
                  hint="p.e: Díaz Santos"
                  prepend-icon="mdi-family-tree"
                />
              </v-col>
              <!-- DatePicker -->
              <v-col
                cols="12"
                sm="6"
                class="d-flex"
              >
                <date-picker
                  v-model="values.birthdate"
                  :max="new Date()"
                  label="Birth Date"
                  clearable
                  birthdate
                />
              </v-col>
              <!-- Phone -->
              <v-col
                cols="12"
                sm="6"
              >
                <phone-input
                  v-model="values.phone"
                  :rules="[notEmpty, mustBeNumber]"
                  :dial-code="values.dial_code"
                  @set-code="$set(values, 'dial_code', $event)"
                />
              </v-col>
              <!-- Email -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="values.email"
                  required
                  :rules="[notEmpty]"
                  label="E-mail"
                  prepend-icon="mdi-email"
                  type="email"
                  readonly
                />
              </v-col>
              <!-- Address -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="values.address"
                  label="Address"
                  hint="p.e: Carrera 17A # 116-55"
                  prepend-icon="mdi-map-marker"
                  type="text"
                />
              </v-col>
              <!-- City -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="values.city"
                  label="City"
                  hint="p.e: Bogotá"
                  type="text"
                  prepend-icon="mdi-city"
                />
              </v-col>
              <!-- state -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="values.state"
                  label="State / Province / Dpt"
                  hint="p.e: Bogotá D.C."
                  type="text"
                  prepend-icon="mdi-map-legend"
                />
              </v-col>
              <!--  Country -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="values.country"
                  label="Country"
                  hint="p.e: Colombia"
                  type="text"
                  prepend-icon="mdi-earth"
                />
              </v-col>
              <!-- Post code -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="values.postcode"
                  label="Post code"
                  hint="p.e: 110111"
                  type="text"
                  prepend-icon="mdi-post"
                />
              </v-col>
              <!-- Description -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-textarea
                  v-model="values.description"
                  label="Description"
                  rows="3"
                  hint="p.e: I like space ships"
                  prepend-icon="mdi-text"
                />
                <v-radio-group
                  v-model="values.gender"
                  :mandatory="false"
                  label="Gender"
                >
                  <v-radio
                    label="Male"
                    value="male"
                  />
                  <v-radio
                    label="Female"
                    value="female"
                  />
                  <v-radio
                    label="Other"
                    value="other"
                  />
                </v-radio-group>
              </v-col>
              <!-- Avatar -->
              <v-col
                cols="8"
                sm="4"
                offset="2"
                offset-sm="1"
              >
                <v-card flat>
                  <v-card-title class="title">
                    Avatar
                  </v-card-title>
                  <v-img
                    :src="!!avatar ? avatar : !!values.picture ? values.picture : '/img/logo.png'"
                    :aspect-ratio="1"
                    @click="!!values.picture ? zoomPlease(values.picture):null"
                  />
                  <div class="">
                    {{ progress.get }}
                  </div>
                  <v-progress-linear
                    v-if="!!loadingImage"
                    indeterminate
                  />
                  <v-card-actions>
                    <v-spacer />
                    <upload-button
                      :multiple="false"
                      @selected-callback="avatarSelected"
                    />
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :to="{name:'home'}">
            Back
          </v-btn>
          <v-btn
            color="primary"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">


/*--------  Collections  --------*/

import {UsersMedia} from '../../../api/collections/usersMedia/_client'

/*--------  Mixins  --------*/
import RulesMixin from '../../mixins/general/rules'
import {GetAvatarMixin} from '../../mixins/users/avatars'

/*--------  Components  --------*/

import UploadButton from '../../components/general/UploadButton.vue'
import PhoneInput from '../../components/general/PhoneInput.vue'
import DatePicker from '../../components/general/DatePicker.vue'
export default {
  name:"Profile",
  components: {
    UploadButton,
    DatePicker,
    PhoneInput
  },
  mixins:[
    RulesMixin,
    GetAvatarMixin
  ],
  data: function(){
    return {
      values: {},
      valid: true,
      menu: false,
      loadingImage: false,
      progress:false
    }
  },
  meteor: {
    // Get user logged
    user(){
      return Meteor.user();
    },
  },
  computed: {
    authenticated(){
      return this.$store.state.authenticated
    }
  },
  watch: {
    "user":{  
      handler(user){
        if(user?.profile){
          this.values = user.profile;
        }
      },
      immediate:true,
      deep:true
    }
  },
  mounted : function(){
    this.$store.commit("updateCrumbs", {
      position: 0,
      name: "Profile",
      icon:"mdi-face",
      link: {
        name:"profile"
      }
    })
  },
  methods: {
    avatarSelected: function(i){
      if(!!i && i.length){
        for (const v of i) {
          if(v.size > 3*1024*1024){
            this.$store.commit("snack", {
              text:"Image must not exceed 3MB!!",
              color:"error"
            })
            return false;
          }
        }
        this.loadingImage=true;
        // Save images on server
        // First lets save images on server (only new images)
        let file = i[0];
        if (file) {
          const uploadInstance = UsersMedia.insert({
            file: file,
            chunkSize: 'dynamic',
            meta: {
              user: this.user._id,
              type:"avatar",
              created: new Date(),
              updated: new Date(),
              createdBy: this.user._id,
              lastUpdatedBy: this.user._id
            }
          }, false);
          uploadInstance.on('end', (error) => {
            if (error) {
              console.log('Error during upload: ' + error.reason);
            }
            this.loadingImage=false;
            this.progress=false;
          });
          uploadInstance.start();
        }
      }
    },
    save: function(){
      if (!this.valid) {
        this.$store.commit("snack", {
          text:"confirm"
        });
        return false;
      }
      this.values.name = this.values.given_name+" "+this.values.family_name;
      // Save values to profile
      this.values.updated=new Date()
      Meteor.users.update( 
        { 
          _id: Meteor.userId() 
        }, 
        { 
          $set: {
            profile: this.values
          }
        } 
      );
      this.$store.commit("snack", {
        text:"Updated profile",
        color:"success"
      })
    }
  }
}
</script>

<style lang="css">
</style>
