import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { EventModel } from '../models/eventModel';
import { ModalComponent } from '../components/modal.component';

@Injectable()
export class ModalService {
    isShowing = false;
    modal = new Subject();

    getModal() {
        return this.modal;
    }
    open(event: EventModel) {  
        this.isShowing = true;
        this.modal.next({isShowing: true, event: event});
    }
    close() {
        this.isShowing = false;
        this.modal.next({isShowing: false, event: {}});
    }
    closeModal() {
        this.close();
    }
}