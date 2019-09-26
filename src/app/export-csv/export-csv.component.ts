import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.css']
})
export class ExportCsvComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  selectEnv: string;
  selectTimeZone: string;
  url: string;
  deploymentId: string;
  fromDate: string;
  toDate: string;
  



  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'OCIO Conversation Report: ',
    useBom: true,
    noDownload: false,
    headers: ["date", "conversation_id", "user_name", "start_time", "end_time", "duration", "intents", "INC_number", "INC_link"]
  };

  optionEnv = [
    {
      id: "dev", name: "DEV"
    },
    {
      id: "test", name: "TEST"
    },
    {
      id: "pro", name: "PRODUCTION"
    }

  ]

  optionTimezone = [
    {
      id: "asa", name: "Asia/Bangkok"
    },
    {
      id: "utc", name: "UTC"
    },
    {
      id: "ist", name: "IST"
    },
    {
      id: "est", name: "EST"
    },

  ]

  sendRequestPost(deploymentId: string, fromDate: string, toDate: string) {
    if (this.selectEnv == "PRODUCTION") {
      var headers = new HttpHeaders().set('Content-Type', 'application/json'); // create header object
      headers = headers.append('Accept', 'application/json, text/plain, */*');
      headers = headers.append('x-ibm-client-id', '' + environment.clientId + '');
      headers = headers.append('x-ibm-client-secret', '' + environment.clientSecret + '');
      this.url = environment.apiEndpoint;
    } else if (this.selectEnv == "DEV") {
      var headers = new HttpHeaders().set('Content-Type', 'application/json'); // create header object
      headers = headers.append('Accept', 'application/json, text/plain, */*');
      headers = headers.append('x-ibm-client-id', '' + environment.clientIdDev + '');
      headers = headers.append('x-ibm-client-secret', '' + environment.clientSecretDev + '');
      this.url = environment.apiEndpointDev;
    } else if (this.selectEnv == "TEST") {
      var headers = new HttpHeaders().set('Content-Type', 'application/json'); // create header object
      headers = headers.append('Accept', 'application/json, text/plain, */*');
      headers = headers.append('x-ibm-client-id', '' + environment.clientIdTest + '');
      headers = headers.append('x-ibm-client-secret', '' + environment.clientSecretTest + '');
      this.url = environment.apiEndpointTest;
    }
      let bodyData = {
        "deployment_id": deploymentId,
        "fromDate": fromDate,
        "toDate": toDate,
        "timeZone": this.selectTimeZone,
        "isDetailed": true,
        "isBeauty": true
      }
      this.http.post<string>('' + this.url, bodyData, { headers: headers })
        .subscribe(data => {
          // console.log(data)
          let dataLast = "[\n";          
          let lines = data.split("\n");
          let fields = lines[0].split(",");
          for (let i = 1; i < lines.length; i++) {
            var inte = lines[i].match(/"\s?[^"]+"/)
            lines[i] = lines[i].replace(/"\s?[^"]+"/, '')
            var incNum = lines[i].match(/"\s?[^"]+"/)
            lines[i] = lines[i].replace(/"\s?[^"]+"/, '')
            var link = lines[i].match(/"\s?[^"]+"/)
            lines[i] = lines[i].replace(/"\s?[^"]+"/, '')
            // console.log('inte:' + inte[0] + '\n' + 'incNum' + inte[1])
            // console.log(isArray(inte)) 
            if(incNum)  console.log(incNum)
            
            var linesIndex = lines[i].split(",");
            dataLast = dataLast + "\t{\n";
            for (let k = 0; k < fields.length; k++) {
              var fieldIndex = fields[k];
              if (fieldIndex == 'intents' && inte) {
                dataLast = dataLast + '\t\t"' + fieldIndex + '"' + ":" + inte;
              } else if (fieldIndex == 'INC_number' && incNum ){
                dataLast = dataLast + '\t\t"' + fieldIndex + '"' + ":" + incNum['0'];
              } else if (fieldIndex == 'INC_link' && link ){
                dataLast = dataLast + '\t\t"' + fieldIndex + '"' + ":" + link['0'];
              }else {
                dataLast = dataLast + '\t\t"' + fieldIndex + '"' + ":" + '"' + linesIndex[k] + '"';
              }
              if (k != fields.length - 1) {
                dataLast = dataLast + ",\n"
              }
            }
            if (i == lines.length - 1)
              dataLast = dataLast + "\n\t}\n";
            else
              dataLast = dataLast + "\n\t},\n";
          }
          dataLast = dataLast + "]"
          console.log(dataLast);
          new Angular5Csv(dataLast, "OCIO-conversation-report", this.csvOptions);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        })
    }

}
