import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
class InputMaskValue {
  newText: string;
  lastPosition: number;
  constructor(_newText: string, _lastPosition: number) {
    this.newText = _newText;
    this.lastPosition = _lastPosition;
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[inputMask]',
  providers: [NgModel]
})
export class InputMaskDirective implements AfterViewInit {
  private realValue = "";
  // tslint:disable-next-line:no-input-rename
  private untouch = true;
  onChange: any = () => { };
  @Input('inputMask') inputMaskText: string;

  constructor(private el: ElementRef, private ngModel: NgModel, private control: NgControl) {}

  ngAfterViewInit(): any {
    let subscription = this.ngModel.valueChanges.subscribe((value) => {
      if (this.untouch) {
        if (value) {
          this.realValue = this.parseMaskedValue(value, this.inputMaskText).newText;
          this.el.nativeElement.value = value;
        } else {
          this.realValue = "";
          this.el.nativeElement.value = this.inputMaskText;
        }
      }
      subscription.unsubscribe();
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.el.nativeElement.contains(event.target)) {
      if (this.inputMaskText) {
        let inputMaskValue: InputMaskValue;
        let inputField = this.inputMaskText.split("").filter(s => s === '_');
        if ("0123456789".indexOf(event.key) > -1 || event.key === 'Backspace') {
          if (this.untouch) {
            this.untouch = false;
          }
          if (event.key === 'Backspace') {
            this.realValue = this.realValue.substring(0, this.realValue.length - 1);
          } else {
            this.realValue += event.key;
          }
          if (inputField.length < this.realValue.length) {
            let diff = this.realValue.length - inputField.length;
            this.realValue = this.realValue.substring(0, this.realValue.length - diff);
          }
          inputMaskValue = this.checkMaskedValue(this.realValue, this.inputMaskText);
          this.el.nativeElement.value = inputMaskValue.newText;
          this.control.control.setValue(inputMaskValue.newText);
          this.setCaretPosition(this.el.nativeElement, inputMaskValue.lastPosition);
        }
      }
    }
  }
  checkMaskedValue(value: string, mask: string): InputMaskValue {
    let newText = "";
    let lastPosition = 0;
    let curLength = 0;
    let isLastPosition = false;
    for (let i = 0; i < mask.length; i++) {
      let curMask = mask[i];
      if (curMask === '_') {
        if (typeof value[curLength] !== 'undefined') {
          newText += value[curLength];
          curLength++;
        } else {
          newText += curMask;
          isLastPosition = true;
        }
      } else {
        newText += curMask;
      }
      if (!isLastPosition) {
        lastPosition++;
      }
    }
    return new InputMaskValue(newText, lastPosition);
  }
  parseMaskedValue(value: string, mask: string): InputMaskValue {
    let newText = '';
    for (let i = 0; i < mask.length; i++) {
      let curMask = mask[i];
      if (curMask === '_') {
        if (value[i]) {
          newText += value[i];
        }
      }
    }
    return new InputMaskValue(newText, value.length);
  }
  // reference from https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox
  setCaretPosition(el, caretPos) {
    if (el != null) {
      if (el.createTextRange) {
        let range = el.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        if (el.selectionStart) {
          el.focus();
          el.setSelectionRange(caretPos, caretPos);
        } else {
          el.focus();
        }
      }
    }
  }
}
