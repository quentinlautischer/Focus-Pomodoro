import { Component, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventModel } from '../models/eventModel';
@Component({
  selector: 'focus',
  template: `<title-component name="Focus Item"></title-component>
             
             <button type="button" class="btn btn-success btn-block" (click)=taskCompleted()><i class="fa fa-check fa-lg" aria-hidden="true"></i>Complete Task</button>
  `,
  styles: [`h1 { font-family: Lato; } button { margin-top: 20px; } i { margin-right: 10px;}`]
})
export class FocusComponent  {
  @Input() name: string;

  constructor(private eventService: EventService){

  }

  taskCompleted(){
    this.eventService.publishEventGetInfo(new EventModel("Task Complete", "Task X Completed", "Task"));
  }
}
