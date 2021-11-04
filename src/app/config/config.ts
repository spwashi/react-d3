import {VizConfigState} from '../components/config/config/types';


export const doMount       = true;
export const defaultConfig =
                 {
                     height: {type: 'range', min: 200, max: 10000, step: .5, defaultState: 700},
                     width:  {type: 'range', min: 200, max: 10000, step: .5, defaultState: 700},

                     svgWidth:  {type: 'range', min: 0, max: 100000, step: .5, defaultState: 300},
                     svgHeight: {type: 'range', min: 0, max: 100000, step: .5, defaultState: 300},

                     offsetX: {type: 'range', min: -10000, max: 10000, step: .5, defaultState: -125},
                     offsetY: {type: 'range', min: -10000, max: 10000, step: .5, defaultState: -125},


                     // Node Properties
                     n:               {type: 'range', min: 20, max: 10000, step: 1, defaultState: 75},
                     radius:          {type: 'range', min: -2, max: 1000, step: .1, defaultState: 75},
                     useNodeStrength: {type: 'toggle', defaultState: false},
                     nodeStrength:    {type: 'range', min: -100000, max: 100000, step: .5, defaultState: 0},

                     // Edge Properties
                     useEdgeStrength: {type: 'toggle', defaultState: false},
                     edgeStrength:    {type: 'range', min: -250, max: 250, step: .5, defaultState: 1},
                     edgeWidth:       {type: 'range', min: -10, max: 100, step: .5, defaultState: 1},
                     '-edge':         {type: 'toggle', min: 0, max: 0, step: 0, defaultState: 0},

                     // Forces
                     useBoundingBox: {type: 'toggle', defaultState: false},
                     boundingOption: {type: 'enum', options: [0, 1, 2], defaultState: 0},

                     useCenteringForce: {type: 'toggle', defaultState: false},
                     useInternalForce:  {type: 'toggle', defaultState: false},
                     collisionForce:    {type: 'toggle', defaultState: false},
                 } as VizConfigState;