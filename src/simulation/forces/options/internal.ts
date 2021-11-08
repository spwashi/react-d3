import {ForceCallbackParams} from '../types';
import {NodeDatum} from '../../../data/components/nodes/types/types';

/**
 * Force that comes from a property
 * @param config
 * @param data
 * @param simulation
 */
export function internal({config, data, simulation}: ForceCallbackParams) {
    if (config.options.internal) {
        simulation = simulation.force('corrective',
                                      function correctiveForce() {
                                          const nodes = data.nodes;

                                          if (typeof nodes === 'undefined') return
                                          let i = 0, n = nodes.length;

                                          for (; i < n; ++i) {
                                              const curr_node = nodes[i] as NodeDatum;
                                              let forces      = curr_node.forces;
                                              let boundary    = forces?.inclination;
                                              if (!boundary) continue;
                                              boundary(curr_node);
                                          }
                                      })

    }
    return simulation;
}