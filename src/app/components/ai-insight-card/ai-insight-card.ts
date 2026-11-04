import { Component, input, output } from '@angular/core';
import { Button } from 'app/components/button/button';

@Component({
  selector: 'app-ai-insight-card',
  imports: [Button],
  templateUrl: './ai-insight-card.html',
  styleUrl: './ai-insight-card.css',
})
export class AiInsightCard {
  title = input('Lo que veo en tu día');
  message = input.required<string>();
  primaryLabel = input.required<string>();
  secondaryLabel = input<string>();
  dismissLabel = input('Descartar');

  primaryClick = output<void>();
  secondaryClick = output<void>();
  dismissClick = output<void>();
}
