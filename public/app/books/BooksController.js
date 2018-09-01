(function() {

    angular.module('app')
        .controller('BooksController',['books', 'dataService', 'logger', 'badgeService',BooksController ] );


    function BooksController(books, dataService,logger, badgeService) {
        // vm = viewmodel
        var vm = this;

        vm.appName = books.appName;

       dataService.getAllBooks()
       .then(getBooksSuccess, getBooksError, getBooksNotifcation);

        function getBooksSuccess(books){
            vm.allBooks = books;
        }

        function getBooksError(reason ){
            console.log(reason);
        }

        function getBooksNotifcation(notification){
            console.log('Promise Notifcation' + notification);
        }

        vm.allReaders = dataService.getAllReaders();

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController has been create');
    }


}());