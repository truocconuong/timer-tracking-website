import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormControl } from '@angular/forms';
import { Store } from './../../store/store.module';
import _ from 'lodash';
import * as moment from 'moment';
import { CHECK_IN } from './../../store/action';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public formControl = new FormControl(new Date());
  public today = new Date();
  public processing: boolean = false;
  public started: boolean = false;
  public started_at;
  public inteval;
  public diff: number;
  public formated_diff_time: string = '00:00:00';
  public sessions: any[];
  public pagination: any;
  public store;
  constructor(store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {}
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

  start = () => {
    var minutesLabel = document.getElementById('minutes');
    var secondsLabel = document.getElementById('seconds');
    var totalSeconds = 0;
    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    this.inteval = setInterval(setTime, 1000);

    function pad(val) {
      var valString = val + '';
      if (valString.length < 2) {
        return '0' + valString;
      } else {
        return valString;
      }
    }

    this.started_at = moment();
    this.checkIn();
    this.toggleStarted();
  };
  checkIn() {
    const data = {
      checkin: this.started_at,
    };
    this.store.dispatch({ type: CHECK_IN, data });
  }
  toggleStarted() {
    this.started = !this.started;
  }
  stop(): void {
    clearInterval(this.inteval);
    this.toggleStarted();
  }

  stringToHHMMSS = function (str: any) {
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
