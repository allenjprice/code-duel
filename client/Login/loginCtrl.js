angular.module('app')
  .controller('loginCtrl', function($scope, $location, socket) {

    $scope.submitUserRoom = function(){

      socket.emit('checkRoom', $scope.roomname);

      $scope.pickNewRoom = false;
      socket.on('roomStatus', function(isFull){
        $scope.roomfull = isFull;
        console.log($scope.roomname);
        console.log("IS FULL:", isFull);
          if(isFull){
            $scope.pickNewRoom = true;
            console.log("Pick a new room!");
          } else if (isFull === false) {
            socket.emit('addToRoom', { username:$scope.username, roomname: $scope.roomname});
            $location.url('/room'); 
          }
      });


      socket.on('joinedRoom', function(room){
        console.log("You are in room:", room);
      });
    };
      
      //hide highscores on start
      $scope.highscores = false;
      $scope.showHighScores = function(){
        //toggle hide and show highscores
        $scope.highscores = !$scope.highscores;
      };
      
      //this is emitted when user first connects to sockets
      socket.on('getHighScores', function(result){
        $scope.scoretext = result;
        console.log('highschores', $scope.scoretext, result);
      });
  
  });