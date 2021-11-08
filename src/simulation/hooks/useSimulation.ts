import {forceSimulation, Simulation} from 'd3';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRootSvg} from './useRootSvg';
import {ViewBox} from '../../types/simulation/visualization';
import {initSimulation} from '../forces/init';
import {SimulationElement, SimulationRoot} from '../../types/simulation';
import {SimulationData} from '../../data/types';
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
    const starterSimulation           = useMemo(() => {return forceSimulation(data.nodes)}, [data.nodes]);
    const refresh                     = useCallback(
        () => {
            setSimulation(
                initSimulation(starterSimulation, {config, data, tick}),
            );
        },
        [data, tick, starterSimulation]);
    useEffect(refresh, [dataChangeKey, refresh]);
    return simulation;
}


/**
 * Hook for initializing and managing the state of a simulation
 * @param simulationParameters
 */
export function useSimulation(
    simulationParameters: SimulationParameters,
): {
    svg: SVGElement | null,
    simulation?: Simulation<any, any>
} {
    const {
              viewBox,
              data,
              components,
              forces,
          }          = simulationParameters;
    const key        = useMemo(() => { return Date.now(); },
                               // eslint-disable-next-line
                               [...Object.values(data)]);
    const root       = useRootSvg<SimulationElement<any>[]>({viewBox, data, components}, key);
    const simulation = useSimulationLifecycle(root, forces, data, key);
    useEffect(() => { simulation?.alphaTarget(.2).restart(); }, [forces, simulation, viewBox])
    useEffect(() => { simulation?.velocityDecay(forces?.options.velocityDecay ?? .2); }, [forces?.options.velocityDecay])
    return {
        svg: root.svg ? root.svg.node() : null,
        simulation,
    };
}
