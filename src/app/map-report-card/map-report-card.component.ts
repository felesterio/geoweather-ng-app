import {Component, OnInit, ViewChild} from '@angular/core';
import {Report} from "../shared/model/report";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-map-report-card',
  templateUrl: './map-report-card.component.html',
  styleUrls: ['./map-report-card.component.css']
})
export class MapReportCardComponent implements OnInit {

  reports: Report[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    //gets all reports this.reports
    this.getAllReports();
  }

  public getAllReports() {
    this.apiService.getAllReports().subscribe(
      res => {
        this.reports = res;
      },
      err => {
        alert("An error has occurred loading reports.");
      }
    );
  }

}
