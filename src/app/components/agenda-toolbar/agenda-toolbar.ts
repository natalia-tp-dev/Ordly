import { Component, model } from '@angular/core';
import { Button } from 'app/components/button/button';
import { Icon } from 'app/components/icon/icon';
import { SegmentedControl, SegmentedOption } from 'app/components/segmented-control/segmented-control';
import { AgendaView } from 'app/models/agenda';

@Component({
  selector: 'app-agenda-toolbar',
  imports: [Button, Icon, SegmentedControl],
  templateUrl: './agenda-toolbar.html',
  styleUrl: './agenda-toolbar.css',
})
export class AgendaToolbar {
  view = model<AgendaView>('month');
  date = model(new Date());

  views: SegmentedOption[] = [
    { label: 'Mes', value: 'month' },
    { label: 'Semana', value: 'week' },
    { label: 'Día', value: 'day' },
  ];

  setView(value: string) {
    this.view.set(value as AgendaView);
  }

  today() {
    this.date.set(new Date());
  }

  move(direction: number) {
    const date = new Date(this.date());
    if (this.view() === 'month') {
      date.setDate(1);
      date.setMonth(date.getMonth() + direction);
    } else {
      date.setDate(date.getDate() + direction * (this.view() === 'week' ? 7 : 1));
    }
    this.date.set(date);
  }
}
