import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './survey3.html';

import { Profiles } from '../../../api/profiles/index';

class survey3 {
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
 
const name = 'survey3';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey3
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey3', {
        url: '/survey3',
        template: '<survey3></survey3>'
    })
      
      .state('survey3.practiceTime', {
          url: '/practiceTime',
          template: '<survey3-practice-time></survey3-practice-time>'
      })
      
      .state('survey3.localShows', {
          url: '/localShows',
          template: '<survey3-local-shows></survey3-local-shows>'
      })
      
      .state('survey3.touring', {
          url: '/touring',
          template: '<survey3-touring></survey3-touring>'
      })
      
      .state('survey3.recording', {
          url: '/recording',
          template: '<survey3-recording></survey3-recording>'
      })
      
      .state('survey3.songwriting', {
          url: '/songwriting',
          template: '<survey3-songwriting></survey3-songwriting>'
      });
      
  $urlRouterProvider.otherwise('/survey3');
  
}