import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import template from './survey.html';

import { Profiles } from '../../../api/profiles/index';

class survey {
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
 
const name = 'survey';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
      .state('survey', {
        url: '/survey',
        template: '<survey></survey>'
      })
      
      .state('survey.favRecords', {
          url: '/favRecords',
          template: '<survey-fav-records></survey-fav-records>'
      })
      
      .state('survey.favProducers', {
          url: '/favProducers',
          template: '<survey-fav-producers></survey-fav-producers>'
      })
      
      .state('survey.favLabels', {
          url: '/favLabels',
          template: '<surve1y-fav-labels></survey-fav-labels>'
      })
      
      .state('survey.skillLevel', {
          url: '/skillLevel',
          template: '<survey-skill-level></survey-skill-level>'
      })
      
      .state('survey.instrumentYears', {
          url: '/instrumentYears',
          template: '<survey-instrument-years></survey-instrument-years>'
      })
      
      .state('survey2.liveBand', {
          url: '/liveBand',
          template: '<survey-live-band></survey-live-band>'
      })
      
      .state('survey.gear', {
          url: '/gear',
          template: '<survey-gear></survey-gear>'
      })
      
      .state('survey.priority', {
          url: '/priority',
          template: '<survey-priority></survey-priority>'
      })
      
      .state('survey.production', {
          url: '/production',
          template: '<survey-production></survey-production>'
      })
      
      .state('survey.money', {
          url: '/money',
          template: '<survey-money></survey-money>'
      })
      
      .state('survey.practiceTime', {
          url: '/practiceTime',
          template: '<survey-practice-time></survey-practice-time>'
      })
      
      .state('survey.localShows', {
          url: '/localShows',
          template: '<survey-local-shows></survey-local-shows>'
      })
      
      .state('survey.touring', {
          url: '/touring',
          template: '<survey-touring></survey-touring>'
      })
      
      .state('survey.recording', {
          url: '/recording',
          template: '<survey-recording></survey-recording>'
      })
      
      .state('survey.songwriting', {
          url: '/songwriting',
          template: '<survey-songwriting></survey-songwriting>'
      })
      
      .state('survey.originalOrCover', {
          url: '/originalOrCover',
          template: '<survey-original-or-cover></survey-original-or-cover>'
      })
      
      .state('survey.occasionalCover', {
          url: '/occasionalCover',
          template: '<survey-occasional-cover></survey-occasional-cover>'
      })
      
      .state('survey.venues', {
          url: '/venues',
          template: '<survey-venues></survey-venues>'
      })
      
      .state('survey.venuesBad', {
          url: '/venuesBad',
          template: '<survey-venues-bad></survey-venues-bad>'
      })
      
      .state('survey.practiceSpace', {
          url: '/practiceSpace',
          template: '<survey-practice-space></survey-practice-space>'
      })
      
      .state('survey.vehicle', {
          url: '/vehicle',
          template: '<survey-vehicle></survey-vehicle>'
      })
      
      .state('survey.van', {
          url: '/van',
          template: '<survey-van></survey-van>'
      })
      
      .state('survey.sing', {
          url: '/sing',
          template: '<survey-sing></survey-sing>'
      })
      
      .state('survey.harmonize', {
          url: '/harmonize',
          template: '<survey-harmonize></survey-harmonize>'
      })
      
      .state('survey.merch', {
          url: '/merch',
          template: '<survey-merch></survey-merch>'
      })
      
      .state('survey.familyOrBusiness', {
          url: '/familyOrBusiness',
          template: '<survey-family-or-business></survey-family-or-business>'
      })
      
      .state('survey.bandImage', {
          url: '/bandImage',
          template: '<survey-band-image></survey-band-image>'
      })
      
      .state('survey.favMovies', {
          url: '/favMovies',
          template: '<survey-fav-movies></survey-fav-movies>'
      })
      
      .state('survey.favTvShows', {
          url: '/favTvShows',
          template: '<survey-fav-tv-shows></survey-fav-tv-shows>'
      })
      
      .state('survey.socialPolitics', {
          url: '/socialPolitics',
          template: '<survey-social-politics></survey-social-politics>'
      })
      
      .state('survey.fiscalPolitics', {
          url: '/fiscalPolitics',
          template: '<survey-fiscal-politics></survey-fiscal-politics>'
      })
      
      .state('survey.politicsBand', {
          url: '/politicsBand',
          template: '<survey-politics-band></survey-politics-band>'
      })
      
      .state('survey.religion', {
          url: '/religion',
          template: '<survey-religion></survey-religion>'
      })
      
      .state('survey.religionBand', {
          url: '/religionBand',
          template: '<survey-religion-band></survey-religion-band>'
      })
      
      .state('survey.drink', {
          url: '/drink',
          template: '<survey-drink></survey-drink>'
      })
      
      .state('survey.drugs', {
          url: '/drugs',
          template: '<survey-drugs></survey-drugs>'
      })
      
      .state('survey.personality', {
          url: '/personality',
          template: '<survey-personality></survey-personality>'
      })
      
      .state('survey.gender', {
          url: '/gender',
          template: '<survey-gender></survey-gender>'
      })
      
      .state('survey.race', {
          url: '/race',
          template: '<survey-race></survey-race>'
      })
      
      .state('survey.sexuality', {
          url: '/sexuality',
          template: '<survey-sexuality></survey-sexuality>'
      })
  
  $urlRouterProvider.otherwise('/survey');
  
}