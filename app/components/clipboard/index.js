import angular from 'angular';

import ZeroClipboard from 'zeroclipboard';

angular.module('tbs.clipboard', [])
  .factory('clipboardLoader', ['$q', function ($q) {
    return $q(function (resolve) {
      var zeroClipboard = new ZeroClipboard();
      zeroClipboard.on('ready', function () {
        zeroClipboard.on('copy', function (event) {
          let $elem = angular.element(event.target);
          $elem.triggerHandler({type: '$md.pressdown', pointer: {x: 0, y: 0}});
          $elem.triggerHandler({type: '$md.pressup', pointer: {x: 0, y: 0}});

          event.clipboardData.setData('text/plain', event.target.textContent);
        });

        zeroClipboard.on('aftercopy', function (event) {
          console.log('Copied text to clipboard: ' + event.data['text/plain']);
        });

        resolve(zeroClipboard);
      });

      zeroClipboard.on( 'error', function(event) {
        console.error( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
        ZeroClipboard.destroy();
      });
    });
  }])
  .directive('clipboard', ['clipboardLoader', '$mdButtonInkRipple', function (clipboardLoader, $mdButtonInkRipple) {
    return {
      template: '<md-button><md-tooltip>Click to copy!</md-tooltip>{{content}}</md-button>',
      scope: {
        content: '@'
      },
      link: function (scope, element) {
        //$mdButtonInkRipple.attach(scope, element);
        //setTimeout(function() {
        //  console.log('here')
        //  element.triggerHandler({ type: '$md.pressdown', pointer: { x: 0, y: 0 } });
        //  setTimeout(function() {
        //    console.log('here')
        //    element.triggerHandler({ type: '$md.pressup', pointer: { x: 0, y: 0 } });
        //  }, 1000)
        //}, 2000)
        element = element.find('button');
        clipboardLoader.then(function (clipboard) {


          clipboard.clip(element);
          scope.$on('$destroy', function () {
            clipboard.unclip(element);
          });
        });
      }
    }
  }]);
