import { OnInit, Input, AfterViewInit } from '@angular/core';
import { Directive, ElementRef, Renderer } from '@angular/core';

declare var jQuery: any;
declare var Switchery: any;

@Directive({
  selector: '[appInputSwitch]'
})
export class InputSwitchDirective implements OnInit, AfterViewInit {

  @Input() inputId: string;

  constructor(public el: ElementRef, public render: Renderer) { }

  ngOnInit() {}

  ngAfterViewInit() {
    const dom = document.getElementById(this.inputId);
    const switchery = new Switchery(dom, {
      size: 'small'
    });
  }

}
