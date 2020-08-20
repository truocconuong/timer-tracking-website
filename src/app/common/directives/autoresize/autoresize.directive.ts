import { OnInit, ElementRef, Host } from '@angular/core';
import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autoresize]'
})
export class AutoresizeDirective implements OnInit {
  @Input() autoresize: number;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {}

  ngOnInit(): void {
    this.adjust();
  }

  adjust(): void {
    let el = this.element.nativeElement;
    let newHeight;
    if (el) {
      el.style.overflow = 'hidden';
      el.style.height = 'auto';
      if (this.autoresize) {
        newHeight = Math.min(el.scrollHeight, this.autoresize);
      } else {
        newHeight = el.scrollHeight;
      }
      el.style.height = newHeight + 'px';
    }
  }
}
