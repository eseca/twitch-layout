var twitchLayoutApp = angular.module('twitchLayoutApp', []);

twitchLayoutApp.controller('DashboardCtrl', ['$scope', '$http', '$interval',
        function ($scope, $http, $interval) { 
            $scope.game = '';
            $scope.status = '';

            $scope.getChannel = function(username) {
                var url = 'https://api.twitch.tv/kraken/channels/' + username;
                $http.get(url).then($scope.setInfo);
            };

            $scope.setInfo = function(response) {
                $scope.game = response.data.game;
                $scope.status = response.data.status;
            };

            $scope.getChannel('eseca');
            $interval($scope.getChannel, 30000, 0, true, ['eseca']);
        }]);
