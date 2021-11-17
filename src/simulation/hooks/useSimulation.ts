import {ForceCollide, forceSimulation, Simulation} from 'd3';
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
    forceConfig: ForceConfiguration;
    components: SimulationElement<any>[];
}

/**
 * Hook to handle ticking/updating of the simulation
 *
 * @param root
 * @param config
 * @param data
 */
function useSimulationMount(root: SimulationRoot<SimulationElement<any>[]>, config: ForceConfiguration, data: SimulationData) {
    const [simulation, setSimulation] = useState<Simulation<any, any>>();

    const tick =
              useCallback(() => root.components.forEach(component => component.tick(root.svg)),
                          [root]);

    const starterSimulation =
              useMemo(
                  () =>
                      forceSimulation(data.nodes),
                  [data.nodes, config?.forces],
              );

    const refresh =
              useCallback(
                  () =>
                      setSimulation(
                          initSimulation(
                              starterSimulation,
                              {config, data, tick},
                          ),
                      ),
                  [data, tick, starterSimulation],
              );
    useEffect(refresh, [refresh, data.nodes]);
    return simulation;
}


type SimulationController =
    {
        svg: SVGElement | null,
        simulation?: Simulation<any, any>
    };

function useUpdateCollisionForce<F>(simulation: Simulation<any, any> | undefined) {
    const collisionRadius = useCallback(d => d.cr ?? d.r ?? 10, []);
    useEffect(() => {
        const collisionForce = simulation?.force('collision') as ForceCollide<any>;
        if (!collisionForce) return;
        collisionForce.radius(d => d.cr ?? d.r ?? 10);
    }, [simulation, collisionRadius]);
}
/**
 * Hook for initializing and managing the state of a simulation
 * @param simulationParameters
 */
export function useSimulation(simulationParameters: SimulationParameters): SimulationController {
    const {
              viewBox,
              data,
              components,
              forceConfig,
          } = simulationParameters;

    const root          = useRootSvg<SimulationElement<any>[]>({viewBox, data, components});
    const simulation    = useSimulationMount(root, forceConfig, data);
    const velocityDecay = forceConfig?.options.velocityDecay;
    const alphaTarget   = .2;

    useEffect(() => { simulation?.alphaTarget(alphaTarget).restart(); }, [alphaTarget]);
    useEffect(() => { simulation?.velocityDecay(velocityDecay ?? alphaTarget); }, [velocityDecay]);
    useUpdateCollisionForce(simulation);
    return {
        svg: root.svg ? root.svg.node() : null,
        simulation,
    };
}
