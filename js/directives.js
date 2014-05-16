// Demo 1 *******************************************************************

app.directive('simpleHello', function(){
    return {
        restrict: 'AEC',
        template: '<h1>Hello World!!!!!</h1>'
    }
});

app.directive('replaceableHello', function(){
    return {
        restrict: 'AEC',
        template: '<h1>Replaceable Hello World!!!!!</h1>',
        replace: true
    }
});

// Demo 2 *******************************************************************

app.directive('contentHere', function(){
    return {
        restrict: 'E',
        templateUrl: 'content.html'
    }
});

app.directive('contentElsewhere', function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/separate.html'
    }
});

// Demo 3 Part 1 *************************************************************

app.directive('parentScope', function(){
    return {
        restrict: 'E',
        replace: true,
        template: '<div><hr><h3>Directive with parent scope:</h3><label for="directiveInput">Input:</label> '
            + '<input id="directiveInput" ng-model="input">',
        scope: false
    };
});

app.directive('childScope', function(){
    return {
        restrict: 'E',
        replace: true,
        template: '<div><hr><h3>Directive with child scope:</h3><label for="directiveInput">Input:</label> '
            + '<input id="directiveInput" ng-model="input">',
        scope: true
    };
});

app.directive('isolatedScope', function(){
    return {
        restrict: 'E',
        replace: true,
        template: '<div><hr><h3>Directive with isolated scope:</h3><label for="directiveInput">Input:</label> '
            + '<input id="directiveInput" ng-model="input">',
        scope: {}
    };
});

// Demo 3 Part 2 *************************************************************

app.directive('isolatedDemo', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            notChangeable: '@',
            changeable: '=',
            sayHello: '&'
        },
        template: '<div><hr><label for="cannotChange">Not Changeable:</label> '
            + '<input id="cannotChange" ng-model="notChangeable"><br> '
            + '<label for="canChange">Changeable: </label> '
            + '<input id="canChange" ng-model="changeable"> '
            + '<br><button class="btn" ng-click="sayHello(name)">Say Hello</button>'
    };
});

// Demo 4 ********************************************************************

app.directive('linkingDemo', function(){
    var colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

    return {
        restrict: 'E',
        replace: true,
        scope: {
            initialColor: '@'
        },
        template: '<div><h2>I am a color changing div</h2><button class="btn">Change my color</button></div>',
        link: function(scope, element, attrs){
            scope.colorIndex = scope.initialColor;

            var div = element.children(':first');
            div.css('background-color', colors[scope.colorIndex]);
            element.find('button').on('click', function(){
                scope.colorIndex++;
                div.css('background-color', colors[scope.colorIndex % colors.length]);
            });
        }
    }
});

// Demo 5 ********************************************************************

app.directive('contactInfo', function($document){
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        transclude: true,
        template: '<div class="contact-info" ng-transclude></div>',
        link: function(scope, element, attrs){
            var startX = 0, startY = 0, x = 0, y = 0;

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    }
});

// Demo 6 ********************************************************************

app.directive('lightPanel', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'templates/lights.html',
        controller: function($scope){
            var lights = [];
            $scope.state = 'off';

            this.addLight = function(lightScope){
                lights.push(lightScope);
            }

            $scope.toggle = function(){
                var toggling = $scope.state == 'off' ? 'on' : 'off';

                $scope.state = toggling;
                lights.forEach(function(light){
                    if(light.state != toggling){
                        light.toggle();
                    }
                });
            };
        }
    }
});

app.directive('lightBulb', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            lightsUp: '@'
        },
        require: '^lightPanel',
        template: '<div class="light"><img ng-src="../img/{{currColor}}.png"><img id="switch" ng-click="toggle()" ng-src="../img/{{state}}.png"></div>',
        link: function(scope, element, attributes, controller){
            scope.state = 'off';
            scope.currColor = 'out';

            scope.toggle = function(){
                if(scope.state == 'off'){
                    scope.state = 'on';
                    scope.currColor = scope.lightsUp;
                }
                else {
                    scope.state = 'off';
                    scope.currColor = 'out';
                }
            };

            controller.addLight(scope);
        }
    }
});