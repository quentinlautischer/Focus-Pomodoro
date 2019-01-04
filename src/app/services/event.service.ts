import { Injectable, Output, EventEmitter } from '@angular/core';
import { EventModel } from '../models/EventModel';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from '../services/modal.service';

@Injectable()
export class EventService {

  constructor(private modalService: ModalService){
  }

  @Output() event: EventEmitter<EventModel> = new EventEmitter();

  publishEvent(event: EventModel) {
    this.event.emit(event);
  }

  publishEventGetInfo(event: EventModel){
      this.modalService.open(event);
  }
}