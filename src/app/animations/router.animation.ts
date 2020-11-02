import { trigger, state, animate, transition, style, query, animateChild, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: 0 })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ opacity: 0 }))
        ]),
        query(':enter', [
          animate('600ms ease-out', style({ opacity: 1 }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
