import {SimulationRoot} from '../../hooks/simulation.types';
import {ViewBox} from '../../viz.types';
import {simulationRoot_componentManagers} from '../selectors';


/**
 * First setup of the simulationRoot
 *
 * @param simulationRoot
 * @param offset
 */
export function initSimulationRoot(simulationRoot: SimulationRoot, offset: ViewBox) {
    const {edges, nodes} = simulationRoot_componentManagers(simulationRoot);
    nodes.format(simulationRoot.svg)
    edges.format(simulationRoot.svg)
    if (simulationRoot.svg) simulationRoot.svg.attr('viewBox', offset.join(' '))
}