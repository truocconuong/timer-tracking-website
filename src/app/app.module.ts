import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppCommonModule } from './common/common.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { ApiModule } from './api/api.module';
import { setAppInjector } from './app-injector';
import { AppErrorHandler } from './common/exceptions/exception-handeler';
import { Store } from './store/store.module';
import { PipesModule } from './common/pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, ApiModule, AppCommonModule, AppRoutingModule, ComponentsModule,PipesModule],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    Store,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
