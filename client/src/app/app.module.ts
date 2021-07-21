import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { RegisterComponent } from './register/register.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { LearnComponent } from './learn/learn.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberPhotosComponent } from './member-photos/member-photos.component';
import { IgxGridModule } from 'igniteui-angular';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { NgxImageDisplayModule } from '@creativeacer/ngx-image-display';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MyPhotosComponent,
    LearnComponent,
    MyprofileComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberPhotosComponent,
    UploadPhotosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    IvyCarouselModule,
    IgxGridModule,
    NgxImageDisplayModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
