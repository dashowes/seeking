import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import template from './matchResponsesList.html';

class MatchResponsesList { }
 
const name = 'matchResponsesList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    responses: '<'
  },
  controller: MatchResponsesList
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('matchResponsesList', {
      url: '/matchResponsesList',
      template: '<match-responses-list></match-responses-list>'
    });
}