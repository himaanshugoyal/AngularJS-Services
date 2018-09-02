(function() {

    var app = angular.module('app', ['ngRoute', 'ngCookies']);
    
     // Provider function is also exposed as a module object and its not mandatory to inject in config and then use it.
    app.provider('books',['constants', function (constants) {

        // Every provider must have a property $get
        // $get contains the function that will be executing the service for us.
        this.$get = function (){
            var appName = constants.APP_TITLE;
            var version = constants.APP_DESCRIPTION;

            if(includeVersionInTitle) {
                appName += ' ' + version;
            }
            var appDesc = constants.APP_DESCRIPTION;
            
            // The return code contains the object literal that represents the service
            return {
                appName: appName,
                appDesc: appDesc
            };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

    }]);
    // angular automatically appends provider
    // We cannot inject value service, factory service and service service in the config
    // We can only inject the provider for the service or only the constant service
    // Angular create underline providers for us the services we define, but we generally use the other services
    // just to demonstrate above point so we can inject dataServiceProvider
    app.config(['booksProvider', '$routeProvider', '$logProvider', function(booksProvider, $routeProvider,$logProvider){
        
       booksProvider.setIncludeVersionInTitle(false);
    $logProvider.debugEnabled(true);

       $routeProvider
       .when('/', {
           templateUrl: '/app/templates/books.html',
           controller: 'BooksController',
           controllerAs: 'books'
       })
       .when('/AddBook', {
           templateUrl: '/app/templates/addBook.html',
           controller: 'AddBookController',
           controllerAs: 'bookAdder'
       })
       .when('/EditBook/:bookID', {
        templateUrl: '/app/templates/editBook.html',
        controller: 'EditBookController',
        controllerAs: 'bookEditor',
        // angular will wait till the dependcies are resolve before moving to the new route.
        // resolve: {
        //     books: function (dataService) {
        //         //throw 'error getting books';
        //         return dataService.getAllBooks();
        //     }
        // }
        })
        
        .otherwise('/');
    }]);

    // angular has a function name run, which act as an initialization module
    app.run(['$rootScope', function($rootScope){
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

            console.log('successfully changed routes');

        });

        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {

            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);

        });

    }])

}());