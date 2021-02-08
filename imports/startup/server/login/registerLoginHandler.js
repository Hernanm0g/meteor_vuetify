Accounts.registerLoginHandler(function(loginRequest) {
  //there are multiple login handlers in meteor.
  //a login request go through all these handlers to find it's login hander
  //so in our login handler, we only consider login requests which has admin field
  if(!loginRequest.sub) {
    return undefined;
  }

  //we create a user if not exists, and get the userId
  var userId = null;
  var user = Meteor.users.findOne({"profile.sub": loginRequest.sub});
  if(!user) {
    loginRequest.created=new Date()
    userId = Meteor.users.insert({profile: loginRequest});
  } else {
    userId = user._id;
  }

  //creating the token and adding to the user
 var stampedToken = Accounts._generateStampedLoginToken();
 //hashing is something added with Meteor 0.7.x,
 //you don't need to do hashing in previous versions
 var hashStampedToken = Accounts._hashStampedToken(stampedToken);

 Meteor.users.update(
   userId,
   {
     $push: {
       'services.resume.loginTokens': hashStampedToken
      }
    }
 );

 //sending token along with the userId
 return {
   userId: userId,
   token: stampedToken.token
 }
});