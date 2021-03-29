import {VizConfigState} from '../components/config/config/types';


export const doMount       = true;
export const defaultConfig =
                 {
                     interval:       {type: 'range', min: 20, max: 500, step: .1, defaultState: 75},
                     radius:         {type: 'range', min: 0, max: 1000, step: .1, defaultState: 75},
                     linkStrength:   {type: 'range', min: -1000, max: 1000, step: .5, defaultState: 1},
                     nodeStrength:   {type: 'range', min: -1000, max: 1000, step: .5, defaultState: 0},
                     height:         {type: 'range', min: 200, max: 1000, step: .5, defaultState: 700},
                     width:          {type: 'range', min: 200, max: 1000, step: .5, defaultState: 700},
                     svgWidth:       {type: 'range', min: 0, max: 10000, step: .5, defaultState: 300},
                     svgHeight:      {type: 'range', min: 0, max: 10000, step: .5, defaultState: 300},
                     offsetX:        {type: 'range', min: -10000, max: 10000, step: .5, defaultState: -125},
                     offsetY:        {type: 'range', min: -10000, max: 10000, step: .5, defaultState: -125},
                     boundingBox:    {type: 'toggle', defaultState: false},
                     centeringForce: {type: 'toggle', defaultState: false},
                     internalForce:  {type: 'toggle', defaultState: false},
                     collisionForce: {type: 'toggle', defaultState: false},
                     open:           {type: 'toggle', defaultState: false},
                 } as VizConfigState;