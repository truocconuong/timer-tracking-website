import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { ApiUrl } from './api-url.service';
import { FileService } from './file/file.service';
import { AdminApiModule } from './admin/admin.module';
import { WorkTimeService } from './work_times/work_times';
import { DocumentService } from './admin/document/document';
@NgModule({
  imports: [CommonModule, AdminApiModule],
  declarations: [],
  providers: [DocumentService,WorkTimeService,ApiUrl, ApiService, AuthService, RoleService, PermissionService, FileService]
})
export class ApiModule {}
