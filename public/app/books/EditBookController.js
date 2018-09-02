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
      EditBookController
    ]);

  function EditBookController($routeParams, books, $cookies, $cookieStore) {
    //console.log($routeParams.bookID);

    var vm = this;

    // Using the filter function available on arrays to find the book id that matches the book id coming from routeParams service
    // Since the filter function returns an array [0] returned to return the first element of the array
    vm.currentBook = books.filter(function(item) {
      return item.book_id == $routeParams.bookID;
    })[0];

    vm.setAsFavorite = function() {
        $cookies.favoriteBook = vm.currentBook.title;
    }

   $cookieStore.put('lastEdited', vm.currentBook);
  }
})();
