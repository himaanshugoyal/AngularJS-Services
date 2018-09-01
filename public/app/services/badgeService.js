(function(){
    'use strict';

    // Value services are wrappers around factory
    // You can use value instead of factory if you dont need to inject anything into it
    angular
    .module('app')
    .value('badgeService', {
        // property, which is the function below
        retrieveBadge:retrieveBadge
    });
    
    function retrieveBadge(minutesRead) {

        var badge = null;

        switch (true) {

            case (minutesRead > 5000):
                badge = 'Book Worm';
                break;
            case (minutesRead > 2500):
                badge = 'Page Turner';
                break;
            default:
                badge = 'Getting Started';
        }

        return badge;

    }
   
}());