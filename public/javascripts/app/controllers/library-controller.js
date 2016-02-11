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
    $scope.currentUserRole = "admin";
    $scope.tabHomePageActive = "book";

    $scope.changeTabActive = function(tabCodeName){
        $scope.tabHomePageActive = tabCodeName;
    };

    $scope.submitLogin = function submitLogin(){
        libraryServiceUser
            .doLogin({
                username: $scope.loginUserName,
                password: MD5($scope.loginPassword)
            })
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.loginPassword = "";
                    $scope.isLoggedIn = true;
                    $scope.userLoggedIn = response.user;
                    $scope.currentPageView = "homepage";
                    localStorage.removeItem("irfanlibraryuserloggedin");
                    localStorage.setItem("irfanlibraryuserloggedin", $scope.userLoggedIn._id);
                }else{
                    $scope.userLoggedIn = null;
                    swal({text: "Maaf, Sepertinya username atau password anda salah nih.", title: 'Error Message', type: 'error'});
                }
            });
    };

    $scope.logout = function(){
        localStorage.removeItem("irfanlibraryuserloggedin");
        $scope.currentPageView = "loginpage";
        $scope.isLoggedIn = false;
        $scope.userLoggedIn = null;
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

    $scope.getUserById = function(id){
        libraryServiceUser
            .getUser({
                userId : id
            })
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.userLoggedIn = response.user;
                }else $scope.userLoggedIn = null;
            });
    };

    $scope.checkUserAndRedirect = function(){
        if(typeof localStorage !== "undefined" && localStorage.getItem("irfanlibraryuserloggedin") !== null){
            $scope.isLoggedIn = true;
            $scope.getUserById(localStorage.getItem("irfanlibraryuserloggedin"));
            $scope.currentPageView = "homepage";
            $scope.getAllUsers();
        }else{
            $scope.currentPageView = "loginpage";
            $scope.isLoggedIn = false;
            $scope.userLoggedIn = null;
        }
    };

    $scope.checkUserAndRedirect();

}

