import { DirectivesModule } from '../../../common/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { UserRoutingModule } from './user-routing.module';
import { PipesModule } from '../../../common/pipes/pipes.module';
import { CreateComponent } from './create/create.component';
import { UserComponent } from './user.component';
import { AngularReactiveFormModule } from '@vicoders/reactive-form';
import { FormsModule } from '@angular/forms';
import { WorkTimesComponent } from './work_times/work_times.component';
import { WorkTimesDetailComponent } from './work_times_detail/work_times_detail.component';
import { DocumentComponent } from './documents/document.component';
import { WorkTimeIsRealComponent } from './work_time_is_real/work_time_is_real.component';
import { SettingComponent } from './settings/settings.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule, FormsModule, PipesModule, DirectivesModule, AngularReactiveFormModule],
  declarations: [UserComponent, ListComponent, EditComponent, CreateComponent,WorkTimesComponent,WorkTimesDetailComponent,DocumentComponent,WorkTimeIsRealComponent]
})
export class UserModule {}
