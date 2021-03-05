import {ExpectedComponentManagers} from '../../hooks/simulation.types';
import {ForceConfiguration} from '../../hooks/useSimulation.types';
import {initSvgNodes} from './initializers/initSvgNodes';
import {SimulationData} from './types';
import {initEdges} from './initializers/initEdges';


export function initSvgComponents(information: SimulationData, forces?: ForceConfiguration): ExpectedComponentManagers {
    const _links = initEdges(information, forces);
    const _nodes = initSvgNodes(information);
    return [_links, _nodes];
}