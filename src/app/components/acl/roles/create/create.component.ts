import { Component, OnInit } from '@angular/core';
import { Store } from './../../../../store/store.module';
import { CREATE_ROLE_REQUESTED } from './create.actions';
import { AppInjector } from '../../../../app-injector';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public store;

  public role = {
    name: '',
    level: 1
  };

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {}

  onSubmit(form) {
    if (form.valid) {
      this.store.dispatch({ type: CREATE_ROLE_REQUESTED, data: this.role });
    }
  }
}
