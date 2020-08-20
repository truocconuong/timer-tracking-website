import { PipesModule } from './../../../common/pipes/pipes.module';
import { DirectivesModule } from './../../../common/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { RolesRoutingModule } from './roles-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [CommonModule, RolesRoutingModule, FormsModule, DirectivesModule, PipesModule],
  declarations: [ListComponent, EditComponent, CreateComponent]
})
export class RolesModule {}
