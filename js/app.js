var twitchLayoutApp = angular.module('twitchLayoutApp', ['angularMoment']);


twitchLayoutApp.controller('DashboardCtrl', ['$scope', '$http', '$interval',
        function ($scope, $http, $interval) { 
            twitchLayoutApp.run(function(amMoment) {
                amMoment.changeLocale('es');
            });

            $scope.game = '';
            $scope.status = 'Iniciando stream...';
            $scope.timeup = new Date();

            $scope.getChannel = function(username) {
                var url = 'https://api.twitch.tv/kraken/streams/' + username;
                $http.get(url).then($scope.setInfo);
            };

            $scope.setInfo = function(response) {
                if (response.data.stream) {
                    $scope.game = response.data.stream.channel.game;
                    $scope.status = response.data.stream.channel.status;
                    $scope.timeup = response.data.stream.created_at;
                }
            };

            $scope.getChannel('eseca');
            $interval($scope.getChannel, 30000, 0, true, ['eseca']);
        }]);

