import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemslistService } from '../itemslist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemsList = [];
  selectedItems = [];
  itemText: string = "";
  btnAddText: String = "Add";
  btnDoneText: String = "Done";
  isCheckAllCheckboxChecked:Boolean = false;
  @ViewChildren('cbx') checkboxes;
  @ViewChild("mainCbx") selectAllCbx;

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

  removeItem(index) {
    if(index >= 0 && index < this.itemsList.length) {
      var item = this.itemsList[index];
      if(this.selectedItems.includes(item)){
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
      this.itemsList.splice(index, 1);
      this._items.changeItem(this.itemsList);
    }
  }

  selectAllItems(event) {
    if(event.target.checked){
      for(var i = 0; i < this.itemsList.length; i++){
        if(!this.selectedItems.includes(this.itemsList[i])) {
          this.selectedItems.push(this.itemsList[i]);
        }
      }
      this.changeCheckboxStates(true);
    }
    else{
      this.selectedItems.splice(0, this.selectedItems.length);
      this.changeCheckboxStates(false);
    }
  }

  selectItem(event, index) {
    if(event.target.checked){
      if(!this.selectedItems.includes(index)) {
        this.selectedItems.push(index);
        event.target.checked = true;
      }
    }
    else {
      var itemIndex = this.selectedItems.indexOf(this.itemsList[index]);
      if(itemIndex > -1) {
        this.selectedItems.splice(itemIndex, 1);
      }
    }
  }

  deleteAllSelectedItems() {
    for(var i = 0; i < this.selectedItems.length; i++){
      this.itemsList.splice(this.selectedItems[i], 1);
    }
    this.selectedItems.splice(0, this.selectedItems.length);
    this._items.changeItem(this.itemsList);
    this.selectAllCbx.nativeElement.checked = false;
  }

  changeCheckboxStates(state:Boolean){
    this.checkboxes.toArray().forEach(element => {
      element.nativeElement.checked = state;
    });
  }
}