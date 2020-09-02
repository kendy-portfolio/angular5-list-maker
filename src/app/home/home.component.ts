import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { ItemslistService } from '../itemslist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemsList = []

  constructor(private _items:ItemslistService) { 

  }

  ngOnInit(): void {
    this._items.item.subscribe(itemsList => this.itemsList = itemsList);
    this._items.changeItem(this.itemsList);
  }
}