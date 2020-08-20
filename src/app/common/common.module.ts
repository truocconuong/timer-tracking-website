import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { UtilModule } from './util/util.module';

@NgModule({
  imports: [AngularCommonModule, DirectivesModule, ServicesModule, PipesModule, UtilModule],
  exports: [],
  declarations: []
})
export class AppCommonModule {}
