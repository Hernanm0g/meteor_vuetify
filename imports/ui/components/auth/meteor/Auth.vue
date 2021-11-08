<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-tabs v-model="tab" grow>
          <v-tab>
            {{ $t("auth.login") }}
          </v-tab>
          <v-tab>
            {{ $t("auth.register") }}
          </v-tab>
          <v-tab>
            {{ $t("auth.resetPassword")}}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card>
              <v-card-title>
                {{ $t("auth.login") }}
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="email"
                  :label="$t('auth.email')"
                  :rules="rules.email"
                  required
                />
                <v-text-field
                  type="password"
                  v-model="password1"
                  :label="$t('auth.password')"
                  :rules="rules.password1"
                  @keydown.enter="login"
                />
              </v-card-text>
            </v-card>
            <v-card-actions
              ><v-spacer></v-spacer
              ><v-btn @click="close">{{ $t("buttons.cancel") }}</v-btn
              ><v-btn @click="login" color="primary">{{
                $t("auth.login")
              }}</v-btn></v-card-actions
            >
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-form ref="form" v-model="registerFormValid">
                <v-card-title>
                  {{ $t("auth.register") }}
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="firstName"
                    :label="$t('auth.firstname')"
                    :rules="rules.firstName"
                    required
                  />
                  <v-text-field
                    v-model="lastName"
                    :label="$t('auth.lastname')"
                    :rules="rules.lastName"
                    required
                  />
                  <v-text-field
                    v-model="email"
                    :label="$t('auth.email')"
                    :rules="rules.email"
                    required
                  />
                  <v-text-field
                    type="password"
                    v-model="password1"
                    :label="$t('auth.password')"
                    :rules="rules.password1"
                    required
                  />
                  <v-text-field
                    type="password"
                    v-model="password2"
                    :label="$t('auth.password2')"
                    :rules="rules.password2"
                    required
                  />
                </v-card-text>
              </v-form>
            </v-card>
            <v-card-actions
              ><v-spacer></v-spacer
              ><v-btn @click="close">{{ $t("buttons.cancel") }}</v-btn
              ><v-btn @click="register" color="primary">{{
                $t("auth.register")
              }}</v-btn></v-card-actions
            >
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-title>
                {{ $t("auth.resetPassword") }}
              </v-card-title>
              <v-card-text>
                {{ $t("auth.resetPasswordMsg") }}
                <v-text-field
                  v-model="email"
                  :label="$t('auth.email')"
                  :rules="rules.email"
                  required
                />
              </v-card-text>
            </v-card>
            <v-card-actions
              ><v-spacer></v-spacer
              ><v-btn @click="close">{{ $t("buttons.cancel") }}</v-btn
              ><v-btn @click="reset" color="primary">{{
                $t("auth.resetPassword")
              }}</v-btn></v-card-actions
            >
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="js">
export default {
  name: "meteor-auth-dialog",
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      firstName: "",
      lastName: "",
      registerFormValid: null,
      tab: null,
      rules: {
        firstName: [
          v => !!v || this.$t("auth.errors.firstnameRequired"),
          v => (v && v.length <= 10) || this.$t("auth.errors.lessthan10chars")
        ],
        lastName: [
          v => !!v || this.$t("auth.errors.lastnameRequired"),
          v => (v && v.length <= 10) || this.$t("auth.errors.lessthan10chars")
        ],
        email: [
          v => /.+@.+\..+/.test(v) || this.$t("auth.errors.emailRequired")
        ],
        password1: [v => !!v || this.$t("auth.errors.passwordRequired")],
        password2: [
          v => v == this.password1 || this.$t("auth.errors.passwordsDontMatch")
        ]
      }
    };
  },
  computed: {
    dialog: {
      get: function() {
        return this.$store.state.authentication.meteor.showAuthDialog;
      }
    },
    resetDialog: {
      get: function() {
        return this.$store.state.authentication.meteor.showResetDialog;
      }
    }
  },
  methods: {
    close() {
      this.$store.commit("setMeteorAuthDialog", false);
    },
    login() {
      var vm = this;
      
      Meteor.loginWithPassword(this.email, this.password1, function(error) {
        if (error) {
          console.log(error)
          vm.$store.commit("snack", {
            text: vm.$i18n.t(`auth.errors.login.${error.error}`),
            color: "error"
          });
        } else {                    
          vm.$store.commit("setMeteorAuthDialog", false);
          vm.$store.commit('setLanguage', Meteor.user().profile.language)
        }
      });
    },
    async register() {
      var userId = null;
      var vm = this;
      if (this.$refs.form.validate()) {
        await Accounts.createUser(
          {
            username: this.email,
            email: this.email,
            password: this.password1,
            profile: {
              firstName: this.firstName,
              lastName: this.lastName,
              language: vm.$store.state.language
            }
          },
          function(error, other, other2) {
            if (error) {
              vm.$store.commit("snack", {
                text: vm.$i18n.t(`auth.errors.registration.${error.error}`),
                color: "error"
              });
            } else {
              vm.$store.commit("setMeteorAuthDialog", false);
            }
          }
        );
        console.log("new user", userId);
      } else {
        this.$store.commit("snack", {
          text: vm.$i18n.t('auth.errors.invalidForm'),
          color: "error"
        });
      }
    },
    reset() {
      var vm = this;
      console.log(this.email)
      console.log(this.$store.state.language)
      /*Meteor.call('resetPassword', this.email, this.$store.state.language, function(error) {
        if (error) {
          if (error) {
            vm.$store.commit("snack", {
              text: error.message,
              color: "error"
            });
          } else {
            vm.$store.commit("snack", {
              text: vm.$i18n.t("resetPasswordMsg"),
              color: "success"
            });
            vm.$store.commit("setMeteorAuthDialog", false);
          }
        }
      })*/
      Accounts.forgotPassword({ email: this.email }, function(error) {
        if (error) {
          if (error) {
            vm.$store.commit("snack", {
              text: error.message,
              color: "error"
            });
          } else {
            vm.$store.commit("snack", {
              text: vm.$i18n.t("resetPasswordMsg"),
              color: "success"
            });
            vm.$store.commit("setMeteorAuthDialog", false);
          }
        }
      });
    }
  }
};
</script>
