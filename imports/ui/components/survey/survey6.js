import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey6.html';
import { Profiles } from '../../../api/profiles/index';

class survey6 {
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
        familyOrBusinessAnswer: this.profile.familyOrBusinessAnswer,
        familyOrBusinessWeight: this.profile.familyOrBusinessWeight,
        bandImageAnswer: this.profile.bandImageAnswer,
        bandImageWeight: this.profile.bandImageWeight,
        favMoviesAnswer: this.profile.favMoviesAnswer,
        favMoviesWeight: this.profile.favMoviesWeight,
        favTvShowsAnswer: this.profile.favTvShowsAnswer,
        favTvShowsWeight: this.profile.favTvShowsWeight,
        politicsAnswer: this.profile.politicsAnswer,
        politicsWeight: this.profile.politicsWeight
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
 
const name = 'survey6';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey6
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey6', {
        url: '/survey6',
        template: '<survey6></survey6>'
    })
      
      .state('survey6.familyOrBusiness', {
          url: '/familyOrBusiness',
          template: '<survey6-family-or-business></survey6-family-or-business>'
      })
      
      .state('survey6.bandImage', {
          url: '/bandImage',
          template: '<survey6-band-image></survey6-band-image>'
      })
      
      .state('survey6.favMovies', {
          url: '/favMovies',
          template: '<survey6-fav-movies></survey6-fav-movies>'
      })
      
      .state('survey6.favTvShows', {
          url: '/favTvShows',
          template: '<survey6-fav-tv-shows></survey6-fav-tv-shows>'
      })
      
      .state('survey6.politics', {
          url: '/politics',
          template: '<survey6-politics></survey6-politics>'
      });
      
  $urlRouterProvider.otherwise('/survey6/familyOrBusiness');
  
}