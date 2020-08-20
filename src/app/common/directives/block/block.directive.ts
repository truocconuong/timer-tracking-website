import { NotificationService } from './../../services/notification/notification.service';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBlock]'
})
export class BlockDirective {

  constructor(public notification: NotificationService, public el: ElementRef) { }

  @HostListener('click', ['$event']) onClick(e: any) {
    this.notification.show('warning', 'This feature is developing', 3000);
    e.preventDefault();
  }

}
