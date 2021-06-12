import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item" *ngIf="!isEdited">
      <input type="checkbox" 
        class="todo-checkbox" 
        (click)="completeItem()" 
        [checked]="item.completed"/>
      <span 
          class="todo-title" 
          [ngClass]="{'todo-complete': item.completed}">
        {{ item.title }}
      </span>
      <button class="btn" (click)="editStatus()">Edit</button>
      <button class="btn btn-red" (click)="removeItem()">Remove</button>
    </div>
    <div *ngIf="isEdited">
      <app-input-button-unit (submit)="editItem($event)" [title]="item.title"></app-input-button-unit>
    </div>
  `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() item!: TodoItem;
  @Output() remove: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  isEdited: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  editStatus(): void {
    this.isEdited = true;
  }

  removeItem(): void {
    this.remove.emit(this.item);
  }

  completeItem(): void {
    this.update.emit({
      item: this.item,
      changes: {completed: !this.item.completed}
    });
  }

  editItem(title: string) {
    this.update.emit({
      item: this.item,
      changes: {title}
    });
    this.isEdited = false;
  }
}
