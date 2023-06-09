import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css'],
})
export class Part1Component implements OnInit {
  defaultBooks: Array<any>;
  total!: number;

  constructor() {
    let key = JSON.parse(
      window.localStorage.getItem('villagomez_cart') as string
    );
    if (key != null) {
      this.defaultBooks = key;
    } else {
      this.defaultBooks = [
        { title: 'Absolute Java', qty: 1, price: 114.95 },
        { title: 'Pro HTML5', qty: 2, price: 27.95 },
        { title: 'Head First HTML5', qty: 1, price: 27.89 },
      ];
    }
  }

  ngOnInit() {}

  removeBook(index: number) {
    this.defaultBooks.splice(index, 1);
  }

  addBook(): void {
    const newBookIndex = this.defaultBooks.length + 1;
    this.defaultBooks.splice(this.defaultBooks.length, 0, {
      title: `Book ${newBookIndex}`,
      qty: 1,
      price: 6.99,
    });
  }
  saveBooks(): void {
    window.localStorage.setItem(
      'villagomez_cart',
      JSON.stringify(this.defaultBooks)
    );
  }

  totalAmount(): number {
    this.total = 0;
    for (let i = 0; i < this.defaultBooks.length; i++) {
      this.total += this.defaultBooks[i].qty * this.defaultBooks[i].price;
    }
    return this.total;
  }
}
