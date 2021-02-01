/**
 *
 * Login function
 * Use this to tell Meteor Accounts
 * that the user is logged or not
 *
 */

/**
 * Name login
 * Description:
 * Calls Meteor Accounts Login Method
 * @param  {} profile
 * @param  {} callback
 */
const login = function(profile, callback) {
  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [profile],
    userCallback: callback
  });
};

export default login;