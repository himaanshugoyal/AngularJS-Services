(function() {

    var app = angular.module('app', []);

     // Provider function is also exposed as a module object and its not mandatory to inject in config and then use it.
    app.provider('books', function () {

        // Every provider must have a property $get
        // $get contains the function that will be executing the service for us.
        this.$get = function (){
            var appName = 'Book Logger';
            var appDesc = 'Track which books you read.'
            
            var version = '1.0';

            if(includeVersionInTitle) {
                appName += ' ' + version;
            }

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

    });
    // angular automatically appends provider
    app.config(function(booksProvider){

       booksProvider.setIncludeVersionInTitle(false);
    });

}());