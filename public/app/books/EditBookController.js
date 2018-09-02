(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'dataService', EditBookController]);

    function EditBookController($routeParams, dataService) {
        //console.log($routeParams.bookID);

        var vm = this;

        dataService.getAllBooks()
           .then(function(books) {
               // Using the filter function available on arrays to find the book id that matches the book id coming from routeParams service
               // Since the filter function returns an array [0] returned to return the first element of the array
               vm.currentBook = books.filter(function(item) {
                   return item.book_id == $routeParams.bookID;
               })[0];
           });
    }
}());