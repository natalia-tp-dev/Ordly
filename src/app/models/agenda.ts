export type AgendaView = 'month' | 'week' | 'day';

export const AGENDA_PATHS: Record<AgendaView, string> = {
  month: '/agenda/mes',
  week: '/agenda/semana',
  day: '/agenda/dia',
};

export type EventColor = 'blue' | 'green' | 'red' | 'amber' | 'purple';

export interface EventAttachment {
  name: string;
  size: number;
}

export interface AgendaEvent {
  id: string;
  title: string;
  detail?: string;
  color: EventColor;
  start: Date;
  end: Date;
  listId?: string;
  participants?: string[];
  attachments?: EventAttachment[];
}
