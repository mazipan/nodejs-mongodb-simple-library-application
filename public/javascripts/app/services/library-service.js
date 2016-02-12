/*
 * @author : irfan.maulana
 */
var libraryService = angular.module('irfan.library.service', ['ngResource']);
libraryService.factory('libraryServiceUserType', ['$resource', libraryServiceUserTypeFunc]);
libraryService.factory('libraryServiceUser', ['$resource', libraryServiceUserFunc]);
libraryService.factory('libraryServiceBookCategory', ['$resource', libraryServiceBookCategoryFunc]);
libraryService.factory('libraryServiceBook', ['$resource', libraryServiceBookFunc]);
libraryService.factory('libraryServiceTransaction', ['$resource', libraryServiceTransactionFunc]);

function libraryServiceTransactionFunc($resource) {
    return $resource( ROOT_URL + '/api/transactions/:command/:command2', {}, {
        'getTransactions': {
            method: 'GET',
            params: {
                r: Date.now()
            }
        }
    });
}

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
    return $resource( ROOT_URL + '/api/users/:userId/:command/', {}, {
        'getUsers': {
            method: 'GET',
            params: {
                r: Date.now()
            }
        },
        'getUser': {
            method: 'GET',
            userId: '@userId',
            params: {
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
            userId : '@userId',
            params: {
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