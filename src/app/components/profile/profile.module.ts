import { DirectivesModule } from './../../common/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { DetailComponent } from './detail/detail.component';
import { AngularReactiveFormModule } from '@vicoders/reactive-form';
import { PipesModule } from '../../common/pipes/pipes.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, PipesModule, CommonModule, ProfileRoutingModule, DirectivesModule, AngularReactiveFormModule],
  declarations: [DetailComponent, ChangePasswordComponent]
})
export class ProfileModule {}
