/* use Google Cloud Translate service to translate from your defaultLocale defined in your settings.json to all other languages defined in settings (i18n settings) */

const { exec }  = require('child_process')

var settings = require("../../settings.json")
var from = settings.public.i18n.defaultLocale
var to = []
var apiKey = settings.private.i18n.googleTranslateApiKey
settings.public.i18n.languages.forEach(lang => {
  if (lang.value != from) {
    to.push(lang.value)
  }
})

var command = `i18n-translate-json ${apiKey} public/locales/ ${from} ${to}`
if (settings.public.authentication.allowMeteor) {
  command += ` ; i18n-translate-json ${apiKey} imports/startup/server/auth/meteor-accounts/locales/ ${from} ${to}`
}
console.log(`Running  ${command}`)

var ex = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }  
  console.log("********************");
});

ex.stdout.on('data', function(data) {
  console.log(data); 
});

