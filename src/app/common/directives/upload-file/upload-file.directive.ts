import { Directive, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { ApiService } from '../../../api/api.service';
import { NotificationService } from './../../../common/services/notification/notification.service';

import * as _ from 'lodash';
// set global $
declare const $: any;
import * as moment from 'moment';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uploadImage]'
})
export class UploadFileDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('accept')
  accept: string;
  // tslint:disable-next-line:no-input-rename
  @Input('uploadImage')
  uploadImage: any;
  // tslint:disable-next-line:no-input-rename
  @Input('inProgress')
  inProgress: any;
  // tslint:disable-next-line:no-input-rename
  @Input('subProgress')
  subProgress: any;
  // tslint:disable-next-line:no-input-rename
  @Input('subError')
  subError: any;
  // tslint:disable-next-line:no-input-rename
  @Input('allowMaxSize')
  allowMaxSize: any;
  // tslint:disable-next-line:no-input-rename
  @Input('type')
  type: any;
  // tslint:disable-next-line:no-input-rename
  @Input('uploadPath')
  uploadPath: any;
  // tslint:disable-next-line:no-input-rename
  @Input('parent_model')
  parent_model: any;
  // tslint:disable-next-line:no-input-rename
  @Input('model')
  model: any;
  // tslint:disable-next-line:no-input-rename
  @Input('multiple')
  multiple: any;

  files;
  number_file_upload_success = 0;
  response_data;
  valid_extensions;

  // tslint:disable-next-line:no-output-rename
  @Output('onComplete')
  onComplete = new EventEmitter();
  // tslint:disable-next-line:no-output-rename
  @Output('onError')
  onError = new EventEmitter();

  constructor(private el: ElementRef, private api: ApiService, private notification: NotificationService) {}

  ngOnInit() {
    let $this = this;

    if (!_.isUndefined(this.accept)) {
      this.valid_extensions = this.accept.split('|');
    }

    $(this.el.nativeElement).click(() => {
      if (this.inProgress[this.subProgress] !== true) {
        let input = document.createElement('input');
        input.type = 'file';
        if (!_.isNil(this.multiple) && this.multiple === 'true') {
          input.multiple = true;
        }
        $(input).trigger('click');
        $(input).on('change', event => {
          this.number_file_upload_success = 0;
          this.files = input.files;

          if (this.files.length > 1) {
            this.response_data = [];
            _.forEach(this.files, function(file) {
              $this.validateFile(file);
            });
          }
          if (this.files.length === 1) {
            this.validateFile(this.files[0]);
          }
        });
      }
    });
  }

  getFileExtension(file) {
    return file.name.split('.').pop();
  }

  validateFile(file) {
    if (file !== undefined) {
      if (!_.isNil(this.allowMaxSize) && this.allowMaxSize !== '') {
        if (file.size > parseFloat(this.allowMaxSize) * 1024 * 1024) {
          this.notification.show('warning', `Please select file less than ${this.allowMaxSize}MB`, 5000);
          return false;
        }
      }
      if (!_.isUndefined(this.accept) && _.isUndefined(_.find(this.valid_extensions, item => item.toLowerCase() === this.getFileExtension(file).toLowerCase()))) {
        this.notification.show('warning', `Please select a file with valid type`, 5000);
        return false;
      }
      this.upload(file);
    }
  }

  upload(file) {
    let $this = this;
    this.inProgress[this.subProgress] = true;
    this.inProgress[this.subError] = false;

    let params = {
      files: file
    };
    this.api.file.upload(params).subscribe(
      response => {
        this.inProgress[this.subProgress] = false;
        this.number_file_upload_success++;
        this.bindingData(response);
      },
      error => {
        this.inProgress[this.subProgress] = false;
        this.inProgress[this.subError] = true;
        if (this.onError.observers.length) {
          this.onError.emit({
            error: error
          });
        }
      }
    );
  }

  bindingData(response) {
    if (this.onComplete.observers.length) {
      this.onComplete.emit({
        response: response
      });
    }
  }
}
