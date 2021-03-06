import { trigger, state, animate, transition, style, query, animateChild, group } from '@angular/animations';

// Fade animation used for router outlet
export const fadeAnimation =
  trigger('routeAnimations', [

    // Transition for each route
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
    ], { optional: true}),
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true}),
      query(':leave', animateChild(), { optional: true}),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ opacity: 0 }))
        ], { optional: true}),
        query(':enter', [
          animate('600ms ease-out', style({ opacity: 1 }))
        ], { optional: true})
      ]),
      query(':enter', animateChild(), { optional: true}),
    ])

  ]);
