import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import formly from 'angular-formly';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './survey.html';
import { Profiles } from '../../../api/profiles/index';

class survey {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
    
    this.profileId = $stateParams.profileId;
    this.questionId = $stateParams.questionId;
    
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
      questionsCount() {
        return Counts.get('numberOfQuestions');
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
  
  $stateProvider.state('survey', {
    url: '/profiles/:profileId/:questionId',
    template: '<survey></survey>',
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