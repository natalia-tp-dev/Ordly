export type AgendaView = 'month' | 'week' | 'day';

export type EventColor = 'blue' | 'green' | 'red' | 'amber' | 'purple';

export interface AgendaEvent {
  id: string;
  title: string;
  detail?: string;
  color: EventColor;
  start: Date;
  end: Date;
}
