import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey8.html';
import { Profiles } from '../../../api/profiles/index';

class survey8 {
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
        personalityAnswer: this.profile.personalityAnswer,
        personalityWeight: this.profile.personalityWeight,
        genderAnswer: this.profile.genderAnswer,
        genderWeight: this.profile.genderWeight,
        raceAnswer: this.profile.raceAnswer,
        raceWeight: this.profile.raceWeight,
        sexualityAnswer: this.profile.sexualityAnswer,
        sexualityWeight: this.profile.sexualityWeight,
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
 
const name = 'survey8';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey8
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey8', {
        url: '/survey8',
        template: '<survey8></survey8>'
    })
      
      .state('survey8.personality', {
          url: '/personality',
          template: '<survey8-personality></survey8-personality>'
      })
      
      .state('survey8.gender', {
          url: '/gender',
          template: '<survey8-gender></survey8-gender>'
      })
      
      .state('survey8.race', {
          url: '/race',
          template: '<survey8-race></survey8-race>'
      })
      
      .state('survey8.sexuality', {
          url: '/sexuality',
          template: '<survey8-sexuality></survey8-sexuality>'
      })
      
      .state('survey8.finished', {
          url: '/finished',
          template: '<survey8-finished></survey8-finished>'
      });
  
  $urlRouterProvider.otherwise('/survey8/personality');
  
}