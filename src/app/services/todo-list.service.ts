import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList: TodoItem[] = [
  { title: 'Task ví dụ' },
];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  todoList: TodoItem[];

  constructor(private storageService: StorageService) {
    console.log(this.storageService.getData(todoListStorageKey));
    this.todoList =
      this.storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  getTodoList(): TodoItem[] {
    return this.todoList;
  }
  
  saveList(): void {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  addItem(item: TodoItem): void {
    this.todoList.push(item);
    this.saveList();
  }

  updateItem(item: TodoItem, changes: any): void {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList();
  }

  deleteItem(item: TodoItem): void {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }
}
