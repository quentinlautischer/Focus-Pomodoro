import { Component, Input } from '@angular/core';


@Component({
  selector: 'list',
  template: `
    <title-component name="A List"></title-component>
    <br/>
    <br/>
    <form (ngSubmit)="newItemSubmit(newItem)">
    <input placeholder="Add Item" [(ngModel)]="newItem"/>
    <input type="submit" />
    </form>
    <ul><li *ngFor="let item of items">{{item}}</li></ul>
    `
})

export class ListComponent  {
  @Input() model: string;
  @Input() name: string;
  title: String = "List"
  newItem: String = null;
  items: String[] = ["item1", "Item2"]

  newItemSubmit(item) {
    this.items.push(item);
    this.newItem = "";
  };
}