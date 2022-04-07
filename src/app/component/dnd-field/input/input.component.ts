// https://stackoverflow.com/questions/34641281/how-to-add-class-to-host-element
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  // @HostBinding('class')
  // public readonly classList = 'dnd-host';

  public field: any = {};
  public group!: FormGroup;
  public visibility = 'none';

  // public isOngoing: boolean = false;

  constructor(private _dndFieldService: DndFieldService) {}
  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit(): void {
    console.log('InputComponent');
    // this.isOngoing = this.field.isOngoing;
    // this._dndFieldService.getIsOnGoing$().subscribe({
    //   next: (isOngoing: boolean) => {
    //     this.isOngoing = isOngoing;
    //   },
    //   error: (err: any) => {},
    // });
  }

  public updateVisibility(visibility: string): void {
    this._dndFieldService.setVisibility$(visibility);
  }
}
