import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public left = [
    { name: 'one', id: 1 },
    { name: 'two', id: 2 },
    { name: 'three', id: 3 },
  ];

  public MANY_ITEMS = 'MANY_ITEMS';
  // public many = ['The', 'possibilities', 'are', 'endless!'];
  // public many2 = ['Explore', 'them'];
  public many = [
    {
      name: 'Form Field',
      type: 'many2class',
      content: '<p class="many2class">new text 03</p>',
      id: 1,
    },
    {
      name: 'Radio Button',
      type: 'textblock',
      content: '<p class="many2class">new text 02</p>',
      id: 2,
    },
    {
      name: 'Text Area',
      type: 'image',
      content: '<p class="many2class">new text 01</p>',
      id: 3,
    },
  ];

  public many2 = [
    {
      name: 'Text Area',
      type: 'image',
      content: '<p class="many2class">new text 04</p>',
      id: 1,
    },
  ];

  private _subs = new Subscription();
  constructor(private _dragulaService: DragulaService) {
    // this._subs.add(
    //   this._dragulaService.drop('VAMPIRES').subscribe(({ el }) => {
    //     this.addClass(el, "ex-moved");
    //   })
    // );

    this._subs.add(
      _dragulaService
        .dropModel(this.MANY_ITEMS)
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
          console.log('dropModel:');
          console.log(el);
          console.log(source);
          console.log(target);
          console.log(sourceModel);
          console.log(targetModel);
          console.log(item);
        })
    );
    this._subs.add(
      _dragulaService
        .removeModel(this.MANY_ITEMS)
        .subscribe(({ el, source, item, sourceModel }) => {
          console.log('removeModel:');
          console.log(el);
          console.log(source);
          console.log(sourceModel);
          console.log(item);
        })
    );
    this._dragulaService.createGroup(this.MANY_ITEMS, {
      accepts: (el, target, source, sibling) => {
        if (
          source?.classList.contains('bottom') &&
          target?.classList.contains('bottom')
        )
          return true;
        else if (!source?.classList.contains('top')) return false;
        else return true;
      },
      // copy: true,
      copy: (el, source) => {
        return source?.classList.contains('top');
        // return true;
      },
      copyItem: (item) => {
        return item;
      }, //Allow item to be coppied in another div
      removeOnSpill: true,
      // removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    console.log('HomeComponent');
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('VAMPIRES');
    this._subs.unsubscribe();
  }
}
