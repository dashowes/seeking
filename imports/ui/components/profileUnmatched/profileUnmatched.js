import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
 
import template from './profileUnmatched.html';
import { name as UnmatchedFilter } from '../../filters/unmatchedFilter';
 
class ProfileUnmatched {
  constructor($scope) {
    'ngInject';
 
    $scope.viewModel(this);
 
    this.helpers({
      users() {
        return Meteor.users.find({});
      }
    });
  }
  
  match(user) {
    Meteor.call('invite', this.profile._id, user._id,
      (error) => {
        if (error) {
          console.log('Oops, unable to match!');
        } else {
          console.log('Matched!');
        }
      }
    );
  }
}


const name = 'profileUnmatched';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  UnmatchedFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    profile: '<'
  },
  controller: ProfileUnmatched
});