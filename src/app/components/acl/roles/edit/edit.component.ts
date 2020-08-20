import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from './../../../../store/store.module';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../common/services/notification/notification.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ROLE_COMP } from '../roles.const';
import { FETCH_ROLE_DETAIL_REQUESTED, SELECT_ALL_PERMISSIONS_GROUP, SET_PERMISSIONS_ROLE_REQUESTED, DETACH_PERMISSION_ROLE_REQUESTED } from './edit.actions';
import * as _ from 'lodash';
import { AppInjector } from '../../../../app-injector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public store;
  public navigationSubscription: Subscription;

  constructor(private notification: NotificationService, private activeRouter: ActivatedRoute, private route: Router) {
    this.store = AppInjector.get(Store).getInstance();
    this.navigationSubscription = this.route.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        const roleId = this.activeRouter.snapshot.params.id;
        this.store.dispatch({ type: FETCH_ROLE_DETAIL_REQUESTED, data: roleId, com: ROLE_COMP });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  selectAllPermissionGroup(group) {
    this.store.dispatch({ type: SELECT_ALL_PERMISSIONS_GROUP, data: group, com: ROLE_COMP });
  }

  savePermission() {
    let permissions = this.store.getState().Acl.Roles.edit.groups;
    let selectedPermissions = _.flatMap(permissions, item => {
      return _.filter(item.permissions, { checked: true });
    });
    this.store.dispatch({
      type: SET_PERMISSIONS_ROLE_REQUESTED,
      com: ROLE_COMP,
      data: {
        roleId: this.activeRouter.snapshot.params.id,
        permissions: { permissions: _.map(selectedPermissions, 'slug') }
      }
    });
  }

  detachPermission(permission) {
    this.store.dispatch({
      type: DETACH_PERMISSION_ROLE_REQUESTED,
      com: ROLE_COMP,
      data: {
        roleId: this.activeRouter.snapshot.params.id,
        permission: { permission: permission.getSlug() }
      }
    });
  }
}
