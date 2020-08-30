import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkTimesComponent } from './work_times/work_times.component';
import { WorkTimesDetailComponent } from './work_times_detail/work_times_detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'work-times',
    component: WorkTimesComponent
  },
  {
    path: 'work-times/:id',
    component: WorkTimesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
