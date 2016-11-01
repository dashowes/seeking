import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './profilesList.html';
import { Profiles } from '../../../api/profiles/index';
import { name as ProfilesSort } from '../profilesSort/profilesSort';
import { name as ProfileAddButton } from '../profileAddButton/profileAddButton';
import { name as ProfileAdd } from '../profileAdd/profileAdd';
import { name as ProfileRemove } from '../profileRemove/profileRemove';
import { name as TakeSurveyButton } from '../takeSurveyButton/takeSurveyButton';
 
class ProfilesList {
  constructor($scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.perPage = 1;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';
    
    this.subscribe('profiles', () => [{
       limit: parseInt(this.perPage),
       skip: parseInt((this.getReactively('page') - 1) * this.perPage),
       sort: this.getReactively('sort')
    }, this.getReactively('searchText')
    ]);
 
    this.helpers({
      profiles() {
        return Profiles.find({}, {
          sort : this.getReactively('sort')
        });
      },
      profilesCount() {
        return Counts.get('numberOfProfiles');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  }
  
  isOwner(profile) {
    return this.isLoggedIn && profile.owner === this.currentUserId;
  }
  
  pageChanged(newPage) {
    this.page = newPage;
  }
  
  sortChanged(sort) {
    this.sort = sort;
  }
}
 
const name = 'profilesList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  ProfilesSort,
  ProfileAdd,
  ProfileAddButton,
  ProfileRemove,
  TakeSurveyButton
]).component(name, {
  template,
  controllerAs: name,
  controller: ProfilesList
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('profiles', {
      url: '/profiles',
      template: '<profiles-list></profiles-list>'
    });
}