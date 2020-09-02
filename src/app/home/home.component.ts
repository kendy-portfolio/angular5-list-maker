import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { ItemslistService } from '../itemslist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemsList = [];
  itemText: string = "Add item...";
  btnText: String = "Add";

  constructor(private _items:ItemslistService, private _router:Router) { 

  }

  ngOnInit(): void {
    this._items.item.subscribe(il => this.itemsList = il);
    this._items.changeItem(this.itemsList);
  }

  addItem() {
    if(this.itemText !== "") {
      this.itemsList.push(this.itemText);
      this.itemText = "";
      this._items.changeItem(this.itemsList);
    }
  }

  redirectToListPage() {
    this._router.navigate(['./list']);
  }

  removeItem(index) {
    if(index >= 0 && index < this.itemsList.length) {
      this.itemsList.splice(index, 1);
      this._items.changeItem(this.itemsList);
    }
  }
}