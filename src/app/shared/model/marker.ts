export interface Marker {
  position: Position;
  label: Label;
  title: string;
  info: string;
  options: Options;
}

export class Position {
  lat: number;
  lng: number;
}

export class Label {
  color: string;
  text: string;
}

export class Options {
  animation: number;
}
