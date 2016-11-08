import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey1.html';
import { Profiles } from '../../../api/profiles/index';

class survey1 {
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
  
  save() {
    Profiles.update({
      _id: this.profile._id
    }, {
      $set: {
        favRecordsAnswer: this.profile.favRecordsAnswer,
        favRecordsWeight: this.profile.favRecordsWeight,
        favProducersAnswer: this.profile.favProducersAnswer,
        favProducersWeight: this.profile.favProducersWeight,
        favLabelsAnswer: this.profile.favLabelsAnswer,
        favLabelsWeight: this.profile.favLabelsWeight,
        skillLevelAnswer: this.profile.skillLevelAnswer,
        skillLevelWeight: this.profile.skillLevelWeight,
        instrumentYearsAnswer: this.profile.instrumentYearsAnswer,
        instrumentYearsWeight: this.profile.instrumentYearsWeight
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
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey1
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey1', {
      url: '/survey1',
      template: '<survey1></survey1>'
    })
      
      .state('survey1.favRecords', {
          url: '/favRecords',
          template: '<survey1-fav-records></survey1-fav-records>'
      })
      
      .state('survey1.favProducers', {
          url: '/favProducers',
          template: '<survey1-fav-producers></survey1-fav-producers>'
      })
      
      .state('survey1.favLabels', {
          url: '/favLabels',
          template: '<survey1-fav-labels></survey1-fav-labels>'
      })
      
      .state('survey1.skillLevel', {
          url: '/skillLevel',
          template: '<survey1-skill-level></survey1-skill-level>'
      })
      
      .state('survey1.instrumentYears', {
          url: '/instrumentYears',
          template: '<survey1-instrument-years></survey1-instrument-years>'
      });
  
  $urlRouterProvider.otherwise('/survey1/favRecords');
  
}