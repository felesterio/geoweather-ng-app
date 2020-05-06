import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[appReportDirective]'
})
export class ReportDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
