import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey1.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfileDetails } from '../profileDetails/profileDetails';

class Survey1 {
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
        favRecordsAnswer: this.profile.favRecordsAnswer,
        favProducersAnswer: this.profile.favProducersAnswer,
        favLabelsAnswer: this.profile.favLabelsAnswer,
        instrumentYearsAnswer: this.profile.instrumentYearsAnswer,
        skillLevelAnswer1: this.profile.skillLevelAnswer1,
        skillLevelAnswer2: this.profile.skillLevelAnswer2,
        skillLevelWeight: this.profile.skillLevelWeight,
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
 
const name = 'survey1';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfileDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: Survey1
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('survey1', {
      url: '/survey1',
      template: '<survey1></survey1>'
    });
}