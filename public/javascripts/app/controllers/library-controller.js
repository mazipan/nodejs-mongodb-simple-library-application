/**
 * Created by irfan.maulana on 2/10/2016.
 */
var libraryController = angular.module('irfan.library.controller',[]);

libraryCtrlFunc.$inject =
    ['$scope', '$http', 'libraryServiceUserType', 'libraryServiceUser', 'libraryServiceBookCategory', 'libraryServiceBook'];
libraryController.controller('library.ctrl',
    ['$scope', '$http', 'libraryServiceUserType', 'libraryServiceUser', 'libraryServiceBookCategory', 'libraryServiceBook', libraryCtrlFunc]);

function libraryCtrlFunc($scope, $http, libraryServiceUserType, libraryServiceUser, libraryServiceBookCategory, libraryServiceBook){

    $scope.users = [];
    $scope.isLoggedIn = false;
    $scope.currentPageView = "homepage";
    $scope.currentUserRole = "admin";

    $scope.submitLogin = function submitLogin(){

    };
    $scope.getAllUsers = function(){
        libraryServiceUser
            .getUsers({})
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.users = response.users;
                }else $scope.users = [];
            });
    };

}