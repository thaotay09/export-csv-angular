import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserComponent } from './user/user.component'
import { Routes, RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { AuthguardGuard } from './authguard.guard';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: ExportCsvComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserComponent,
    ExportCsvComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [UserService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
