import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
 
import template from './matchResponseUsers.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
class MatchResponseUsers {
  getUserById(userId) {
    return Meteor.users.findOne(userId);
  }
}
 
const name = 'matchResponseUsers';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    responses: '<',
    type: '@'
  },
  controller: MatchResponseUsers
});