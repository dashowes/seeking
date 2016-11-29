import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
 
import { Profiles } from './collection';
 
function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
 
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
 
  return null;
}
 
export function match(profileId, userId) {
  check(profileId, String);
  check(userId, String);
 
  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }
 
  const profile = Profiles.findOne(profileId);
 
  if (!profile) {
    throw new Meteor.Error(404, 'No such profile!');
  }
  
  if (profile.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }
 
  if (profile.public) {
    throw new Meteor.Error(400, 'That profile is public. No need to invite people.');
  }
 
  if (userId !== profile.owner && ! _.contains(profile.matched, userId)) {
    Profiles.update(profileId, {
      $addToSet: {
        matched: userId
      }
    });
 
    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));
 
    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@seekingmusicapp.com',
        subject: `Meet ${profile.firstName} on Seeking!`,
        text: `
          Hey! 
          
          ${profile.firstName} just matched with you on Seeking.
          Come check out their profile: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

Meteor.methods({
  match
});