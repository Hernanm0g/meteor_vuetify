const login = function(profile, callback) {
  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [profile],
    userCallback: callback
  });
};

export default login;
