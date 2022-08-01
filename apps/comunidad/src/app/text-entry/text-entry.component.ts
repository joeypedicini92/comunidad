import { Component } from '@angular/core';

@Component({
  selector: 'comunidad-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss'],
})
export class TextEntryComponent  {
  titleInput = '';
  textInput = '';

  constructor() {}

  onCreateClick() {
    console.log(this.titleInput, this.textInput);
  }
}
