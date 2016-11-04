import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './survey5.html';

import { Profiles } from '../../../api/profiles/index';

class survey5 {
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
 
const name = 'survey5';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey5
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey5', {
        url: '/survey5',
        template: '<survey5></survey5>'
    })
      
      .state('survey5.vehicle', {
          url: '/vehicle',
          template: '<survey5-vehicle></survey5-vehicle>'
      })
      
      .state('survey5.van', {
          url: '/van',
          template: '<survey5-van></survey5-van>'
      })
      
      .state('survey5.sing', {
          url: '/sing',
          template: '<survey5-sing></survey5-sing>'
      })
      
      .state('survey5.harmonize', {
          url: '/harmonize',
          template: '<survey5-harmonize></survey5-harmonize>'
      })
      
      .state('survey5.merch', {
          url: '/merch',
          template: '<survey5-merch></survey5-merch>'
      });
  
  $urlRouterProvider.otherwise('/survey5');
  
}