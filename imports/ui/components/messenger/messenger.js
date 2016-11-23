import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './messenger.html';
import { Profiles } from '../../../api/profiles/index';
import { Chats } from '../../../api/chats/index';
import { Messages } from '../../../api/messages/index';
import { name as ProfilesList } from '../profilesList/profilesList';

class messenger {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.profileId = $stateParams.profileId;
    this.chatId = this.$stateParams.chatId;

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
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }
  
  isOwner(profile) {
    return this.isLoggedIn && profile.owner === this.currentUserId;
  }

  filter(time) {
    if(!time) return;
    
    return moment(time).calendar(null, {
      lastDay : '[Yesterday]',
      sameDay : 'LT',
      lastWeek : 'dddd',
      sameElse : 'DD/MM/YY'
    });
  }
}
 
const name = 'messenger';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  moment,
  ProfilesList
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