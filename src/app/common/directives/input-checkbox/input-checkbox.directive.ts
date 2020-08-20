import { Directive, AfterViewInit, ElementRef, HostListener } from '@angular/core';

declare const jQuery: any;
declare const iCheck: any;

@Directive({
  selector: '[appInputCheckbox]'
})
export class InputCheckboxDirective implements AfterViewInit {
  constructor(public el: ElementRef) {}

  ngAfterViewInit() {
    jQuery(this.el.nativeElement).iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass: 'iradio_flat-green'
    });

    jQuery(this.el.nativeElement).on('ifClicked', e => {
      jQuery(this.el.nativeElement).click();
    });
  }
}
