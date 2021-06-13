import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

// const todoListStorageKey = 'Todo_List';

// const defaultTodoList: TodoItem[] = [
//   { title: 'Task ví dụ' },
// ];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  // todoList!: TodoItem[];
  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();
  headers: HttpHeaders | { [header: string]: string | string[]; } | undefined;
  
  constructor(private storageService: StorageService,
      private http: HttpClient) {
    // console.log(this.storageService.getData(todoListStorageKey));
    // this.todoList =
    //   this.storageService.getData(todoListStorageKey) || defaultTodoList;
    this.retrieveListFromDataBase();
  }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => this.todoListSubject.next(response)
    );
  }

  getTodoList() {
    return this.todoListSubject.asObservable();
  }

  addItem(item: TodoItem) {
    // console.log(item);
    this.http.post('http://localhost:3000/items',
      {title: item.title, completed: item.completed || false},
      {headers: this.headers}).subscribe(
        () => this.retrieveListFromDataBase()
    );
  }

  updateItem(item: TodoItem, changes: any): void {
    this.http.put(`http://localhost:3000/items/${item._id}`,
      { ...item, ...changes },
      {headers: this.headers}).subscribe(
        () => this.retrieveListFromDataBase()
    );
  }

  deleteItem(item: TodoItem) {
    return this.http.delete(`http://localhost:3000/items/${item._id}`).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  // getTodoList(): TodoItem[] {
  //   return this.todoList;
  // }
  
  // saveList(): void {
  //   this.storageService.setData(todoListStorageKey, this.todoList);
  // }

  // addItem(item: TodoItem): void {
  //   this.todoList.push(item);
  //   this.saveList();
  // }

  // updateItem(item: TodoItem, changes: any): void {
  //   const index = this.todoList.indexOf(item);
  //   this.todoList[index] = { ...item, ...changes };
  //   this.saveList();
  // }

  // deleteItem(item: TodoItem): void {
  //   const index = this.todoList.indexOf(item);
  //   this.todoList.splice(index, 1);
  //   this.saveList();
  // }
}
