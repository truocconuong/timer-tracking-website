import { Injectable } from "@angular/core";

import * as $ from "jquery";
import * as _ from "lodash";

@Injectable()
export class NotificationService {
  constructor() {}
  scrollTop() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      500
    );
  }
  show(type: string, content: string, time: number = 0, st: boolean = false) {
    if (!_.isUndefined(st) && st) {
      this.scrollTop();
    }

    this.remove();
    const notify = document.createElement("div");
    notify.id = "nf-notify";
    notify.className = "notify notify-" + type;
    let icon;
    if (type === "warning") {
      icon = "warning";
    }
    if (type === "success") {
      icon = "check";
    }
    if (type === "barcode-scanner") {
      icon = "barcode";
    }
    const html = `<div class="notify-container"><i class="fa fa-${icon}"></i><span class="notify-message">${content}</span><i class="fa fa-close"></i></div>`;
    // html = $compile(angular.element(html))($rootScope);
    $(notify).append(html);
    $("body").prepend(notify);
    $(notify).animate(
      {
        height: 40
      },
      500
    );
    if (time && time > 0) {
      setTimeout(function() {
        $(notify).animate(
          {
            height: 0
          },
          250
        );
      }, time);
    }
    $(notify)
      .find(".fa-close")
      .click(function() {
        if ($("body").find("#nf-notify").length) {
          $("#nf-notify").remove();
        }
      });
  }
  remove() {
    if ($("body").find("#nf-notify").length) {
      $("#nf-notify").remove();
    }
  }
}
