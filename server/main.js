import { Meteor } from 'meteor/meteor';
import '/imports/db/collection';
import '/imports/api/expose';
import '/imports/server';
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
});
