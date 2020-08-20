import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FETCH_ALL_USER_REQUESTED, updateUserStatusRequested } from './list.actions';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { BaseComponent } from '../../../base.component';
import { removeUserRequested } from '../edit/edit.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Admin.User.list';
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
          type: FETCH_ALL_USER_REQUESTED,
          data: this.queryParser.get(['sort', 'constraints', 'page', 'search']),
          com: USER_COMP
        });
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  changeUserStatus(item) {
    this.dispatch(updateUserStatusRequested({ id: item.getId(), status: item.status }));
  }

  removeUser(item) {
    this.dispatch(removeUserRequested({ id: item.id }));
  }

  mapStateToProps(state) {
    return {
      payload: state.Admin.User.list
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
