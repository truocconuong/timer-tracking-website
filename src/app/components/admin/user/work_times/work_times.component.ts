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
  public start;
  public end;
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

  geneareteFirstCheckin(work_times) {
    const data = _.orderBy(work_times, ['id'], ['ASC']);
    const getFirstData = _.first(data);
    return getFirstData.checkin;
  }

  geneareteLastCheckout(work_times) {
    const data = _.orderBy(work_times, ['id'], ['ASC']);
    const getLastData = _.last(data);
    return getLastData.checkout;
  }

  exportExceldata = (users) => {
    const dateChuan = Number('9:00'.replace(':', ''));
    const dataExport = [];
    const muon = 'Muộn';
    const dungGio = 'Đúng giờ';
    const khongDiemDanh = 'Chưa checkin';
    const now = moment();
    for (const user of users) {
      const worktimes = user.work_times;
      if (_.isEmpty(worktimes)) {
        const data = {
          email: user.email,
          date : moment().format('DD/MM/YYYY'),
          type: khongDiemDanh
        };
        dataExport.push(data);
      } else {
        const check = _.filter(worktimes, (worktime) => moment(worktime.checkin).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY'));
        if (_.isEmpty(check)) {
          const data = {
            email: user.email,
            date : moment().format('DD/MM/YYYY'),
            type: khongDiemDanh
          };
          dataExport.push(data);
        } else {
          const first = _.orderBy(check, ['id'], ['ASC'])[0];
          let hours: any = moment(first.checkin).format('HH:mm');
          hours = Number(hours.replace(':', ''));
          let data: any = {
            email: user.email,
            date : moment().format('DD/MM/YYYY'),
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
