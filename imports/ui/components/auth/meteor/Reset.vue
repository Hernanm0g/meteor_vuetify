<template>
  <v-card>
    <v-form ref="form" v-model="registerFormValid">
      <v-card-title>
        {{ $t("auth.resetPassword") }}
      </v-card-title>
      <v-card-text>
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
      <v-card-actions>
        <v-spacer></v-spacer
        ><v-btn @click="close">{{ $t("buttons.cancel") }}</v-btn
        ><v-btn @click="reset" color="primary">{{
          $t("auth.resetPassword")
        }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="js">
export default {
  data() {
    return {
      registerFormValid: false,
      password1: false,
      password2: false,
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
  methods: {
    reset() {
      var token = this.$route.params.token
      var lang = this.$route.params.lang      
      var vm = this;
      //console.log(token);
      if (this.$refs.form.validate()) {
        Accounts.resetPassword(token, this.password1, function(error) {
          if (error) {
            vm.$store.commit("snack", {
              text: error.message,
              color: "error"
            });
          } else {
            vm.$store.commit("snack", {
              text: "Your password has been changed.",
              color: "success"
            });
            this.$route.push({ name: "home" });
          }
        });
      }
    },
    close() {
      this.$route.push({ name: "home" });
    }
  },
  created() {}
};
</script>
