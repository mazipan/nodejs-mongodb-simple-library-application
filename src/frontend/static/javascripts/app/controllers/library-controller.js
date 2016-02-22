/**
 * Created by irfan.maulana on 2/10/2016.
 */
var libraryController = angular.module('irfan.library.controller',[]);

libraryCtrlFunc.$inject =
    ['$scope', '$http', 'libraryServiceUserType', 'libraryServiceUser', 'libraryServiceBookCategory', 'libraryServiceBook', 'libraryServiceTransaction'];
libraryController.controller('library.ctrl',
    ['$scope', '$http', 'libraryServiceUserType', 'libraryServiceUser', 'libraryServiceBookCategory', 'libraryServiceBook', 'libraryServiceTransaction', libraryCtrlFunc]);

function libraryCtrlFunc($scope, $http, libraryServiceUserType, libraryServiceUser, libraryServiceBookCategory, libraryServiceBook, libraryServiceTransaction){

    $scope.users = [];
    $scope.isLoggedIn = false;
    $scope.currentUserRole = "admin";
    $scope.tabHomePageActive = "book";

    $scope.changeTabActive = function(tabCodeName){
        $scope.tabHomePageActive = tabCodeName;
    };

    $scope.changeCurrentPageView = function(pageViewCodeName){
        $scope.currentPageView = pageViewCodeName;
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
                    $scope.userLoggedIn = response.user;
                    $scope.getDataAfterLoggedIn();
                    localStorage.removeItem("irfanlibraryuserloggedin");
                    localStorage.setItem("irfanlibraryuserloggedin", $scope.userLoggedIn._id);
                }else{
                    $scope.userLoggedIn = null;
                    swal({text: "Maaf, Sepertinya username atau password anda salah nih.", title: 'Error Message', type: 'error'});
                }
            });
    };

    $scope.getDataAfterLoggedIn = function () {
        $scope.isLoggedIn = true;
        $scope.changeCurrentPageView("homepage");
        $scope.getAllUsers();
        $scope.getAllBooks();
        $scope.getAllBookCategories();
    };

    $scope.logout = function(){
        localStorage.removeItem("irfanlibraryuserloggedin");
        $scope.changeCurrentPageView("loginpage");
        $scope.isLoggedIn = false;
        $scope.userLoggedIn = null;
    };

    /** COMMUNICATION WITH SERVER **/
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

    $scope.getAllTransactions = function(){
        libraryServiceTransaction
            .getTransactions({})
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.transactions = response.transactions;
                }else $scope.transactions = [];
            });
    };

    $scope.getAllBooks = function(){
        libraryServiceBook
            .getBooks({})
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.books = response.books;
                }else $scope.books = [];
            });
    };

    $scope.getAllBookCategories = function(){
        libraryServiceBookCategory
            .getBookCategories({})
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.bookCategories = response.bookCategories;
                }else $scope.bookCategories = [];
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
            $scope.getUserById(localStorage.getItem("irfanlibraryuserloggedin"));
            $scope.getDataAfterLoggedIn();
        }else{
            $scope.changeCurrentPageView("loginpage");
            $scope.isLoggedIn = false;
            $scope.userLoggedIn = null;
        }
    };

    // RUN FIRST WHEN INITIALIZE CONTROLLER
    $scope.checkUserAndRedirect();

}

