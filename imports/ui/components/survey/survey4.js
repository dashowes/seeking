import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './survey4.html';

import { Profiles } from '../../../api/profiles/index';

class survey4 {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.profileId = $stateParams.profileId;

    this.subscribe('profiles');
    
    this.helpers({
      profile() {
        return Profiles.findOne({
          _id: $stateParams.profileId
        });
      },
      question() {
          return Profiles.questions.findOne({
              _id: $stateParams.profileId.questionId
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
}
 
const name = 'survey4';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey4
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey4', {
        url: '/survey4',
        template: '<survey4></survey4>'
    })
      
      .state('survey4.originalOrCover', {
          url: '/originalOrCover',
          template: '<survey4-original-or-cover></survey4-original-or-cover>'
      })
      
      .state('survey4.occasionalCover', {
          url: '/occasionalCover',
          template: '<survey4-occasional-cover></survey4-occasional-cover>'
      })
      
      .state('survey4.venues', {
          url: '/venues',
          template: '<survey4-venues></survey4-venues>'
      })
      
      .state('survey4.venuesBad', {
          url: '/venuesBad',
          template: '<survey4-venues-bad></survey4-venues-bad>'
      })
      
      .state('survey4.practiceSpace', {
          url: '/practiceSpace',
          template: '<survey4-practice-space></survey4-practice-space>'
      });
      
  $urlRouterProvider.otherwise('/survey4');
  
}