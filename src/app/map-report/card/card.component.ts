import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../../shared/model/report";
import {Event, getUnits} from "../../shared/model/event";
import {ApiService} from "../../shared/api.service";
import {GlobalVariables} from "../../global-variables";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() report: Report;
  buttonDisabled = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.buttonDisabled = GlobalVariables.disabledVerifyButtons.includes(this.report.id);
  }

  formatDetails(details: Map<string, any>): string {
    let s = "";
    let i = 1
    for (let key of Array.from(Object.keys(details))) {
      if (key != "event_type") {
        s += key.replace("_", " ") + ": " + details[key];

        //add units depending on data
        s += " " + getUnits(key);
      }

      if (i != Object.keys(details).length) {
        s += " | ";
        i++;
      }
    }
    return s;
  }

  formatDate(createdOn: any) {
    return (new Date(createdOn)).toLocaleString();
  }

  formatEventType(eventType: string, details: Map<string, any>) {
    if (eventType == "OtherEvent") {
      return details["event_type"];
    }
    return eventType.replace(/([A-Z])/g, ' $1').trim();
  }

  verifiedReport() {
    if (!GlobalVariables.disabledVerifyButtons.includes(this.report.id)) {
      this.apiService.incrementVerificationCounter(this.report).subscribe(
        res => {
          this.report.verificationCounter = this.report.verificationCounter + 1;
          GlobalVariables.disabledVerifyButtons.push(this.report.id);
          this.buttonDisabled = true;
        },
        err => {
          alert("An error has occurred submitting report.");
        }
      );
    } else {
    }
  }
}
