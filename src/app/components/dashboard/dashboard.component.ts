import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../api/api.service";
import { FormControl } from "@angular/forms";
import _ from 'lodash'
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public formControl = new FormControl(new Date());
  public today = new Date();
  public processing: boolean = false;
  public started: boolean = false;
  public started_at: null | Date;
  public diff: number;
  public formated_diff_time: string = '00:00:00';
  public sessions: any[];
  public pagination: any;

  constructor() {

  }

  ngOnInit() {

  }
  diffSessionInSec(session) {
    return Math.floor(((new Date(session.checkout) as any) - (new Date(session.checkin) as any)) / 1000);
  }

  formatedSessionDiffTime(session) {
    return this.stringToHHMMSS(this.diffSessionInSec(session));
  }

  total(sessions) {
    const diff = _.sumBy(sessions, (item) => this.diffSessionInSec(item));
    return this.stringToHHMMSS(diff);
  }

  start(): void {
  }

  stop(): void {
  }


  stringToHHMMSS = function(str: any) {
    const sec_num = parseInt(str, 10);
    let hours: any = Math.floor(sec_num / 3600);
    let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    let seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };
}
