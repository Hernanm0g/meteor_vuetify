<template>
  <v-row row>
    <v-col cols="12">
      <v-card>
        <v-card-title primary-title>
          {{ $t("about.title")}}
        </v-card-title>
        <v-card-text>
          <ul>
            <li>
              {{ $t("about.li_1")}}
            </li>
            <li>
              {{ $t("about.li_2")}}
            </li>
            <li>
              {{ $t('about.li_3')}}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">
export default {
  name: "About",
  metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'About',
      meta: [
        { name: 'description', content: 'Meteor Vuetify Integration. About Example description.' },
        { name: 'keywords', content: 'Meteor vuetify integraiton. About Example keywords' },
      ]
    },
  data() {
    return {
      hey: "hy"
    }
  },
  mounted(){
    this.$store.commit("updateCrumbs", {
      position: 0,
      name_i18n: "menu.about",
      icon:"mdi-information",
      link: {
        name:"about"
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>