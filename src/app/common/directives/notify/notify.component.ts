import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  @Output() notify = new EventEmitter<string>();

  public key = '';

  constructor() {}

  ngOnInit() {}

  onClick(): void {
    this.notify.emit(this.key);
  }
}
