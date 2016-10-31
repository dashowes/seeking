import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Profiles } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('profiles', function(options, searchString) {
    const selector = {
      $or: [{
        // the public profiles
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }]
    };
    
    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }
    
    Counts.publish(this, 'numberOfProfiles', Profiles.find(selector), {
      noReady: true
    });
 
    return Profiles.find(selector, options);
  });
}