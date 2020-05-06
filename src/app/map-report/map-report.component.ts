import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {Report} from "../shared/model/report";
import {ApiService} from "../shared/api.service";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {ReportDirectiveDirective} from "../map-report-card/report-directive.directive";
import {CardComponent} from "./card/card.component";

@Component({
  selector: 'app-map',
  templateUrl: './map-report.component.html',
  styleUrls: ['./map-report.component.css']
})
export class MapReportComponent implements OnInit {

  reports: Report[] = [];
  markers = [];

  constructor(private apiService: ApiService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) info: MapInfoWindow;
  @ViewChild(ReportDirectiveDirective, {static: true}) reportHost: ReportDirectiveDirective;

  zoom = 4.5;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 30,
    minZoom: 0,
    gestureHandling: 'greedy'
  };

  ngOnInit(): void {
    //gets all reports this.reports
    this.getAllReports();

    //set up map
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  public getAllReports() {
    this.apiService.getAllReports().subscribe(
      res => {
        this.reports = res;
        this.renderMarkers(this.reports);
      },
      err => {
        alert("An error has occurred loading reports.");
      }
    );
  }

  renderMarkers(reports: Report[]) {
    this.clearMap();
    for (let report of reports) {
      this.addMarker(report);
    }
  }

  clearMap() {
    this.markers = []
  }

  addMarker(r: Report) {
    this.markers.push({
      position: {
        lat: r.latitude,
        lng: r.longitude
      },
      label: {
        color: 'red',
        text: '',
      },
      title: (new Date(r.createdOn)).toLocaleDateString(),
      info: r,
      options: {
        animation: null,
      },
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  isOpened = false;

  openInfo(marker: MapMarker, info) {
    if (this.isOpened) {
      this.isOpened = false;
      this.info.close();
      return;
    }
    this.isOpened = true;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);

    const viewContainerRef = this.reportHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<CardComponent>componentRef.instance).report = info;

    this.info.open(marker);
  }

  onFilterUpdate(filterVals: Filter) {
    //NOTE: WE DECIDED WITH SERVER SIDE FILTERING.
    let reports = [];
    this.reports.forEach(val => reports.push(Object.assign({}, val))); //copy of all reports

    //filter by city
    if (filterVals.city != '') {
      let reportsReplace = [];
      for (let report of reports) {
        if (report.city == filterVals.city) {
          reportsReplace.push(report);
        }
      }
      reports = reportsReplace;
    }

    //filter by state
    if (filterVals.state != '') {
      let reportsReplace = [];
      for (let report of reports) {
        if (report.state == filterVals.state) {
          reportsReplace.push(report);
        }
      }
      reports = reportsReplace;
    }

    //filter by timeline
    let rightBound = this.convertDaysInPastToDate(filterVals.timeline[0]);
    let leftBound = this.convertDaysInPastToDate(filterVals.timeline[1]);
    let reportsReplace = [];
    for (let report of reports) {
      let createdOn = new Date(report.createdOn);
      if (leftBound <= createdOn && createdOn <= rightBound) {
        reportsReplace.push(report);
      }
    }
    reports = reportsReplace;

    //filter by event
    let reportReplace = []
    for (let report of reports) {
      if (this.fitsEventCriteria(report, filterVals.wind, filterVals.hail, filterVals.flood, filterVals.otherEvent, filterVals.otherEventType)) {
        reportReplace.push(report);
      }
    }
    reports = reportReplace;
    this.renderMarkers(reports);
  }

  convertDaysInPastToDate(value: number): Date {
    let d = new Date();
    d.setDate(d.getDate() - value);
    return d;
  }

  fitsEventCriteria(report: Report, wind: boolean, hail: boolean, flood: boolean, otherEvent: boolean, otherEventType: string): boolean {
    if (!wind && !hail && !flood && !otherEvent) {
      return false;
    }
    let events = report.events;
    for (let event of events) {
      if (wind && event.eventType == "Wind") {
        return true
      }
      if (hail && event.eventType == "Hail") {
        return true
      }
      if (flood && event.eventType == "Flood") {
        return true
      }
      if (otherEvent && event.eventType == "OtherEvent" && (otherEventType == "" || event.details["event_type"] == otherEventType)) {
        return true
      }
    }
    return false;
  }
}

export interface Filter {
  city: String;
  state: String;
  hail: boolean;
  flood: boolean;
  wind: boolean;
  otherEvent: boolean;
  otherEventType: string;
  timeline: number[];

}
