import { Component, OnInit, Input } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isArray } from 'util';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
 

  ngOnInit() {
  }
  title = 'app';
  constructor(private adalSvc: MsAdalAngular6Service) {
    var token = this.adalSvc.acquireToken('https://CSCPortal.onmicrosoft.com/ea19ac78-ecf6-4c73-a17b-c8ad7dc0234e').subscribe((token: string) => {
      console.log("Thao token: " + token);
      var decoded = jwt_decode(token);
      console.log("Thao decode: " + JSON.stringify(decoded));
      var username = decoded.unique_name;
      console.log(username);
    });;
  }

  }




