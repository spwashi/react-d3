import {Simulation} from 'd3';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useSimulationRoot} from './useSimulationRoot';
import {ViewBox} from '../../viz.types';
import {initSimulation} from '../forces/init';
import {defaultTick} from '../forces/default/tick';
import {SimulationElement, SimulationRoot} from '../../root/simulation/simulation.types';
import {SimulationData} from '../../root/data/data.types';
import {ForceConfiguration} from '../forces/types';

interface SimulationParameters {
    viewBox: ViewBox;
    data: SimulationData;
    forces?: ForceConfiguration;
    components: SimulationElement<any>[]

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
    const tick                        = useCallback(() => defaultTick(root), [root]);
    const refresh                     = useCallback(() => setSimulation(initSimulation({config, data, tick})),
                                                    [config, data, tick]);
    useEffect(refresh, [dataChangeKey, config, refresh]);
    return simulation;
}


/**
 * Hook for initializing and managing the state of a simulation
 * @param viewBox
 * @param data
 * @param components
 * @param forces
 * @param changeKey
 */
export function useSimulation(
    {
        viewBox,
        data,
        components,
        forces,
    }: SimulationParameters,
    changeKey?: any[],
): SVGElement | null {
    // eslint-disable-next-line
    const key        = useMemo(() => Date.now(), changeKey ?? [data.nodes, data.edges])
    const root       = useSimulationRoot<SimulationElement<any>[]>({viewBox, data, components}, key);
    const simulation = useSimulationLifecycle(root, forces, data, key);
    useEffect(() => { simulation?.alphaTarget(1).restart(); }, [forces, simulation, viewBox])
    return root.svg ? root.svg.node() : null;
}
