import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { EventService } from '../services/event.service';
import { EventModel } from '../models/eventModel';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" [ngClass]="{'show': modalOpen}" (click)="closeModal()">
    <div class="modal-dialog" role="document" (click)="$event.stopPropagation()">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{header}}</h5>
        <button type="button" class="close" (click)="closeModal()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{{body}}</p>
        <div class="input-group">
          <textarea class="form-control" aria-label="With textarea" [ngModel]="comment" (ngModelChange)="commentChanged($event)"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" (click)="submitModal()">Update</button>
        <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
      </div>
    </div>
    </div>
  `,
  styles: [
    `
    .show {
      display: block;
      opacity: 1;
    }
    .modal {
      background-color: rgba(200, 200, 200, 0.7);
    }
    .modal-input {
      width: 100%;
    }
    .btn {
      margin-bottom: 0;
    }
    `,

  ]
})
//https://hemstreet.io/angular-2-reusable-modal-service/

export class ModalComponent implements OnInit {

  public modalOpen: boolean;

  public header: string = "Modal Header";
  public body: string = "Modal Text";

  comment: string = "";

  public event: EventModel;

  constructor(private modalService: ModalService, private eventService: EventService) { }

  ngOnInit() {
    this.modalService.getModal().subscribe((data) => {
        this.modalOpen = data['isShowing'] as boolean;
        this.event = data['event'] as EventModel;
        this.setHeader(this.event);
        this.setBody(this.event);
    });
  }

  commentChanged(event) {
    this.comment = event;
  }

  closeModal() {
    console.log("closing modal");
    this.modalService.close();
  }

  submitModal() {
    console.log("submit modal");
    this.event.comments = this.comment;
    this.comment = '';
    this.eventService.event.emit(this.event);
    this.modalService.close();
    
  }

  setHeader(event: EventModel) {
    if (event.activityType === "Strike") {
      this.header = "You Lost Focus";
    } else if (event.activityType === "Task") {
      this.header = "Task completed";
    } else if (event.activityType === "SessionComplete") {
      this.header = "Session Complete";
    } else {
      this.header = "Default modal header";
    }
  }

  setBody(event: EventModel) {
    if (event.activityType === "Strike") {
      this.body = "Explain what lost your focus";
    } else if (event.activityType === "Task") {
      this.body = "Describe the details of your completed task";
    } else if (event.activityType === "SessionComplete") {
      this.body = "Describe what you did the last session";
    } else {
      this.body = "Default modal body";
    }
  }
}