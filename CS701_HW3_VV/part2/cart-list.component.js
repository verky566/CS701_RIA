angular.module("cartApp").component("cartList", {
  templateUrl: "cart-list/cart-list.template.html",
  controller: function CartListController() {
    this.defaultBooks = [];
    var key = JSON.parse(localStorage.getItem("villagomez_cart"));

    if (key == "" || key == undefined) {
      this.defaultBooks = [
        { title: "Absolute Java", qty: 1, price: 114.95 },
        { title: "Pro HTML5", qty: 2, price: 27.95 },
        { title: "Head First HTML5", qty: 1, price: 27.89 },
      ];
    } else {
      var key = JSON.parse(localStorage.getItem("villagomez_cart"));
      this.defaultBooks = key;
    }

    this.removeBook = function (index) {
      this.defaultBooks.splice(index, 1);
    };

    this.addBook = function () {
      // this adds the increment to the took title
      let newBookIndex = this.defaultBooks.length + 1;
      this.defaultBooks.splice(this.defaultBooks.length, 0, {
        title: `New Book ${newBookIndex}`,
        qty: 1,
        price: 6.98,
      });
    };

    this.saveBooks = function () {
      localStorage.setItem("villagomez_cart", JSON.stringify(this.defaultBooks));
    };

    this.updateTotal = function () {
      var total = 0;
      angular.forEach(this.defaultBooks, function (value) {
        total += value.qty * value.price;
      });
      return total;
    };
  },
});
