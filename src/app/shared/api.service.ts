import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Report} from "./model/report";
import {ReportView} from "../create-report/create-report.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/api/report";
  private ALL_REPORTS_URL = this.BASE_URL + '/all';
  private SUBMIT_REPORT_URL = this.BASE_URL + '/create';
  private INCREMENT_V_COUNTER = this.BASE_URL + '/plusVerify';
  private FILTER_REPORTS_URL =  this.BASE_URL + "/reportWithFilter";


  constructor(private http: HttpClient) {

  }

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.ALL_REPORTS_URL);
  }

  submitReport(report: ReportView): Observable<any> {
    return this.http.post(this.SUBMIT_REPORT_URL, report);
  }

  incrementVerificationCounter(report: Report): Observable<any> {
    return this.http.post(this.INCREMENT_V_COUNTER, report);
  }

  //never used, we did server side filtering instead
  getReportsWithFilter(filterVals: any): Observable<any> {
    return this.http.post(this.FILTER_REPORTS_URL, filterVals);
  }
}
