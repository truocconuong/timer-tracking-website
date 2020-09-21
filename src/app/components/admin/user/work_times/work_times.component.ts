import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { USER_COMP } from '../user.const';
import * as _ from 'lodash';
import { BaseComponent } from '../../../base.component';
import { removeUserRequested } from '../edit/edit.actions';
import { FETCH_ALL_WORK_TIMES_REQUESTED } from './work_times.actions';
import { ExportService } from './../../../../../app/services/export.services';
import * as moment from 'moment';
import { work_times } from './work_times.reducer';
import { AppInjector } from '../../../../../app/app-injector';
import { NotificationService } from '../../../../../app/common/services/notification/notification.service';

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
  public exportService;
  public date_statistical = null;
  public search = {
    start: '',
    end: ''
  };
  constructor(private route: Router, exportSer: ExportService) {
    super();
    this.exportService = exportSer;
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

  changeUserStatus(item) {}

  removeUser(item) {
    this.dispatch(removeUserRequested({ id: item.id }));
  }

  geneareteLastCheckin(work_times) {
    const data = _.orderBy(work_times, ['id'], ['ASC']);
    const getFirstData = _.last(data);
    return getFirstData.checkin;
  }

  searchByDate() {
    console.log(this.search);
    if (this.search.start !== '' && this.search.end !== '') {
      this.dispatch({ type: FETCH_ALL_WORK_TIMES_REQUESTED, search: this.search });
    } else {
      AppInjector.get(NotificationService).show('warning', 'Bạn phải chọn đầy đủ thông tin');

      setTimeout(() => {
        AppInjector.get(NotificationService).remove();
      }, 3000);
    }
  }

  exportExceldata = (work_times) => {
    this.exportService.exportExcel(work_times, 'export');
  };

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
