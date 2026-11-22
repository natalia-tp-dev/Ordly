import { EventColor } from 'app/models/agenda';

export interface TaskList {
  name: string;
  color: string;
}

export interface ListFormValue {
  name: string;
  color: EventColor;
}
