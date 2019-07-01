const login = function(profile, callback) {
  var loginRequest = profile;

  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [profile],
    userCallback: callback
  });
};

export default login;
