import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
 
import template from './matchResponse.html';
 
class MatchResponse {
  yes() {
    this.answer('yes');
  }
 
  maybe() {
    this.answer('maybe');
  }
 
  no() {
    this.answer('no');
  }
 
  answer(answer) {
    Meteor.call('response', this.profile._id, answer, (error) => {
      if (error) {
        console.error('Oops, unable to respond!');
      } else {
        console.log('Response done!')
      }
    });
  }
}

const name = 'matchResponse';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    profile: '<'
  },
  controller: MatchResponse
});