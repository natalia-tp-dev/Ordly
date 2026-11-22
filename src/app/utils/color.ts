import { EventColor } from 'app/models/agenda';

const COLOR_VARS: Record<EventColor, string> = {
  blue: 'var(--brand-primary, #3b82f6)',
  green: 'var(--state-success, #10b981)',
  red: 'var(--state-danger, #ef4444)',
  amber: 'var(--state-warning, #f59e0b)',
  purple: 'var(--accent-purple, #8b5cf6)',
};

export function colorVar(color: EventColor): string {
  return COLOR_VARS[color];
}
