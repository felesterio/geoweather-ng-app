export interface Event {
  id: number;
  eventType: string;
  reportID: number;
  details: Map<string, any>;
  createdOn: Date;
}

const hailDiameter = "cm";
const waterDepth = "m";
const direction = "°";
const windSpeed = "KT";
//eventDetail example = "hail diameter" --> cm
export function getUnits(eventDetail : string): string {
  let unit = "";
  switch(eventDetail) {
    case "hail_diameter": {
      unit = hailDiameter;
      break;
    }
    case "water_depth" : {
      unit = waterDepth;
      break;
    }
    case "direction": {
      unit = direction;
      break;
    }
    case "speed": {
      unit = windSpeed;
      break;
    }
  }
  return unit;
}
