import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comunidad-pill-list',
  templateUrl: './pill-list.component.html',
  styleUrls: ['./pill-list.component.scss'],
})
export class PillListComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() display = 'display';

  constructor() {}

  ngOnInit(): void {}

  removeItem(index: number) {
    this.items.splice(index);
  }
  clearAll() {
    this.items = [];
  }
}
