import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { BaseComponent } from '../../../base.component';
import { removeUserRequested } from '../edit/edit.actions';
import { FETCH_DETAIL_WORK_TIMES_REQUESTED } from './work_times_detail.action';

@Component({
  selector: 'app-list',
  templateUrl: './work_times_detail.component.html',
  styleUrls: ['./work_times_detail.component.scss']
})
export class WorkTimesDetailComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Admin.User.work_times_detail';
  public activatedRoute ;
  public UserStatus = [
    {
      label: 'Pending',
      value: 0
    },
    {
      label: 'Activated',
      value: 1
    },
    {
      label: 'Banned',
      value: 2
    },
    {
      label: 'Deleted',
      value: 3
    }
  ];
  constructor(private route: Router,activeRoute: ActivatedRoute) {
    super();
    this.activatedRoute = activeRoute
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log(this.activatedRoute)
        this.dispatch({
          type: FETCH_DETAIL_WORK_TIMES_REQUESTED,
          id : this.activatedRoute.snapshot.params.id
        });
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  changeUserStatus(item) {
  }

  removeUser(item) {
    this.dispatch(removeUserRequested({ id: item.id }));
  }

  geneareteFirstCheckin(work_times){
    const data = _.orderBy(work_times,['id'],['ASC']);
    const getFirstData = _.first(data);
    return getFirstData.checkin;

  }

 geneareteLastCheckout(work_times){
  const data = _.orderBy(work_times,['id'],['ASC']);
  const getLastData = _.last(data);
  return getLastData.checkout;
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


  mapStateToProps(state) {
    return {
      payload: state.Admin.User.work_times_detail
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
