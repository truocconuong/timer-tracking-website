import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { SettingComponent } from './user/settings/settings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [AdminRoutingModule, FormsModule],
  declarations: [SettingComponent]
})
export class AdminModule {}
