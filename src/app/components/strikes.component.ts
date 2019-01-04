import { Component, Input } from '@angular/core';
import { Strike } from '../models/strike.model';
import { NotificationService } from '../services/notification.service';
import { EventService } from '../services/event.service';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'strikes',
  template: `<div class="row" (click)=increment()><span class="col" *ngFor="let strike of strikes" [class.red]="strike.isEmpty"><i class="fa fa-heart" aria-hidden="true"></i></span></div>
  `,
  styles: [`span { 
              font-family: Futura;
              font-size: 100px;
              color: black;
              -webkit-text-fill-color: white; /* Will override color (regardless of order) */
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: black;
              }

          `,
          `.green {
              -webkit-text-fill-color: rgb(40, 167, 69);
          }
          `,
          `.red {
            -webkit-text-fill-color: rgb(167, 40, 69);
          }`,
          `.black {
            -webkit-text-fill-color: rgb(10, 10, 10);
          }`,
          `i {
            display: inline;
            margin-left: 10px;
          }
          `]
})

export class StrikesComponent  {
  strikes: Strike[] = [new Strike(true), new Strike(true), new Strike(true)];

  constructor(private notificationService: NotificationService, private eventService: EventService){
  }

  drawStrike(strike){
    if (strike.isEmpty){
      return '<i class="fa fa-pencil-alt fa-lg" aria-hidden="true"></i>';
    } else {
      return 'I'      
    }
  };

  increment() {
    // Do stuff here
    //this.notificationService.info("Strike Recorded", "Strike Recorded");
    this.eventService.publishEventGetInfo(new EventModel("Strike Recorded", "No Comment", "Strike"));
    // for (let s of this.strikes)
    for (var i = this.strikes.length; i-- > 0; )
    {
        if (!this.strikes[i].isEmpty){
          continue;
        } else {
          this.strikes[i].set();
          break;
        }
    }
  }
};
