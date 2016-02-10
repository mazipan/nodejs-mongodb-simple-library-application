/*
 * @author : irfan.maulana
 */
var libraryService = angular.module('irfan.library.service', ['ngResource']);
libraryService.factory('libraryServiceUserType', ['$resource', libraryServiceUserTypeFunc]);
libraryService.factory('libraryServiceUser', ['$resource', libraryServiceUserFunc]);
libraryService.factory('libraryServiceBookCategory', ['$resource', libraryServiceBookCategoryFunc]);
libraryService.factory('libraryServiceBook', ['$resource', libraryServiceBookFunc]);

function libraryServiceUserTypeFunc($resource) {
    return $resource( ROOT_URL + '/api/usertypes/:command/:command2', {}, {
        'getUserTypes': {
            method: 'GET',
            params: {
                r: Date.now()
            }
        }
    });
}

function libraryServiceUserFunc($resource) {
    return $resource( ROOT_URL + '/api/users/:command/:command2', {}, {
        'getUsers': {
            method: 'GET',
            params: {
                r: Date.now()
            }
        },
        'getUser': {
            method: 'GET',
            params: {
                command: '@id', //ID
                r: Date.now()
            }
        },
        'doLogin': {
            method: 'POST',
            params: {
                command: 'login',
                r: Date.now()
            },
            data:{
                username: '@username',
                password: '@password'
            }
        },
        'insertUser': {
            method: 'POST',
            params: {
                command: '@userTypeId',
                r: Date.now()
            },
            data:{
                username : '@username',
                password : '@password',
                trueName : '@trueName',
                email : '@email'
            }
        }
    });
}


function libraryServiceBookCategoryFunc($resource) {
    return $resource( ROOT_URL + '/api/bookcategories/:command/:command2', {}, {
        'getBookCategories': {
            method: 'GET',
            params: {
                r: Date.now()
            }
        }
    });
}

function libraryServiceBookFunc($resource) {
    return $resource( ROOT_URL + '/api/books/:command/:command2', {}, {
        'getBooks': {
            method: 'GET',
            params: {
                r: Date.now()
            }
        }
    });
}