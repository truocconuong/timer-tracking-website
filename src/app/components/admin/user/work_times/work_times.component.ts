import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { BaseComponent } from '../../../base.component';
import { removeUserRequested } from '../edit/edit.actions';
import { FETCH_ALL_WORK_TIMES_REQUESTED } from './work_times.actions';

@Component({
  selector: 'app-list',
  templateUrl: './work_times.component.html',
  styleUrls: ['./work_times.component.scss']
})
export class WorkTimesComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Admin.User.work_times';
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
  constructor(private route: Router) {
    super();
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.dispatch({
          type: FETCH_ALL_WORK_TIMES_REQUESTED
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


  mapStateToProps(state) {
    return {
      payload: state.Admin.User.work_times
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
