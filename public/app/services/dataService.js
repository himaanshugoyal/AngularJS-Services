(function() {
  "use strict";

  /*
    // In .factory -
    // First Parameter is the name of the service
    // Second Parameter is a function that would be called and would be assigned to the get property when the provider
    function is called behind the scenes
    */
  angular
    .module("app")
    .factory("dataService", [
      "$q",
      "$timeout",
      "logger",
      "$http",
      "constants",
      dataService
    ]);

  /** @ngInject */
  function dataService($q, $timeout, logger, $http, constants) {
    return {
      // Reference Function
      getAllBooks: getAllBooks,
      getAllReaders: getAllReaders,
      getBookByID: getBookByID,
      updateBook:updateBook
    };

    function getAllBooks() {
      return $http({
        method: "GET",
        url: "api/books",
        headers: {
          "PS-BookLogger-Version": constants.APP_VERSION
        }
      })
        .then(sendResponseData)
        .catch(sendGetBooksError);
    }

    function sendResponseData(response) {
      return response.data;
    }

    function sendGetBooksError(response) {
      return $q.reject(
        "Error retrieving book(s). (HTTP status: " + response.status + ")"
      );
    }

    function getBookByID(bookID) {
      return $http
        .get("api/books/" + bookID)
        .then(sendResponseData)
        .catch(sendGetBooksError);
    }

    function updateBook(book) {

        return $http({
            method: 'PUT',
            url: 'api/books/' + book.book_id,
            data: book
        })
        .then(updateBookSuccess)
        .catch(updateBookError);
    }
    function updateBookSuccess(response) {

        return 'Book updated: ' + response.config.data.title;

    }

    function updateBookError(response) {

        return $q.reject('Error updating book.(HTTP status: ' + response.status + ')');

    }

    function getAllReaders() {
      // logger.output('getting all readers');
      var readersArray = [
        {
          reader_id: 1,
          name: "Marie",
          weeklyReadingGoal: 315,
          totalMinutesRead: 5600
        },
        {
          reader_id: 2,
          name: "Daniel",
          weeklyReadingGoal: 210,
          totalMinutesRead: 3000
        },
        {
          reader_id: 3,
          name: "Lanier",
          weeklyReadingGoal: 140,
          totalMinutesRead: 600
        }
      ];
      var deferred = $q.defer();
      //deferred object can send resolve/reject and also during the execution is going on.

      $timeout(function() {
        deferred.resolve(readersArray);
      }, 1500);

      return deferred.promise;
    }
  }

  // dataService.$inject = ['logger'];
})();
