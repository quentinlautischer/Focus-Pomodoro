import { Component, Output, Input, ViewChild, Renderer2, ElementRef, EventEmitter } from '@angular/core';


@Component({
  selector: 'title-component',
  template: `
    <div>
      <span class="header" [hidden]="editMode" (mouseenter)="mouseEnter()" (mouseleave)="mouseLeave()" (click)="toggleEditMode()">{{name}}</span>
      <span [hidden]="editMode || !isMouseHover()" (click)="toggleEditMode()" (mouseenter)="mouseEnter()" (mouseleave)="mouseLeave()"><i class="fa fa-pencil-alt fa-lg" aria-hidden="true"></i></span>
      <form [hidden]="!editMode" >
        <input [style.width.px]="width" autofocus [(ngModel)]="newTitleValue" name="newTitleInput" id="editInput" />
        <button [hidden]="true" type="submit" (click)="setTitle()">Set</button>
      </form>
    </div>
    `,
    styles: [`
    .header { 
      font-size: 50px; 
    }

    input {
      height: 50px;
      margin-top: 13px;
      margin-bottom: 12px; 
      font-size: 25px;
      text-align: center;
    }

    i {
      margin-left: 10px;
    }
    `]
})

export class TitleComponent {
  @ViewChild('editInput')
  editInput: any;
  @Input() width: number = 350;

  @Input() name: string;
  newTitleValue: string;
  editMode: boolean = false;
  mouseHover: boolean = false;
  mouseEnter() {
    this.mouseHover = true;
  }

  mouseLeave() {
    this.mouseHover = false;
  }

  isMouseHover() {
    return this.mouseHover;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.newTitleValue = this.name;
    this.focus();
  };

  constructor(public renderer2: Renderer2, public elementRef: ElementRef) {}

  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  //yup....
  focus(){
    window.setTimeout(() =>
      {
        this.renderer2.selectRootElement('#editInput').focus();
      });
  }

  setTitle(){
    this.name = this.newTitleValue;
    this.toggleEditMode();
    this.talk.emit(this.name);
  }
}