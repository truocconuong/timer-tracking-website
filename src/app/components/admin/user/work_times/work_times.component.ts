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

  exportExceldata = (users) => {
    const dateChuan = Number('8:00'.replace(':', ''));
    const dataExport = [];
    const muon = 'Muộn';
    const dungGio = 'Đúng giờ';
    const khongDiemDanh = 'Chưa checkin';
    if (!_.isNil(this.date_statistical)) {
      const now = moment(this.date_statistical);
      for (const user of users) {
        const worktimes = user.work_times;
        if (_.isEmpty(worktimes)) {
          const data = {
            email: user.email,
            date: now.format('DD/MM/YYYY'),
            type: khongDiemDanh
          };
          dataExport.push(data);
        } else {
          const check = _.filter(worktimes, (worktime) => moment(worktime.checkin).format('DD/MM/YYYY') === now.format('DD/MM/YYYY'));
          if (_.isEmpty(check)) {
            const data = {
              email: user.email,
              date: now.format('DD/MM/YYYY'),
              type: khongDiemDanh
            };
            dataExport.push(data);
          } else {
            const first = _.orderBy(check, ['id'], ['ASC'])[0];
            let hours: any = moment(first.checkin).format('HH:mm');
            hours = Number(hours.replace(':', ''));
            let data: any = {
              email: user.email,
              date: now.format('DD/MM/YYYY'),
              time: moment(first.checkin).format('HH:mm')
            };
            if (hours > dateChuan) {
              data.type = muon;
            } else {
              data.type = dungGio;
            }
            dataExport.push(data);
          }
        }
      }
      this.exportService.exportExcel(dataExport, 'export');
    } else {
      AppInjector.get(NotificationService).show('warning', 'Bạn phải chọn ngày thống kê trước', 5000);
    }
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
