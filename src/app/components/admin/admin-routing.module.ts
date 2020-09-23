import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './user/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'settings',
        component: SettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
