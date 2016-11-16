import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './profileFullView.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfilesList } from '../profilesList/profilesList';

class ProfileFullView {
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
          isLoggedIn() {
            return !!Meteor.userId();
          }
        });
    }
    
    isOwner(profile) {
        return this.isLoggedIn && profile.owner === this.currentUserId;
    }
}

const name = 'profileFullView';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ProfilesList
]).component(name, {
  template,
  controllerAs: name,
  controller: ProfileFullView
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('profileFullView', {
    url: '/profiles/:profileId',
    template: '<profile-full-view></profile-full-view>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}