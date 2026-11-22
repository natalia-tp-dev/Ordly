import { EventColor } from 'app/models/agenda';

export interface TaskList {
  id: string;
  name: string;
  color: EventColor;
}

export interface ListFormValue {
  name: string;
  color: EventColor;
}
