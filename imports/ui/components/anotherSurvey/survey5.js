import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey5.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class survey5 {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.profileId = $stateParams.profileId;

    this.subscribe('profiles');
    this.subscribe('users');
    
    this.helpers({
      profile() {
        return Profiles.findOne({
          _id: $stateParams.profileId
        });
      },
      users() {
        return Meteor.users.find({});
      },
      currentUserId() {
        return Meteor.userId();
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }
  
  isOwner(profile) {
    return this.isLoggedIn && profile.owner === this.currentUserId;
  }
  
  save() {
    Profiles.update({
      _id: this.profile._id
    }, {
      $set: {
        vehicleAnswer: this.profile.vehicleAnswer,
        vehicleWeight: this.profile.vehicleWeight,
        vanAnswer: this.profile.vanAnswer,
        vanWeight: this.profile.vanWeight,
        singAnswer: this.profile.singAnswer,
        singWeight: this.profile.singWeight,
        harmonizeAnswer: this.profile.harmonizeAnswer,
        harmonizeWeight: this.profile.harmonizeWeight,
        merchAnswer: this.profile.merchAnswer,
        merchWeight: this.profile.merchWeight
      }
    }, (error) => {
      if (error) {
        console.log('WHOOPS');
      } else {
        console.log('Done!');
      }
    });
  }
}
 
const name = 'survey5';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: survey5
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey5', {
      url: '/survey5',
      template: '<survey5></survey5>'
    });
}