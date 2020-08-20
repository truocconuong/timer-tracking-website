import { UserService } from './user/user.service';
import { NgModule } from '@angular/core';
import { AdminApiService } from './admin.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [UserService, AdminApiService]
})
export class AdminApiModule {
  constructor() {}
}
