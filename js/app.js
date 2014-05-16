var app = new angular.module('directivesApp', []);

app.controller('SimpleController', function($scope){
    $scope.text = '';
    $scope.names = ['Bill', 'Bob', 'Joe', 'Dan', 'Mary'];
    $scope.whereTo = 'google';
});

app.controller('Demo3Controller', function($scope){
    $scope.input = '';
});

app.controller('Demo3Part2Controller', function($scope){
    $scope.changeable = 'Bob';
    $scope.notChangeable = 'Mary';
    $scope.sayHello = function(name){
        alert('Hello there from ' + $scope.notChangeable + ' and ' + $scope.changeable + '!');
    }
});

app.controller('Demo4Controller', function($scope){
   $scope.initialColor = 0;
});

app.controller('TranscludeController', function($scope){
    $scope.person = {
        name: 'John Smith',
        address: '123 Angular St.',
        city: 'Pittsburgh',
        state: 'PA',
        zipcode: 15212
    };

    $scope.business = {
        name: 'Plumber Central',
        address: '8456 Business Way',
        city: 'Pittsburgh',
        state: 'PA',
        zipcode: 15237,
        phone: '123-456-7891',
        email: 'dave@plcentral.com'
    };
});
