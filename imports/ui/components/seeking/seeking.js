import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
 
import template from './seeking.html';

import { name as ProfilesList } from '../profilesList/profilesList';
import { name as ProfileFullView } from '../profileFullView/profileFullView';
import { name as ProfileDetails } from '../profileDetails/profileDetails';
import { name as Navigation } from '../navigation/navigation';
import { name as Auth } from '../auth/auth';
import { name as Bottom } from '../bottom/bottom';
import { name as About } from '../about/about';
import { name as Terms } from '../terms/terms';
import { name as Privacy } from '../privacy/privacy';
import { name as Promo } from '../promo/promo';
import { name as Survey1 } from '../survey/survey1';
import { name as Survey2 } from '../survey/survey2';
import { name as Survey3 } from '../survey/survey3';
import { name as Survey4 } from '../survey/survey4';
import { name as Survey5 } from '../survey/survey5';
import { name as Survey6 } from '../survey/survey6';
import { name as Survey7 } from '../survey/survey7';
import { name as Survey8 } from '../survey/survey8';
import { name as SurveyDetails } from '../surveyDetails/surveyDetails';

 
class Seeking {}
 
const name = 'seeking';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter,
  ProfilesList,
  ProfileFullView,
  ProfileDetails,
  Navigation,
  Auth,
  Bottom,
  About,
  Terms,
  Privacy,
  Promo,
  Survey1,
  Survey2,
  Survey3,
  Survey4,
  Survey5,
  Survey6,
  Survey7,
  Survey8,
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