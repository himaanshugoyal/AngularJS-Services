(function() {

    var app = angular.module('app', []);

    app.config(function($provide){

        // Benefit of provider is that it is configurable during the module configuration phase
        $provide.provider('books', function () {

            // Every provider must have a property $get
            // $get contains the function that will be executing the service for us.
            this.$get = function (){
                var appName = 'Book Logger';
                var appDesc = 'Track which books you read.'
                

                // The return code contains the object literal that represents the service
                return {
                    appName: appName,
                    appDesc: appDesc
                };
            };
        });
    });

}());