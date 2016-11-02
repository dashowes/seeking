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
    this.questionId = $stateParams.profileId.questionId;
    
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
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
      .state('survey', {
        url: '/survey',
        template: '<survey></survey>'
      })
      
      .state('survey.favRecords', {
          url: '/favrecords',
          template: '<survey-favrecords></survey-favrecords>'
      })
      
      .state('survey.favProducers', {
          url: '/favproducers',
          template: '<survey-favproducers></survey-favproducers>'
      })
      
      .state('survey.favLabels', {
          url: '/favlabels',
          template: '<survey-favlabels></survey-favlabels>'
      })
      
      .state('survey.skillLevel', {
          url: '/skilllevel',
          template: '<survey-skilllevel></survey-skilllevel>'
      })
      
      .state('survey.instrumentYears', {
          url: '/instrumentyears',
          template: '<survey-instrumentyears></survey-instrumentyears>'
      })
      
      .state('survey.liveBand', {
          url: '/liveband',
          template: '<survey-liveband></survey-liveband>'
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
          url: '/practicetime',
          template: '<survey-practicetime></survey-practicetime>'
      })
      
      .state('survey.localShows', {
          url: '/localshows',
          template: '<survey-localshows></survey-localshows>'
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
          url: '/originalorcover',
          template: '<survey-originalorcover></survey-originalorcover>'
      })
      
      .state('survey.occasionalCover', {
          url: '/occasionalCover',
          template: '<survey-occasionalcover></survey-occasionalcover>'
      })
      
      .state('survey.venues', {
          url: '/venues',
          template: '<survey-venues></survey-venues>'
      })
      
      .state('survey.venuesBad', {
          url: '/venuesbad',
          template: '<survey-venuesbad></survey-venuesbad>'
      })
      
      .state('survey.practiceSpace', {
          url: '/practicespace',
          template: '<survey-practicespace></survey-practicespace>'
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
          url: '/familyorbusiness',
          template: '<survey-familyorbusiness></survey-familyorbusiness>'
      })
      
      .state('survey.bandImage', {
          url: '/bandimage',
          template: '<survey-bandimage></survey-bandimage>'
      })
      
      .state('survey.favMovies', {
          url: '/favmovies',
          template: '<survey-favmovies></survey-favmovies>'
      })
      
      .state('survey.favTvShows', {
          url: '/favtvshows',
          template: '<survey-favtvshows></survey-favtvshows>'
      })
      
      .state('survey.socialPolitics', {
          url: '/socialpolitics',
          template: '<survey-socialpolitics></survey-socialpolitics>'
      })
      
      .state('survey.fiscalPolitics', {
          url: '/fiscalpolitics',
          template: '<survey-fiscalpolitics></survey-fiscalpolitics>'
      })
      
      .state('survey.politicsBand', {
          url: '/politicsband',
          template: '<survey-politicsband></survey-politicsband>'
      })
      
      .state('survey.religion', {
          url: '/religion',
          template: '<survey-religion></survey-religion>'
      })
      
      .state('survey.religionBand', {
          url: '/religionband',
          template: '<survey-religionband></survey-religionband>'
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