(function() {

    var app = angular.module('app', []);
    
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
    app.config(['booksProvider', 'constants', 'dataServiceProvider', function(booksProvider, constants, dataServiceProvider){
        
       booksProvider.setIncludeVersionInTitle(false);

       console.log('title from constants service: ' + constants.APP_TITLE);

       console.log(dataServiceProvider.$get);
    }]);

}());