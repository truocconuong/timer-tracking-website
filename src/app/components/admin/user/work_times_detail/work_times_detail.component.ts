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
