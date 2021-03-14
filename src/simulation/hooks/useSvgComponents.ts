import {ExpectedComponentManagers} from '../../hooks/simulation.types';
import {ForceConfiguration} from '../../hooks/useSimulation.types';
import {useNodes} from './initializers/useNodes';
import {SimulationData} from './types/types';
import {useEdges} from './initializers/useEdges';


export function useSvgComponents(information: SimulationData, forces?: ForceConfiguration): ExpectedComponentManagers {
    const _links = useEdges(information, forces);
    const _nodes = useNodes(information);
    return [_links, _nodes];
}