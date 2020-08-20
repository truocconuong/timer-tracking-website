import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminApiService {
  constructor(public user: UserService, ) {}
}
