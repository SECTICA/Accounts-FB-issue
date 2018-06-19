import { Meteor } from 'meteor/meteor';

const services = Meteor.settings.private.oAuth;

Meteor.startup(() => {
    if (services) {
      for (let service in services) {
        if (services.hasOwnProperty(service)) {
          ServiceConfiguration.configurations.upsert({service: service}, {
            $set: services[service]
          });
        }
      }
    }

  Accounts.onCreateUser((options, user) => {

    if (user.services.facebook) {
      let fb = user.services.facebook;

      if (options.profile) {
        user.profile = options.profile;
      } else {
        user.profile = {};
      }

      try {
        let additionalData = getAdditionalFBInfo(fb.accessToken);

        user.profile.FBId = additionalData.id;
        user.profile.firstName = additionalData.first_name;
        user.profile.lastName = additionalData.last_name;
        user.profile.picture = additionalData.picture.data.url;

        if ( additionalData.email ){
          user.emails = [{
            address: additionalData.email,
            verified: false
          }];
        }
      } catch (e) {
        console.error('FB user create failure');
        console.error(e);
      }

    }

    return user;
  });

  Accounts.onLogin((params) => {
    let user = Meteor.user();
    // console.log('User logged in');
    // console.log(user);
  });

  Accounts.onLoginFailure((attempt) => {
   console.error('Login attempt failure');
   console.error(attempt);
  });

  function getAdditionalFBInfo(accessToken) {
    let result;

    result = Meteor.http.get("https://graph.facebook.com/me", {
      params: {
        access_token: accessToken,
        fields: 'first_name,last_name,email,picture.type(large)'
      }
    });

    if (result.error) {
      throw result.error;
    }

    return JSON.parse(result.content);
  }

});
