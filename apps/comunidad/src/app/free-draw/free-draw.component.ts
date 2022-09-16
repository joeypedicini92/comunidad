import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { initializeCanvas } from './fabric';

@Component({
  selector: 'comunidad-free-draw',
  templateUrl: './free-draw.component.html',
  styleUrls: ['./free-draw.component.scss'],
})
export class FreeDrawComponent implements OnInit {
  value = 'Pencil';
  @ViewChild('canvas', { static: true })
  canvasEl!: ElementRef;
  constructor() {}

  ngOnInit(): void {
    initializeCanvas(this);
  }

  downloadImage() {
    debugger;
    const ext = 'png';
    const base64 = this.canvasEl.nativeElement.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement('a');
    link.href = base64;
    link.download = `eraser_example.${ext}`;
    link.click();
  }
}
