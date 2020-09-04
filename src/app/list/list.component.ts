import { Component, OnInit } from '@angular/core';
import { ItemslistService } from '../itemslist.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  itemsList:any;
  listTitle: string = "My List"

  constructor(private _items:ItemslistService) { }

  ngOnInit(): void {
    this._items.item.subscribe(i => this.itemsList = i);
    this._items.changeItem(this.itemsList);
  }
}