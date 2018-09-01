(function() {

    angular.module('app')
        .controller('BooksController', BooksController);


    function BooksController(books) {
        // vm = viewmodel
        var vm = this;

        vm.appName = books.appName;

    }


}());