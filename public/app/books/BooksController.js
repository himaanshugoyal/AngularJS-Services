(function() {

    angular.module('app')
        .controller('BooksController',['books', 'dataService', 'logger', 'badgeService',BooksController ] );


    function BooksController(books, dataService,logger, badgeService) {
        // vm = viewmodel
        var vm = this;

        vm.appName = books.appName;

       dataService.getAllBooks()
       .then(getBooksSuccess, null, getBooksNotifcation)
       .catch(errorCallBack);

        function getBooksSuccess(books){
            throw 'error in success handler';
            vm.allBooks = books;
        }

        // function getBooksError(reason ){
        //     console.log(reason);
        // }

        function errorCallBack (errorMsg) {
            console.log("ErrorMessage: " + errorMsg);
        }

        function getBooksNotifcation(notification){
            console.log('Promise Notifcation' + notification);
        }

        vm.allReaders = dataService.getAllReaders();

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController has been create');
    }


}());