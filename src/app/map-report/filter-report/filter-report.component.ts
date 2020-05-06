import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MapReportComponent} from "../map-report.component";


@Component({
  selector: 'app-filter-report',
  templateUrl: './filter-report.component.html',
  styleUrls: ['./filter-report.component.scss']
})
export class FilterReportComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private mapComponent : MapReportComponent) {
  }

  filterForm: FormGroup;

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      city: '',
      state: '',
      timeline: [],
      wind: true,
      hail: true,
      flood: true,
      otherEvent: true,
      otherEventType : ''
    });

    this.onChanges();
  }


  //listening for changes in for

  onChanges(): void {
    this.filterForm.valueChanges.subscribe(val=>{
      this.mapComponent.onFilterUpdate(val);
    });
  }


  //slider formatting
  minValue: number = 0;
  maxValue: number = 30;
  options: Options = {
    floor: 0,
    ceil: 30,
    rightToLeft: true,
    translate: (value: number): string => {
      let d = new Date();
      d.setDate(d.getDate() - value);
      return d.toLocaleDateString();
    }
  };

  //event slides
  tiles: Tile[] = [
    {text: 'Wind', cols: 1, rows: 1, color: 'white', formControlName: 'wind'},
    {text: 'Hail', cols: 1, rows: 1, color: 'white', formControlName: 'hail'},
    {text: 'Flood', cols: 1, rows: 1, color: 'white', formControlName: 'flood'},
    {text: 'Other: ', cols: 1, rows: 1, color: 'white', formControlName: 'otherEvent'},
  ];

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  formControlName: string;
}
