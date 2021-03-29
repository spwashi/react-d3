import {ForceCallbackParams} from '../../types';
import {NodeDatum} from '../../../data/types/node';

/**
 * Force that comes from a property
 * @param config
 * @param data
 * @param simulation
 */
export function internal({config, data, simulation}: ForceCallbackParams) {
    const nodes = data.nodes;
    if (config.options.internal) {
        simulation = simulation.force('corrective',
                                      function correctiveForce() {
                                          if (typeof nodes === 'undefined') return
                                          let i = 0, n = nodes.length;
                                          console.log(nodes.length)

                                          for (; i < n; ++i) {
                                              const curr_node = nodes[i] as NodeDatum;
                                              let forces      = curr_node.forces;
                                              let boundary    = forces?.inclination;
                                              if (!boundary) continue;
                                              boundary();
                                          }
                                      })

    }
    return simulation;
}