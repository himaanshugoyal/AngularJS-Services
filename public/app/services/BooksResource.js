(function(){
    'use strict';

    angular
        .module('app')
        .factory('BooksResource', ['$resource', BooksResource]);

    /** @ngInject */
    function BooksResource($resource){

        //it returns to the call to the resource service
        // the object returned is the resource class on the server
        // First parameter to the $resource service is a url template, it represents the url to use when contacting the server.
        // The book_id segment at the end is prefixed with a colon to denote that it's optional
        // The second parameter is where you can specify parameter defaults. Here @book_id, tells angular to use the book_id property stored on the data object sent with the request.
        // The next parameter lets you speficy additional actions that should be added to the object. This is a chance to create new methods for the object
        return $resource('/api/books/:book_id', {book_id: '@book_id'},
        {
            'update': {method: 'PUT'},
        }
    );
    }
}());