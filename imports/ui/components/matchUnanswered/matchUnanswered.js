import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';
 
import { Meteor } from 'meteor/meteor';
 
import template from './matchUnanswered.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
class MatchUnanswered {
  getUnanswered() {
    if (!this.profile || !this.profile.invited) {
      return;
    }
 
    return this.profile.invited.filter((user) => {
      return !_.findWhere(this.profile.responses, { user });
    });
  }
 
  getUserById(userId) {
    return Meteor.users.findOne(userId)
  }
}
 
const name = 'matchUnanswered';

// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    profile: '<'
  },
  controller: MatchUnanswered
});