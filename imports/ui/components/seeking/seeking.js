import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import angularMoment from 'angular-moment';

import template from './seeking.html';

import { name as ProfilesList } from '../profilesList/profilesList';
import { name as ProfileDetails } from '../profileDetails/profileDetails';
import { name as Navigation } from '../navigation/navigation';
import { name as Auth } from '../auth/auth';
import { name as Bottom } from '../bottom/bottom';
import { name as About } from '../about/about';
import { name as Terms } from '../terms/terms';
import { name as Privacy } from '../privacy/privacy';
import { name as Promo } from '../promo/promo';
import { name as Survey1 } from '../anotherSurvey/survey1';
import { name as SurveyDetails } from '../surveyDetails/surveyDetails';
 
class Seeking {}
 
const name = 'seeking';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter,
  angularMoment,
  ProfilesList,
  ProfileDetails,
  Navigation,
  Auth,
  Bottom,
  About,
  Terms,
  Privacy,
  Promo,
  Survey1,
  SurveyDetails,
  'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: Seeking
})
  .config(config)
  .run(run);
 
function config($locationProvider, $urlRouterProvider, $mdIconProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/profiles');
  
  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';
 
  $mdIconProvider
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');
}



function run($rootScope, $state) {
  'ngInject';
 
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('profiles');
      }
    }
  );
}