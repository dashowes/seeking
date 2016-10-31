import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import formly from 'angular-formly';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './survey.html';
import { Profiles } from '../../../api/profiles/index';
//import Questions
 
class survey {
  constructor($scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.perPage = 1;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';
    
    this.subscribe('profiles');
    this.subscribe('questions', () => [{
       limit: parseInt(this.perPage),
       skip: parseInt((this.getReactively('page') - 1) * this.perPage),
       sort: this.getReactively('sort')
    }, this.getReactively('searchText')
    ]);
 
    this.helpers({
      questions() {
        return Questions.find({}, {
          sort : this.getReactively('sort')
        });
      },
      questionsCount() {
        return Counts.get('numberOfQuestions');
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
 
const name = 'survey';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  formly
]).component(name, {
  template,
  controllerAs: name,
  controller: survey
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('survey', {
      url: '/survey',
      template: '<survey></survey>'
    });
}