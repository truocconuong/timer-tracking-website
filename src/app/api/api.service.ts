import { PermissionService } from './permission/permission.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RoleService } from './role/role.service';
import { AdminApiService } from './admin/admin.service';
import { FileService } from './file/file.service';

@Injectable()
export class ApiService {
  constructor(public auth: AuthService, public role: RoleService, public permission: PermissionService, public file: FileService, public admin: AdminApiService) {}
}