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
 
export function invite(profileId, userId) {
  check(profileId, String);
  check(userId, String);
 
  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }
 
  const profile = Profile.findOne(profileId);
 
  if (!profile) {
    throw new Meteor.Error(404, 'No such profile!');
  }
  
  if (profile.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }
 
  if (profile.public) {
    throw new Meteor.Error(400, 'That profile is public. No need to invite people.');
  }
 
  if (userId !== profile.owner && ! _.contains(profile.invited, userId)) {
    Profiles.update(profileId, {
      $addToSet: {
        invited: userId
      }
    });
 
    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));
 
    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@seekingmusicapp.com',
        subject: `Welcome to Seeking, ${profile.firstName}!`,
        text: `
          Hey ${profile.firstName}! 
          
          Welcome to Seeking, the place where you can be your own favorite band.
          
          We've picked you to be part of our super awesome first set of users.
          Since you held on to that card and entered that promo code, 
          you'll get access to a free month of our Premium service
          when we launch early in the new year. 
          
          Keep an eye on your email, as we'll be sending you the occasional update
          (we won't be annoying; we promise) and, eventually of course, the link to get started!
          
          See you soon,
          
          Jason and Jim
          Team Seeking
        `
      });
    }
  }
}

Meteor.methods({
  invite
});