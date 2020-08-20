import { NotificationService } from './notification/notification.service';
import { PreloaderService } from './preloader/preloader.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [PreloaderService, NotificationService]
})
export class ServicesModule {}
