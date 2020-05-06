import {Event} from "../../shared/model/event";

export interface Report {
  id: number;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  description: string;
  verificationCounter: number;
  events: Event[];
  createdOn: Date
}
