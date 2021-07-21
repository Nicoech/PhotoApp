import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { MemberPhotosComponent } from './member-photos/member-photos.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [

  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      {path: 'myprofile/:username', component: MyprofileComponent, canActivate: [AuthGuard]},
      {path: 'my_photos/:username', component: MyPhotosComponent, canActivate: [AuthGuard]},
      {path: 'photos/:username', component: MemberPhotosComponent, canActivate: [AuthGuard]},
      {path: 'upload-photos/:username', component: UploadPhotosComponent, canActivate: [AuthGuard]}
    ]

  },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'learn', component: LearnComponent},
  {path: 'register',component: RegisterComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
