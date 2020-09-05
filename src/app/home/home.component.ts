import { Component, OnInit, ViewChildren } from '@angular/core';
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
  selectedItems = [];
  itemText: string = "Add item...";
  btnAddText: String = "Add";
  btnDoneText: String = "Done";
  isCheckAllCheckboxChecked:Boolean = false;
  @ViewChildren('cbx') checkboxes;

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
    if(this.itemsList.length > 0) {
      this._router.navigate(['./list']);
    }
  }

  removeItem(index) {
    if(index >= 0 && index < this.itemsList.length) {
      this.itemsList.splice(index, 1);
      this._items.changeItem(this.itemsList);
    }
  }

  selectAllItems(event) {
    if(event.target.checked){
      for(var i = 0; i < this.itemsList.length; i++){
        if(!this.selectedItems.includes(i)) {
          this.selectedItems.push(i);
        }
      }
      this.checkboxes.toArray().forEach(element => {
        element.nativeElement.checked = true;
      });
    }
    else{
      this.selectedItems.splice(0, this.selectedItems.length);
      this.checkboxes.toArray().forEach(element => {
        element.nativeElement.checked = false;
      });
    }
  }

  selectItem(event, index) {
    if(event.target.checked){
      event.target.checked = false;
      this.selectedItems.splice(this.selectedItems.indexOf(index), 1);
    }
    else {
      if(!this.selectedItems.includes(index)) {
        this.selectedItems.push(index);
        event.target.checked = true;
      }
    }
  }

  deleteAllSelectedItems() {
    for(var i = 0; i < this.selectedItems.length; i++){
      this.itemsList.splice(this.selectedItems[i], 1);
    }
    if(this.selectedItems.length > 0){
      this.selectedItems.splice(0, this.selectedItems.length);
    }
  }
}