import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './matchResponsesList.html';
import { name as MatchResponseUsers } from '../matchResponseUsers/matchResponseUsers';
 
class MatchResponsesList { }
 
const name = 'matchResponsesList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  MatchResponseUsers
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    responses: '<'
  },
  controller: MatchResponsesList
});