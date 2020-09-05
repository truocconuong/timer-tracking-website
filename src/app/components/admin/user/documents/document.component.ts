import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { BaseComponent } from '../../../base.component';
import { removeUserRequested } from '../edit/edit.actions';
import { FETCH_ALL_DOCUMENTS_REQUESTED } from './document.actions';

@Component({
  selector: 'app-list',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Admin.User.documents';
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
          type: FETCH_ALL_DOCUMENTS_REQUESTED
        });
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  removeUser(item) {
    this.dispatch(removeUserRequested({ id: item.id }));
  }

  showLink(url) {
    window.open(url, '_blank');
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
