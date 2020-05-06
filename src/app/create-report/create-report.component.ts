import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  model: ReportView = {
    city:'',
    state:'',
    latitude: 0.0,
    longitude:0.0,
    description:'',
    verificationCounter: 0,
    events: []
  };

  hail: EventView = {
    eventType: "Hail",
    details: {"hail_diameter" : 0}
  };

  wind: EventView = {
    eventType: "Wind",
    details: {"speed" : 0,"direction": 0}
  };

  flood: EventView = {
    eventType: "Flood",
    details: {"water_depth": 0}
  };

  other: EventView = {
    eventType: "OtherEvent",
    details: {"event_type": ""}
  };

  hailChecked = false;
  windChecked = false;
  floodChecked = false;
  otherChecked = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
        this.model.latitude = position.coords.latitude,
        this.model.longitude = position.coords.longitude});
  }

  submit(): void {
    if(this.hailChecked) {this.model.events.push(this.hail)}
    if(this.windChecked) {this.model.events.push(this.wind)}
    if(this.floodChecked) {this.model.events.push(this.flood)}
    if(this.otherChecked) {this.model.events.push(this.other)}
    console.log(this.model)
    this.apiService.submitReport(this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("An error has occurred submitting report.");
      }
    );
  }
}

export interface EventView {
  eventType: String;
  details: any;
}

export interface ReportView {
  city:String;
  state:String;
  latitude:Number;
  longitude:Number;
  description:String;
  verificationCounter: Number;
  events: EventView[];
}

