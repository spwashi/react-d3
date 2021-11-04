import {forceSimulation, Simulation} from 'd3';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRootSvg} from './useRootSvg';
import {ViewBox} from '../../viz.types';
import {initSimulation} from '../forces/init';
import {SimulationElement, SimulationRoot} from '../../_types/simulation/simulation.types';
import {SimulationData} from '../../data/_types/data.types';
import {ForceConfiguration} from '../forces/types';

interface SimulationParameters {
    viewBox: ViewBox;
    data: SimulationData;
    forces?: ForceConfiguration;
    components: SimulationElement<any>[];
}

/**
 * Hook to handle ticking/updating of the simulation
 *
 * @param root
 * @param config
 * @param data
 * @param dataChangeKey
 */
function useSimulationLifecycle(root: SimulationRoot<SimulationElement<any>[]>, config: ForceConfiguration | undefined, data: SimulationData, dataChangeKey: any) {
    const [simulation, setSimulation] = useState<Simulation<any, any>>();
    const tick                        = useCallback(() => root.components.forEach(component => component.tick(root.svg)),
                                                    [root]);
    const starterSimulation           = useMemo(() => {return forceSimulation(data.nodes)}, [data.nodes, ...Object.values(config || {})]);
    const refresh                     = useCallback(
        () =>
            setSimulation(
                initSimulation(starterSimulation, {config, data, tick}),
            ),
        [config, data, tick, starterSimulation]);
    useEffect(refresh, [dataChangeKey, config, refresh]);
    return simulation;
}


/**
 * Hook for initializing and managing the state of a simulation
 * @param simulationParameters
 */
export function useSimulation(
    simulationParameters: SimulationParameters,
): SVGElement | null {
    const {
              viewBox,
              data,
              components,
              forces,
          }          = simulationParameters;
    const key        = useMemo(() => { return Date.now(); },
                               // eslint-disable-next-line
                               [data.nodes, data.edges]);
    const root       = useRootSvg<SimulationElement<any>[]>({viewBox, data, components}, key);
    const simulation = useSimulationLifecycle(root, forces, data, key);
    useEffect(() => { simulation?.alphaTarget(.9).restart(); }, [forces, simulation, viewBox])
    return root.svg ? root.svg.node() : null;
}
