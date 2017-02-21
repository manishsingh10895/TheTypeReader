import {trigger, state, animate, style, transition, AnimationEntryMetadata} from '@angular/core';

export class Animations {
    static routeAnimation =  [
        trigger('routeAnimation', [
        state('*', style({ opacity: 1 })),
        transition('void => *', [
            style({ transform: 'translateX(-100%)', opacity:1 }),
            animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
        ]),
        transition('* => void', 
            animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
            transform: 'translateX(100%)',
            opacity: 0
            })))
        ])
    ];

    static slideAnimation = [
        trigger('slide', [
            state('mouseover', style({ transform: 'translateX(0)', opacity: 1 })),
            state('mouseout', style({ transform: 'translateX(90%)', opacity: 0.5 })),
            transition('mouseover <=> mouseout', [
                style({ transform: 'translateX(-100%)', opacity:1 }),
                animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
            ])
        ])
    ];
}