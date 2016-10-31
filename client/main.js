import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Seeking } from '../imports/ui/components/seeking/seeking';

function onReady() {
  angular.bootstrap(document, [
    Seeking
  ], {
    strictDi: true
  });
}
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}