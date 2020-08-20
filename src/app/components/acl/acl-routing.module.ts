import { RolesComponent } from './roles/roles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './roles/list/list.component';

const appRoutes: Routes = [
  {
    path: '',
    // redirectTo: 'acl/roles',
    component: RolesComponent,
    children: [
      {
        path: 'roles',
        component: RolesComponent,
        loadChildren: './roles/roles.module#RolesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AclRoutingModule {}
