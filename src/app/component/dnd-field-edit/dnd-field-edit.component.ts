import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dnd-field-edit',
  templateUrl: './dnd-field-edit.component.html',
  styleUrls: ['./dnd-field-edit.component.scss'],
})
export class DndFieldEditComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('DndFieldEditComponent');
  }

  public show() {
    alert('Hi!');
  }
}
