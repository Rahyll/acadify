import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  state('visible', style({ transform: 'translateX(0)' })),
  state('hidden', style({ transform: 'translateX(-100%)' })),
  transition('visible <=> hidden', animate('300ms ease-in-out')),
]);

export const fadeInOut = trigger('fadeInOut', [
  state('visible', style({ opacity: 0.5 })),
  state('hidden', style({ opacity: 0 })),
  transition('visible <=> hidden', animate('300ms ease-in-out')),
]);

export const slideMain = trigger('slideMain', [
  state('expand', style({ marginLeft: '0px', width: '100%' })), // Default state
  state(
    'contract',
    style({ marginLeft: '256px', width: 'calc(100% - 256px)' })
  ), // Expanded state
  transition('expand <=> contract', animate('300ms ease-in-out')), // Animation duration
]);
