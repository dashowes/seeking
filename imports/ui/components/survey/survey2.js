import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './survey2.html';

import { Profiles } from '../../../api/profiles/index';

class survey2 {
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
 
const name = 'survey2';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey2
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey2', {
        url: '/survey2',
        template: '<survey2></survey2>'
    })
      
      .state('survey2.liveBand', {
          url: '/liveBand',
          template: '<survey2-live-band></survey2-live-band>'
      })
      
      .state('survey2.gear', {
          url: '/gear',
          template: '<survey2-gear></survey2-gear>'
      })
      
      .state('survey2.priority', {
          url: '/priority',
          template: '<survey2-priority></survey2-priority>'
      })
      
      .state('survey2.production', {
          url: '/production',
          template: '<survey2-production></survey2-production>'
      })
      
      .state('survey2.money', {
          url: '/money',
          template: '<survey2-money></survey2-money>'
      });
  
  $urlRouterProvider.otherwise('/survey2');
  
}