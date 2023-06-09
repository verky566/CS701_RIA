import { Component, OnInit } from '@angular/core';
// need to import "OnInit" to use ngOnInit() method

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css'],
})
//create variables for input and delimiter - any type
export class Part2Component implements OnInit {
  input: any;
  delimiter: any;

  constructor() {
    this.input = 'Angular is awesome';
    this.delimiter = '#';
  }
  ngOnInit(): void {}
}
