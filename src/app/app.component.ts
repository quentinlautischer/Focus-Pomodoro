import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div class="container" >
    <div class="row align-items-center">
      <div class="col align-self-center">
        <div class="row">
          <focus></focus>
        </div>
        <div class="row align-items-end">
          <strikes></strikes>
        </div>
      </div>
      <div class="col align-self-start">
        <timer-component [style]="{'margin-top': '10px'}"></timer-component>
      </div>
    </div>
    <div class="row align-items-center">
      <grid-component></grid-component>
    </div>
  <ng2-toasty [position]="'bottom-center'"></ng2-toasty>
  <app-modal style="'margin': '0 auto'"></app-modal>
  </div>
  `,  
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  model: String = "This is my parent"; 
}
