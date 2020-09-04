import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormControl } from '@angular/forms';
import { Store } from './../../store/store.module';
import _ from 'lodash';
import * as moment from 'moment';
import { CHECK_IN, CHECK_OUT, GET_ALL_WORKTIME_USER_REQUESTED, SCREEN_DESKTOP } from './../../store/action';
import { ElectronService } from 'ngx-electron';
import { AppInjector } from '../../../app/app-injector';
import { isElectron } from '../../api/auth/auth.service';
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
  public source = null;
  public interval_screen;
  constructor(store: Store, _electronService: ElectronService) {
    this.store = store.getInstance();

    if (isElectron()) {
      _electronService.desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async (sources) => {
        for (const source of sources) {
          if (source.name === 'Entire Screen') {
            this.source = source;
          }
        }
      });
    }
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
      const checker = totalSeconds;
      minutesLabel.innerHTML = pad(Math.floor(totalSeconds / 60));
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
    if (this.source !== null) {
      this.interval_screen = setInterval(this.screenDesktop, 20000);
    }
  };
  checkIn() {
    const data = {
      checkin: this.started_at
    };
    this.store.dispatch({ type: CHECK_IN, data });
  }
  toggleStarted() {
    this.started = !this.started;
  }
  stop() {
    clearInterval(this.inteval);
    clearInterval(this.interval_screen)
    this.toggleStarted();
    this.checkOut();
  }
  checkOut() {
    const data = {
      checkout: moment()
    };
    this.store.dispatch({ type: CHECK_OUT, data, user_id: this.store.getState().Auth.login.profile.id });
  }
  freeStyle = () => {};
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

  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  screenDesktop = () => {
    const base64data = this.source.thumbnail.toDataURL();
    const block = base64data.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];
    const blob = this.b64toBlob(realData, contentType);
    const form = document.createElement('form');
    const formDataToUpload = new FormData(form);
    formDataToUpload.append('files', blob, `${new Date().getTime()}.jpg`);
    this.store.dispatch({ type: SCREEN_DESKTOP, data: formDataToUpload });
    // const results = AppInjector.get(ApiService).work_times.upload(formDataToUpload).toPromise();
  };
}
