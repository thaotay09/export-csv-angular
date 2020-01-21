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
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';

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
    MsAdalAngular6Module.forRoot({
      tenant: '93f33571-550f-43cf-b09f-cd331338d086',
      clientId: '3b37162c-beda-4590-9ef6-af02f7218660',
      redirectUri: "https://export-csv-angular.herokuapp.com/dashboard",
      endpoints: {
        "https://export-csv-angular.herokuapp.com": "3b37162c-beda-4590-9ef6-af02f7218660"
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    })
    
  ],
  providers: [UserService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
