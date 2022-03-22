import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

let personId = 0;

class FormField {
  public id: number;
  constructor(
    public name: string,
    public type: string,
    public content: string
  ) {
    this.id = personId++;
  }
}

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
    new FormField(
      'Form Field',
      'many2class',
      '<p class="many2class">new text 03</p>'
    ),
    new FormField(
      'Radio Button',
      'textblock',
      '<p class="many2class">new text 02</p>'
    ),
    new FormField(
      'Text Area',
      'image',
      '<p class="many2class">new text 01</p>'
    ),
  ];

  public many2 = [
    new FormField(
      'Text Area',
      'image',
      '<p class="many2class">new text 04</p>'
    ),
    new FormField(
      'Date Picker',
      'image',
      '<p class="many2class">new text 05</p>'
    ),
    new FormField(
      'Drop Down',
      'image',
      '<p class="many2class">new text 06</p>'
    ),
  ];

  private _shadow: any;
  private _shadowInnerHTML: string = 'test';

  private _subs = new Subscription();
  constructor(private _dragulaService: DragulaService) {
    this._subs.add(
      this._dragulaService.dragend(this.MANY_ITEMS).subscribe(({ el }) => {
        // let element = document.getElementById('unique_id');

        // element?.remove();
        this._shadow.innerHTML = this._shadowInnerHTML;
        el.className = '';
        console.log('dragend');
        console.log(this._shadowInnerHTML);
      })
    );
    this._subs.add(
      this._dragulaService.drag(this.MANY_ITEMS).subscribe(({ el }) => {
        console.log('drag');
        this._shadow = el;
        this._shadowInnerHTML = el.innerHTML;
      })
    );

    // this._subs.add(
    //   this._dragulaService.shadow(this.MANY_ITEMS).subscribe(({ el }) => {
    //     if (!this._shadow) {
    //       this._shadow = this.makeElement();
    //       // this._shadow.classList.add('gu-transit');
    //       this._shadow.classList.add('shadow');
    //     }
    //     // el.style.display = 'none';
    //     // el.classList.add('shadow');
    //     el.parentNode?.insertBefore(this._shadow, el);
    //     // console.log('el');
    //     // console.log(el.style);
    //   })
    // );

    this._subs.add(
      this._dragulaService.shadow(this.MANY_ITEMS).subscribe(({ el }) => {
        console.log('shadow');
        el.className = 'drop-here';
        el.innerHTML = 'shadow test';
      })
    );

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
      // copyItem: (item) => {
      //   return item;
      // }, //Allow item to be coppied in another div
      copyItem: (formField: FormField) => {
        return new FormField(formField.name, formField.type, formField.content);
      },
      removeOnSpill: true,
      // removeOnSpill: false,
    });
  }

  ngOnInit(): void {
    console.log('HomeComponent');
  }

  public makeElement() {
    let newNode = document.createElement('div');

    newNode.textContent = 'Drop Here';
    newNode.classList.add('elem');
    newNode.setAttribute('id', 'unique_id');
    return newNode;
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('VAMPIRES');
    this._subs.unsubscribe();
  }
}
