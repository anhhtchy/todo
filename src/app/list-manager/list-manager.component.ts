import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-list-manager',
  template: `
    <div class="todo-app">
      <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

      <ul *ngIf="todoList | async as todoItems">
        <li *ngFor="let todoItem of todoItems">
          <app-todo-item 
            [item]="todoItem" 
            (remove)="removeItem($event)"
            (update)="updateItem($event.item, $event.changes)">
          </app-todo-item>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
  todoList!: Observable<TodoItem[]>;

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoList = this.todoListService.getTodoList();
  }

  addItem(title: string): void {    
    this.todoListService.addItem({ title });
  }

  removeItem(item: TodoItem): void {
    this.todoListService.deleteItem(item);
  }

  updateItem(item: TodoItem, changes: any) {
    this.todoListService.updateItem(item, changes);
  }
}
