// Interceptor are used as services
(function(){
    'use strict';

    angular
        .module('app')
        .service('bookLoggerInterceptor',['$q', '$log', bookLoggerInterceptor]);

    /** @ngInject */
    function bookLoggerInterceptor($q, $log){

       return {
           request: requestInterceptor,
           responseError: responseErrorInterceptor

           // not yet implemented - all interceptors are optional
           // requestError
           // response
       };

       function requestInterceptor (config) {
           $log.info('HTTP ' + config.method + ' request - ' + config.url);
           return config;
       }

       function responseErrorInterceptor(response) {
           $log.info('HTTP ' + response.config.method + ' response error - ' + response.config.url);
           return $q.reject(response);
       }
    }

}());