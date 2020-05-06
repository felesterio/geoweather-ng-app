import {Report} from "./report";
import {Marker} from "./marker";

export class ReportMarkerTranslator {

  static reportToMarker(report : Report) {
    let marker = {
      position: {lat: report.latitude, lng: report.longitude},
      label: null,
      title: "",
      info: "",
      options: null
    }
    return null;
  }

}

