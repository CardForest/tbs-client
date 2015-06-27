import 'angular-material/angular-material.css!';
import '../stylesheets/main.css!';

import angular from 'angular';
import ngMaterial from 'angular-material';

import roomModule from './room/module';
var app = angular
  .module('tbs-client', [ngMaterial, roomModule]);

//app.controller('MainCtrl', function () {
//  this.html = 'views/main.html';
//});

angular.element(document).ready(function () {
  angular.bootstrap(document, ['tbs-client']);
});

