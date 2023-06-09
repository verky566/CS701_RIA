angular.module("cartApp").component("cartList", {
  templateUrl: "cart-list/cart-list.template.html",
  controller: function CartListController() {
    let undoButton = document.getElementById("undo_id");
    let redoButton = document.getElementById("redo_id");

    //undo&redo variables
    this.undoItem = [];
    this.restoreItem = [];

    undoButton.disabled = true;
    redoButton.disabled = true;

    if (localStorage.getItem("villagomez_cart") === null) {
      this.defaultBooks = [
        { title: "Absolute Java", qty: 1, price: 114.95 },
        { title: "Pro HTML5", qty: 2, price: 27.95 },
        { title: "Head First HTML5", qty: 1, price: 27.89 },
      ];
    } else {
      this.defaultBooks = JSON.parse(localStorage.villagomez_cart);
    }

    this.removeBook = function (index) {
      this.undoItem = this.defaultBooks.slice();
      this.defaultBooks.splice(index, 1);
      undoButton.disabled = false;
    };

    this.addBook = function () {
      this.undoItem = this.defaultBooks.slice();
      // this adds the increment to the book title
      const newBookIndex = this.defaultBooks.length + 1;

      this.bookEntry = {
        title: `New Book ${newBookIndex}`,
        qty: 1,
        price: 6.98,
      };
      this.defaultBooks.push(this.bookEntry);
      undoButton.disabled = false;
    };

    this.saveBooks = function () {
      localStorage.setItem("villagomez_cart", JSON.stringify(this.defaultBooks));
    };

    this.updateTotal = function () {
      let totalAmt = 0;
      for (let i = 0; i < this.defaultBooks.length; i++) {
        totalAmt += this.defaultBooks[i].qty * this.defaultBooks[i].price;
      }
      return totalAmt;
    };
    //Add Undo/Redo Here
    this.undoStack = function () {
      this.restoreItem = this.defaultBooks.slice();
      this.defaultBooks = this.undoItem;
      document.getElementById("redo_id").disabled = false;
      redoButton.disabled = false;
    };
    this.redoStack = function () {
      this.defaultBooks = this.restoreItem;
    };
  },
});
