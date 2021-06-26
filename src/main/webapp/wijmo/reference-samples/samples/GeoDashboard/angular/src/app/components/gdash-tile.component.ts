import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gdash-tile',
  templateUrl: './gdash-tile.component.html',
})
export class GdashTileComponent {
  @Input() header: string;
  @Input() icon: any;
  @Output() tileClick = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  get path() {
    return this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }

  handleClick() {
    this.tileClick.emit();
  }
}
