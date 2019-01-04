import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { AgGridModule } from 'ag-grid-angular';

import { NotificationService } from './services/notification.service';
import { EventService } from './services/event.service';
import { ModalService } from './services/modal.service';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list.component';
import { TitleComponent } from './components/title.component';
import { FocusComponent } from './components/focus.component';
import { StrikesComponent } from './components/strikes.component';
import { TimerComponent } from './components/timer.component';
import { GridComponent } from './components/grid.component';
import { ModalComponent } from './components/modal.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AgGridModule.withComponents([]), ToastyModule.forRoot() ],
  declarations: [ AppComponent, ListComponent, TitleComponent, FocusComponent, StrikesComponent, TimerComponent, GridComponent, ModalComponent ],
  providers: [ NotificationService, EventService, ModalService ],
  bootstrap:    [ AppComponent ]
})


export class AppModule { }
