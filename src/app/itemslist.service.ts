import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ItemslistService {
  private items = new BehaviorSubject<any>([]);
  item = this.items.asObservable();

  constructor() { }

  changeItem(item) {
    this.items.next(item);
  }
}