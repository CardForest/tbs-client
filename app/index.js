import 'angular-material/angular-material.css!';
//import './stylesheets/index.css!';
import angular from 'angular';

// modules
import 'angular-material';
import 'angular-route';
import './components/main/index';

angular.module('tbs', ['ngMaterial', 'ngRoute', 'tbs.main'])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'components/main/index.html',
      controllerAs: 'main',
      controller: 'MainController'
    });
});

angular.element(document).ready(function () {
    angular.bootstrap(document, ['tbs']);
});
