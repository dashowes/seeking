import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './matchResponsesList.html';

class MatchResponsesList { }
 
const name = 'matchResponsesList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    responses: '<'
  },
  controller: MatchResponsesList
});