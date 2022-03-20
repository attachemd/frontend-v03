import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private _dragulaService: DragulaService) {
    _dragulaService.createGroup('VAMPIRES', {
      accepts: (el, target, source, sibling) => {
        console.log(!source?.classList.contains('top'));

        if (!source?.classList.contains('top')) return false;
        else return true;
      },
      copy: true,
    });
  }

  ngOnInit(): void {
    console.log('HomeComponent');
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('VAMPIRES');
  }
}
