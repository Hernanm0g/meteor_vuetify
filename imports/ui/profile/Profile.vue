<template lang="html">
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @keyup.native.enter="save">
            <v-layout row wrap>
              <!-- given_name -->
              <v-flex xs12 sm6 d-flex>
                <v-text-field
                  v-model="values.given_name"
                  :counter="50"
                  label="Given Name"
                  required
                  :rules="notEmpty"
                  hint="p.e: Natalia"
                  prepend-icon="face"
                ></v-text-field>
              </v-flex>
              <!-- family_name -->
              <v-flex xs12 sm6 d-flex>
                <v-text-field
                  v-model="values.family_name"
                  :counter="50"
                  label="Family Name"
                  required
                  :rules="notEmpty"
                  hint="p.e: Díaz Santos"
                  prepend-icon="people"
                ></v-text-field>
              </v-flex>
              <!-- DatePicker -->
              <v-flex xs12 sm6 d-flex>
                <date-picker
                  max=""
                  :rules="notEmpty"
                  v-model="values.birthdate"
                  :date="values.birthdate|toISODate"
                  label="Birth Date">
                </date-picker>
              </v-flex>
              <!-- Phone -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.phone"
                  required
                  :rules="notEmpty"
                  label="Phone"
                  hint="p.e: +57 3143335255"
                  prepend-icon="phone"
                  type="tel"
                ></v-text-field>
              </v-flex>
              <!-- Email -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.email"
                  required
                  :rules="notEmpty"
                  label="E-mail"
                  prepend-icon="email"
                  type="email"
                ></v-text-field>
              </v-flex>
              <!-- Address -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.address"
                  required
                  :rules="notEmpty"
                  label="Address"
                  hint="p.e: Carrera 17A # 116-55"
                  prepend-icon="place"
                  type="text"
                ></v-text-field>
              </v-flex>
              <!-- City -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.city"
                  required
                  :rules="notEmpty"
                  label="City"
                  hint="p.e: Bogotá"
                  type="text"
                  prepend-icon="location_city"
                ></v-text-field>
              </v-flex>
              <!-- state -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.state"
                  required
                  :rules="notEmpty"
                  label="State / Province / Dpt"
                  hint="p.e: Bogotá D.C."
                  type="text"
                  prepend-icon="my_location"
                ></v-text-field>
              </v-flex>
              <!--  Country -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.country"
                  required
                  :rules="notEmpty"
                  label="Country"
                  hint="p.e: Colombia"
                  type="text"
                  prepend-icon="language"
                ></v-text-field>
              </v-flex>
              <!-- Post code -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="values.postcode"
                  label="Post code"
                  hint="p.e: 110111"
                  type="text"
                  prepend-icon="local_post_office"
                ></v-text-field>
              </v-flex>
              <!-- Description -->
              <v-flex xs12 sm6>
                <v-textarea
                  label="Description"
                  v-model="values.description"
                  rows="3"
                  hint="p.e: I like space ships"
                  prepend-icon="short_text">
                </v-textarea>
                <v-radio-group v-model="values.gender" :mandatory="false" label="Gender">
                  <v-radio label="Male" value="male"></v-radio>
                  <v-radio label="Female" value="female"></v-radio>
                  <v-radio label="Other" value="other"></v-radio>
                </v-radio-group>
              </v-flex>
              <!-- Avatar -->
              <v-flex xs8 sm4 offset-xs2 offset-sm1>
                <v-card flat>
                  <v-card-title class="title">
                   Avatar
                  </v-card-title>
                  <v-img
                  :src="!!avatar ? avatar : !!values.picture ? values.picture : '/img/logo.png'"
                  :aspect-ratio="1" @click="!!values.picture ? zoomPlease(values.picture):null">
                  </v-img>
                  <div class="">
                    {{progress.get}}
                  </div>
                  <v-progress-linear v-if="!!loadingImage" indeterminate>
                  </v-progress-linear>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <upload-button @selected-callback="imageSelected"
                    :multiple="false">
                    </upload-button>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :to="{name:'home'}">Back</v-btn>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UploadButton from '/imports/ui/UploadButton.vue'
import DatePicker from '/imports/ui/DatePicker.vue'
import Avatars from '/imports/api/avatars'

export default {
  name:"profile",
  data: function(){
    return {
      values: {},
      valid: true,
      menu: false,
      loadingImage: false,
      notEmpty: [
        v => !!v || 'Required field'
      ],
      progress:false
    }
  },
  watch: {
    user(u){
      this.values = u.profile;
    }
  },
  meteor: {
    // Get user logged
    user(){
      return Meteor.user();
    },
    // Get avatar url
    avatar(){
      if (!this.user) {
        return "/img/logo.png";
      }
      self=this;
      if (!!this.user.profile.avatar) {
        let myavatar = Avatars.findOne({ _id:self.user.profile.avatar });
        if (!!myavatar) {
          return myavatar.link("thumbnail");
        }
      }
      return this.user.profile.picture;

    },
    // Use it when autopublish off
    // $subscribe: {
    //   "avatars.get.mine"(){
    //     return [this.values.avatar]
    //   }
    // }
  },
  methods: {
    closePicker: function(){
      this.menu = false;
    },
    imageSelected: function(i){
      self=this;
      if(!!i && i.length){
        _.each(i, function(v,k){
          if(v.size > 10*1024*1024){
            self.$root.snackbar = true;
            self.$root.snacktext = "Image must not exceed 10MB!!";
            self.$root.snackbarColor = "error";
            return false;
          }
        });
        self.loadingImage=true;
        // Save images on server
        // First lets save images on server (only new images)

        let file = i[0];
        if (file) {
          var uploadInstance = Avatars.insert({
            file: file,
            streams: 'dynamic',
            chunkSize: 'dynamic'
          }, false);

          uploadInstance.on('end', function(error, fileObj) {
            if (error) {
              console.log('Error during upload: ' + error.reason);
            } else {
              self.$set(self.values, "avatar" , fileObj._id)
            }
            self.loadingImage=false;
            self.progress=false;
          });

          uploadInstance.start();
        }
      }
    },
    save: function(){
      if (!this.$refs.form.validate()) {
        this.$store.commit("snack", {
          text:"Please, confirm fields in red.",
          color:"error"
        });
        return false;
      }
      this.values.name = this.values.given_name+" "+this.values.family_name;
      // Save values to profile
      Meteor.users.update( { _id: Meteor.userId() }, { $set: {profile: this.values}} );
      self.$store.commit("snack", {
        text:"Updated profile",
        color:"success"
      })
    }
  },
  mounted : function(){
    this.$store.commit("updateCrumbs", {
      position: 0,
      name: "Profile",
      icon:"person",
      link: {
        name:"profile"
      }
    })
  },
  components: {
    UploadButton,
    DatePicker
  }
}
</script>

<style lang="css">
</style>
