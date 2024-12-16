import { ErrorHandler, NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { fakeBackendProvider } from './core/interceptor/fake-backend';
// import { ErrorInterceptor } from './core/interceptor/error.interceptor';
// import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminModule } from './admin/admin.module';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { WINDOW_PROVIDERS } from './core/service/window.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoGinComponent } from './lo-gin/lo-gin.component';
import { AgentModule } from './agent/agent.module';
import { CheckToken } from './general-interceptors/token.interceptors';
import { ToastrModule } from 'ngx-toastr';
import { ResponseInterceptor } from './general-interceptors/response.interceptor';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from './date-formats';
import { PermissionsDirective } from './directives/permissions.directive';
import { SpinnerInterceptor } from './general-interceptors/spinner.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';


// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    LoGinComponent,
    SpinnerComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    AgentModule,
    LoadingBarRouterModule,
    NgScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    CoreModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {provide: HTTP_INTERCEPTORS,useClass: CheckToken,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: ResponseInterceptor,multi: true},
    
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    fakeBackendProvider,
    WINDOW_PROVIDERS,
    {
      provide: DateAdapter,
      useClass: MatMomentDateModule,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
