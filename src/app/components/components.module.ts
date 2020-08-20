import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ProfileModule } from './profile/profile.module';
import { ProfileComponent } from './profile/profile.component';
import { AclComponent } from './acl/acl.component';
import { SharedModule } from '../template/shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [PageNotFoundComponent, DashboardComponent, MainComponent, ProfileComponent, AclComponent, BaseComponent],
  imports: [CommonModule, SharedModule, RouterModule, FormsModule, AuthModule, ProfileModule, AdminModule, BrowserAnimationsModule],
  providers: [],
  exports: []
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule
    };
  }
}
