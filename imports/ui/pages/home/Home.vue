<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <installed />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <accounts />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <plugins />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <confirm />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <snack />
    </v-col>
     <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <i18n />
    </v-col>
  </v-row>
</template>

<script cpl="vuetify">
  import Installed from '../../components/home/Installed.vue'
  import Accounts from '../../components/home/Accounts.vue'
  import Plugins from '../../components/home/Plugins.vue'
  import Confirm from '../../components/home/Confirm.vue'
  import Snack from '../../components/home/Snack.vue'
  import i18n from '../../components/home/i18n.vue'
  export default {
    name:"Home",
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Home',
      meta: [
        { name: 'description', content: 'Meteor Vuetify Integration. Example description.' },
        { name: 'keywords', content: 'Meteor vuetify integraiton. Example keywords' },
      ]
    },
    components: {
      Installed,
      Accounts,
      Plugins,
      Confirm,
      Snack,
      i18n
    }
  }
</script>

<style lang="scss" scoped>

</style>