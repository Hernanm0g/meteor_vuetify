<template>
<div>
  <v-card v-if="validated">
    <v-card-title>
      {{ $t('auth.emailVerified') }}
    </v-card-title>
    <v-card-text>
      {{ $t('auth.emailVerifiedMessage')}}
    </v-card-text>
    <v-card-actions>
      <v-btn @click="go">{{ $t('buttons.continue')}}</v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-if="!validated">
    <v-card-title>
      {{ $t('auth.emailFinishValidation') }}
    </v-card-title>
    <v-card-text>
      <v-btn @click="verify">{{ $t('auth.emailClickToVerify') }}</v-btn>
    </v-card-text>
  </v-card>
  <v-card v-if="error">
    <v-card-title>
      {{ $t('auth.verification.errorTitle') }}
    </v-card-title>
    <v-card-text>
      <p>{{ $t('auth.verification.errorText') }}</p>
      <p>{{ $t('auth.verification.requestValidationEmail')}}</p>
      <v-text-field v-model="email"
                  :label="$t('auth.email')"
                  :rules="rules.email"
                  required/>

    </v-card-text>
    <v-card-actions>
      <v-btn @click="requestValidationEmail">{{ $t('auth.requestValidationEmail')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</div>

</template>
<script lang="js">
export default {
  data() {
    return {
      validated: false,
      email: null,
      rules: {
        email: [
          v => /.+@.+\..+/.test(v) || this.$t("auth.errors.emailRequired")
        ]
      }
    };
  },
  methods: {
    go() {
      this.$route.push({ name: "home" });
    },
    verify() {
      var token = this.$route.params.token
      var lang = this.$route.params.lang
      var vm = this;      
      Accounts.verifyEmail( token, ( error ) =>{
        if ( error ) {
          vm.$store.commit("snack", {
              text: vm.$i18n.t(`auth.errors.verification.${error.error}`),
              color: "error"
            });
        } else {
          this.validated = true
        }
      });
    },
    resend() {
      
    }
  },
  created() {      
  }
}
</script>
