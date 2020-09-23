import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'app-list',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingComponent extends BaseComponent implements OnInit {
  public timer;
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    super();
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.timer = this.checkTimeNotAbove12(localStorage.getItem('timer'));
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  saveTime() {
    localStorage.setItem('timer', this.timer);
  }

  showLink(url) {
    window.open(url, '_blank');
  }

  checkTimeNotAbove12(date) {
    if (date.length < 5) {
      date = `0${date}`;
    }
    return date;
  }

  mapStateToProps(state) {
    return {
      payload: state.Admin.User.documents
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
