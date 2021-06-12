import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <input #inputElementRef 
          class="todo-input"
          [placeholder]="placeholder"
          [value]="title ? title : ''"
          (keyup.enter)="submitValue(inputElementRef)">
    <button class="btn"
            (click)="submitValue(inputElementRef)">
        Save
    </button>
  `,
  styleUrls: ['./input-button-unit.component.scss']
})
export class InputButtonUnitComponent implements OnInit {
  @Input() title!: string;
  @Output() submit: EventEmitter<string> = new EventEmitter<string>();
  placeholder = 'Input your task here!';

  constructor() { }

  ngOnInit(): void {
  }

  submitValue(inputElementRef: any) {
    this.submit.emit(inputElementRef.value);
    inputElementRef.value = "";
  }
}
