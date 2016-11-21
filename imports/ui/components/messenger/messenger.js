import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './matchList.html';
import { Profiles } from '../../../api/profiles/index';
import { Matches } from '../../../api/matches/index';
import { Messages } from '../../../api/messages/index';

class messenger {
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
 
const name = 'messenger';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: messenger
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('messenger', {
      url: '/messenger',
      template: '<messenger></messenger>'
    })
      
      .state('messenger.matchList', {
          url: '/matchList',
          template: '<messenger-match-list></messenger-match-list>'
      })
      
      .state('messenger.chatView', {
          url: '/chatView',
          template: '<messenger-chat-view></messenger-chat-view>'
      });
      
  $urlRouterProvider.otherwise('/messenger/matchList');
  
}