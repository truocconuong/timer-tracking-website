import { MainComponent } from './components/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'profile',
        loadChildren: 'app/components/profile/profile.module#ProfileModule'
      },
      {
        path: 'admin',
        loadChildren: 'app/components/admin/admin.module#AdminModule'
      },
      {
        path: 'acl',
        loadChildren: './components/acl/acl.module#AclModule'
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: 'app/components/auth/auth.module#AuthModule'
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      useHash: false,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
