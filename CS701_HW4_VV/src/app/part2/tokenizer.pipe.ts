import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokenizer',
})
export class TokenizerPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let delimiter = args;
    let returnRes: string = '';

    for (let i = 0; i < value.length; i++) {
      if (delimiter == null) {
        delimiter = ',';
      }
      returnRes = returnRes + value[i] + delimiter;
    }
    return returnRes;
  }
}




import { Component, OnInit } from '@angular/core';    
@Component({   
   selector: 'app-pip-edemo',   
   templateUrl: '.pipe-demo.component.html',  
   styleUrls: ['.pipe-demo.component.css']  
})  
export class PipeDemoComponent implements OnInit {    

   names: Array<string>;          

   constructor() { }          

   ngOnit() {       
    this.names =             
       ['Bill Russell', 'Michael Jordan', 'Larry Bird'];    
    }  
}
