import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  var messages = {}
  if (Meteor.isClient) {
    Meteor.settings.public.i18n.languages?.forEach(lang => {    
        fetch(`/locales/${lang.file}`, {
          method: 'get'
        })
        .then(response => response.json())
        .then(data => {      
          messages[lang.value] = data
        })
        .catch(err => { throw err })    
      }) 
    } 
    if (Meteor.isServer) {
      import fs from 'fs' 
      const rd = process.env.PWD;    
      Meteor.settings.public.i18n.languages?.forEach(lang => {    
        messages[lang.value] = JSON.parse(fs.readFileSync(`${rd}/public/locales/${lang.file}`));
      })
    }    
    return messages  
}

function getBrowserLanguage() {    
  if (Meteor.isClient) {
    navigator.language.split('-')[0]
  } else {
    return null
  }
}

const i18n = new VueI18n({
  locale: getBrowserLanguage() || Meteor.settings.public.i18n.defaultLocale || 'en',  
  fallbackLocale: Meteor.settings.public.i18n.defaultLocale || 'en',
  messages: loadLocaleMessages()
})

export default i18n 