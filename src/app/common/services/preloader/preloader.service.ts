import { Injectable } from "@angular/core";

import * as $ from "jquery";

@Injectable()
export class PreloaderService {
  constructor() {}
  show() {
    if ($("#nf-preloader").length === 0) {
      // tslint:disable-next-line:prefer-const
      let preloader = $(
        '<div id="nf-preloader"><div class="nf-preloader-bg"><div class="progress"><div class="indeterminate"></div></div></div></div>'
      );
      $("body").append(preloader);
    }
  }
  hide() {
    if ($("#nf-preloader").length > 0) {
      $("#nf-preloader").remove();
    }
  }
}
