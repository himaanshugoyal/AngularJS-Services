(function() {
  // Since the call to dataService is happening in the resolve so its no longer required to be injected into the controller from here.
  // However the property we declared on the resolve object will now be injected into the controller.
  angular
    .module("app")
    .controller("EditBookController", [
      "$routeParams",
      "books",
      "$cookies",
      "$cookieStore",
      "dataService",
      "$log",
      "$location",
      EditBookController
    ]);

  function EditBookController(
    $routeParams,
    books,
    $cookies,
    $cookieStore,
    dataService,
    $log,
    $location
  ) {
    //console.log($routeParams.bookID);

    var vm = this;

    // Using the filter function available on arrays to find the book id that matches the book id coming from routeParams service
    // Since the filter function returns an array [0] returned to return the first element of the array
    // vm.currentBook = books.filter(function(item) {
    //   return item.book_id == $routeParams.bookID;
    // })[0];

    dataService
      .getBookByID($routeParams.bookID)
      .then(getBookSuccess)
      .catch(getBookError);

    function getBookSuccess(book) {
      vm.currentBook = book;
      $cookieStore.put("lastEdited", vm.currentBook);
    }

    function getBookError(reason) {
      $log.error(reason);
    }

    vm.setAsFavorite = function() {
      $cookies.favoriteBook = vm.currentBook.title;
    };

    vm.saveBook = function() {
      dataService.updateBook(vm.currentBook)
         .then(updateBookSuccess)
         .catch(updateBookError);
    };

    function updateBookSuccess(message) {
      $log.info(message);
      $location.path("/");
    }

    function updateBookError(errorMessage) {
      $log.error(errorMessage);
  }
  }
})();
