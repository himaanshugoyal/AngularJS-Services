(function() {

    angular.module('app')
        .controller('BooksController',['books', 'dataService', 'logger', 'badgeService',BooksController ] );


    function BooksController(books, dataService,logger, badgeService) {
        // vm = viewmodel
        var vm = this;

        vm.appName = books.appName;

       dataService.getAllBooks()
       .then(getBooksSuccess, null, getBooksNotifcation)
       .catch(errorCallBack)
       .finally(getAllBooksComplete);
        function getBooksSuccess(books){
           
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

        function getAllBooksComplete(){
            console.log('getAllBooks has completed');
        }
        // vm.allReaders = dataService.getAllReaders();
        dataService.getAllReaders()
        .then(getReadersSuccess)
        .catch(errorCallBack)
        .finally(getAllReadersComplete);
         function getReadersSuccess(readers){
            
             vm.allReaders = readers;
         }
 
         function errorCallBack (errorMsg) {
             console.log("ErrorMessage: " + errorMsg);
         }
 
         function getAllReadersComplete(){
             console.log('getAllReaders has completed');
         }

        vm.getBadge = badgeService.retrieveBadge;

        logger.output('BooksController has been create');
    }


}());