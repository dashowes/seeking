import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Meteor } from 'meteor/meteor';

import template from './survey7.html';
import { Profiles } from '../../../api/profiles/index';

class survey7 {
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
        politicsBandAnswer: this.profile.politicsBandAnswer,
        politicsBandWeight: this.profile.politicsBandWeight,
        religionAnswer: this.profile.religionAnswer,
        religionWeight: this.profile.religionWeight,
        religionBandAnswer: this.profile.religionBandAnswer,
        religionBandWeight: this.profile.religionBandWeight,
        drinkAnswer: this.profile.drinkAnswer,
        drinkWeight: this.profile.drinkWeight,
        drugsAnswer: this.profile.drugsAnswer,
        drugsWeight: this.profile.drugsWeight
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
 
const name = 'survey7';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(name, {
  template,
  controllerAs: name,
  controller: survey7
})
  .config(config);
 
function config($stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  
    .state('survey7', {
        url: '/survey7',
        template: '<survey7></survey7>'
    })
      
      .state('survey7.politicsBand', {
          url: '/politicsBand',
          template: '<survey7-politics-band></survey7-politics-band>'
      })
      
      .state('survey7.religion', {
          url: '/religion',
          template: '<survey7-religion></survey7-religion>'
      })
      
      .state('survey7.religionBand', {
          url: '/religionBand',
          template: '<survey7-religion-band></survey7-religion-band>'
      })
      
      .state('survey7.drink', {
          url: '/drink',
          template: '<survey7-drink></survey7-drink>'
      })
      
      .state('survey7.drugs', {
          url: '/drugs',
          template: '<survey7-drugs></survey7-drugs>'
      });
      
  $urlRouterProvider.otherwise('/survey7/politicsBand');
  
}