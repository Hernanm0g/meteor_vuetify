var base = process.env.PWD
import fs from 'fs';

Accounts.emailTemplates.siteName = Meteor.settings.public.site.name;
Accounts.emailTemplates.from = Meteor.settings.private.site.systemEmailFrom;
Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl("reset-password/" + token);
};
Accounts.urls.verifyEmail = function(token) {
  return Meteor.absoluteUrl("verify-email/" + token)
}

Accounts.config({
  sendVerificationEmail: Meteor.settings.private.auth.meteorAccountCreation.sendVerificationEmail, 
  forbidClientAccountCreation: Meteor.settings.private.auth.meteorAccountCreation.forbidClientAccountCreation
})

function replaceVarsInTemplate(message, vars) {
  vars.forEach(function(data) {
    message = message.replace(data.key, data.value)    
  })
  message = message.replace(/\n|\r/g, "");
  return message
}

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    const data = fs.readFileSync(base + '/imports/startup/server/auth/meteor-accounts/locales/' + user.profile.language + '.json', 'utf8')        
    var message = JSON.parse(data).resetPassword.subject   
    message = replaceVarsInTemplate(message, [{key:"${user}", value: user.profile.firstName}])
    return message
  },
  html(user, url) {
    var message = fs.readFileSync(base + '/imports/startup/server/auth/meteor-accounts/html/resetPassword.' + user.profile.language + '.html', 'utf8')
    message = replaceVarsInTemplate(message, [{key: "${user}", value: user.profile.firstName}, {key: "${url}", value: url}])     
    return message
  }
};

Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    const data = fs.readFileSync(base + '/imports/startup/server/auth/meteor-accounts/locales/' + user.profile.language + '.json', 'utf8')        
    var message = JSON.parse(data).verifyEmail.subject   
    message = replaceVarsInTemplate(message, [{key:"${user}", value: user.profile.firstName}])
    return message
  },
  html(user, url) {
    var message = fs.readFileSync(base + '/imports/startup/server/auth/meteor-accounts/html/verifyEmail.' + user.profile.language + '.html', 'utf8')
    message = replaceVarsInTemplate(message, [{key: "${user}", value: user.profile.firstName}, {key: "${url}", value: url}])
    return message
  }
};

