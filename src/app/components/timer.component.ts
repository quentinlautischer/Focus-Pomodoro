import { Component, Input, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventModel } from '../models/eventModel';

@Component({
  selector: 'timer-component',
  template: `
    <div id="circle" (click)="click()">
      <div (click)="$event.stopPropagation()">
        <span id="circle-inner" (click)="click()" [class.blue]="isBreakMode()" [class.green]="!isBreakMode()" [style.height.%]="fillHeight"></span>
        <span></span>
        <br/>
        <span id="timer-label" (click)="modeClick()">{{mode}}</span>
        <br/>
        <i class="fa fa-lg" [class.fa-business-time]="mode === 'session'" [class.fa-coffee]="mode === 'break'" aria-hidden="true"></i>
        <br/>
        <title-component [width]="100" [name]="timeLeft()" (talk)="workTimeChanged($event)"></title-component>
      </div>
    </div>
    `,
    styles: [
    `.header { font-size: 30px; }`,
    `#circle {
      position: relative;
      text-align: center;
      vertical-align: middle;
      z-index: 0;
      height: 300px;
      width: 300px;
      border: 2px solid #333;
      border-radius: 50%;
      overflow: hidden;
      padding-top: 20px;
      margin-top: 20px;
    }
    `,
    `#circle-inner {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: -1;
    }`,
    `.float-right {
      margin-right: 0px;
      float: right;
    `,
    `.float-left {
      margin-left: 0px;
      float: left:
    }`,
    `.green {
      background: rgb(40, 167, 69);
      color: rgb(40, 167, 69);
    }`,
    `.blue {
      background: rgb(40, 69, 167);
      color: rgb(40, 69, 167);
    }
    `,
    `#timer-label {
      display: inline-block;
      font-size: 50px;
      text-transform: capitalize;
    }
    i {
      display: inline;
    }
    `
    ]
})

export class TimerComponent  {
  sessionTime: number = 45;
  breakTime: number = 10;
  workTime: number = this.sessionTime;
  mode: string = "session";
  currentTime: Date = new Date();
  startTime: Date = new Date();
  timerStarted: boolean = false;
  fillHeight: number = 30;

  constructor(private eventService: EventService) {
    this.clearTimeouts();
    this.update();
    this.fillHeight = 100;
  }

  setBreak() {
    this.mode = "break";
    this.workTime = this.breakTime;
    this.startTime = new Date();
    this.currentTime = new Date();
    this.timerStarted = false;
    this.fillHeight = 100;
  }

  setSession() {
    this.mode = "session";
    this.workTime = this.sessionTime;
    this.startTime = new Date();
    this.currentTime = new Date();
    this.timerStarted = false;
    this.fillHeight = 100;
  }

  modeClick() {
    if (this.mode === "session") {
      if (this.secondsLeft() !== (this.sessionTime*60))
      this.eventService.publishEvent(new EventModel("Session Ended", "", "SessionEnded"))
      this.setBreak();
    } else if (this.mode === "break") {
      this.setSession();
    }
  }

  restart() {
    this.setSession();
  }

  workTimeChanged(e: string) {
    console.log("Work Time Changed " + e);
    var time = parseInt(e);
    if (this.mode == 'session') {
      this.sessionTime = time;
      this.setSession();
    } else if (this.mode == 'break') {
      this.breakTime = time;
      this.setBreak();
    }
  }

  sessionTimeChanged(e: string) {
    console.log("Session Time Changed " + e);
    this.sessionTime = parseInt(e);
    this.restart();
  }

  breakTimeChanged(e: string) {
    console.log("Break Time Changed " + e);
    this.breakTime = parseInt(e);
    this.restart();
  }

  update() {
    if (this.timerStarted){
      if (this.secondsLeft() < 0){
        if (this.mode === "session"){
          this.eventService.publishEventGetInfo(new EventModel("Session Completed", "", "SessionComplete"))
          this.mode = "break";
          this.workTime = this.breakTime;
          this.startTime = new Date();
        } else {
          this.mode = "session";
          this.workTime = this.sessionTime;
          this.startTime = new Date();
          this.eventService.publishEvent(new EventModel("Session Started", "", "SessionStart"))
        }
      }
      this.currentTime = new Date();
      this.fillHeight = this.percentFilled();
    }
    window.setTimeout(() => this.update(), 500);
  }

  clearTimeouts() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
  }

  isBreakMode() {
    return this.mode === "break";
  }
 
  percentFilled() {
    var secondsLeft = this.secondsLeft();
    return (((this.workTime*60) - secondsLeft)/(this.workTime*60))*100;
  }

  secondsLeft() {
    var secondsFromStart = (this.currentTime.getTime() - this.startTime.getTime())/1000;
    var workTimeSeconds = this.workTime * 60;
    return workTimeSeconds - secondsFromStart;
  }

  timeLeft() {
    var secondsLeft = this.secondsLeft();
    if (secondsLeft < 0){
      secondsLeft = 0;
    }
    return this.secondsToHms(secondsLeft);
  }

  click() {
    this.startTime = new Date();
    this.currentTime = new Date();
    this.timerStarted = !this.timerStarted;
    this.fillHeight = 100;
    if (this.mode === 'session') {
      this.eventService.publishEvent(new EventModel("Session Started", "", "SessionStart"));
    }
  }


  
  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
  
}