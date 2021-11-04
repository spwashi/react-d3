import {BoundingForceConfig, ForceCallbackParams} from '../types';
import {NodeDatum} from '../../../data/components/nodes/_types/node.types';

function hardStop(datum: NodeDatum, bounding: BoundingForceConfig) {
    let {x, y} = datum;

    if (!x || !y) return;

    if (x < bounding.x.min) x = bounding.x.min;
    else if (x > bounding.x.max) x = bounding.x.max;

    if (y < bounding.y.min) y = bounding.y.min;
    else if (y > bounding.y.max) y = bounding.y.max;

    Object.assign(datum, {x, y})
}

function warp(datum: NodeDatum, bounding: BoundingForceConfig) {
    let {x, y} = datum;

    if (!x || !y) return;

    if ((x < bounding.x.min) || (x > bounding.x.max)) x /= 10 / Math.random();
    if ((y < bounding.y.min) || (y > bounding.y.max)) y /= 10 / Math.random();

    Object.assign(datum, {x, y})
}

function bounce(datum: NodeDatum, bounding: BoundingForceConfig) {
    let {x, y} = datum;

    if (!x || !y) return;

    if ((x < bounding.x.min) || (x > bounding.x.max)) datum.vx = -10 * (datum.vx ?? 1)
    if ((y < bounding.y.min) || (y > bounding.y.max)) datum.vy = -10 * (datum.vy ?? 1);

    Object.assign(datum, {x, y})
}

export function bounding({config, data, simulation}: ForceCallbackParams) {
    const nodes   = data.nodes;
    const options = config.options;
    return simulation.force('bounding',
                            function boundingForce() {
                                if (typeof nodes === 'undefined') return;
                                let i = 0, n = nodes.length;
                                let bounding = options.bounding;
                                if (!bounding) return;
                                for (; i < n; ++i) {
                                    const datum  = nodes[i] as NodeDatum;
                                    const option = options.bounding?.option ?? 0;
                                    const modes  =
                                              [
                                                  hardStop,
                                                  bounce,
                                                  warp,
                                              ];
                                    modes[Math.max(Math.min(modes.length - 1, option), 0)](datum, bounding);
                                }
                            })
}