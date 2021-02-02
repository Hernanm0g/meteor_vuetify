<template>
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
              <!-- <v-col
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
                      @selected-callback="imageSelected"
                    />
                  </v-card-actions>
                </v-card>
              </v-col> -->
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


/*--------  Mixins  --------*/
import RulesMixin from '../../mixins/general/rules'

/*--------  Components  --------*/

// import UploadButton from '../../components/general/UploadButton.vue'
import DatePicker from '../../components/general/DatePicker.vue'
import PhoneInput from '../../components/general/PhoneInput.vue'
// import Avatars from '/imports/api/avatars/client'
export default {
  name:"Profile",
  components: {
    // UploadButton,
    DatePicker,
    PhoneInput
  },
  mixins:[
    RulesMixin
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
    // $subscribe: {
    //   "avatars.get.byIds"(){
    //     if (!this.authenticated) {
    //       return [{_ids:[]}]
    //     }
    //     return [{_ids:[this.values.avatar]}]
    //   }
    // },
    // Get user logged
    user(){
      return Meteor.user();
    },
    // Get avatar url
    // avatar(){
    //   if (!this.user || !this.user.profile) {
    //     return "/img/logo.png"
    //   }
    //   if (!this.user.profile.avatar) {
    //     return this.user.profile.picture
    //   }
    //   let avatar = Avatars.findOne({
    //     _id:this.values.avatar
    //   });
    //   if (!avatar) {
    //     return ""
    //   }
    //   avatar = avatar.link("thumbnail");
    //   if (!avatar) {
    //     return ""
    //   }
    //   return avatar
    // }
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
    // imageSelected: function(i){
    //   if(!!i && i.length){
    //     _.each(i, (v)=>{
    //       if(v.size > 10*1024*1024){
    //         this.$root.snackbar = true;
    //         this.$root.snacktext = "Image must not exceed 10MB!!";
    //         this.$root.snackbarColor = "error";
    //         return false;
    //       }
    //     });
    //     this.loadingImage=true;
    //     // Save images on server
    //     // First lets save images on server (only new images)
    //     let file = i[0];
    //     if (file) {
    //       var uploadInstance = Avatars.insert({
    //         file: file,
    //         streams: 'dynamic',
    //         chunkSize: 'dynamic'
    //       }, false);
    //       uploadInstance.on('end', (error, fileObj) => {
    //         if (error) {
    //           console.log('Error during upload: ' + error.reason);
    //         } else {
    //           self.$set(this.values, "avatar" , fileObj._id)
    //         }
    //         this.loadingImage=false;
    //         this.progress=false;
    //       });
    //       uploadInstance.start();
    //     }
    //   }
    // },
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
