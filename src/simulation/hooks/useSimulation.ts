import {Simulation} from 'd3';
import {useCallback, useEffect, useState} from 'react';
import {useSvgComponents} from './useSvgComponents';
import {useD3RootSvg} from '../../hooks/useD3RootSvg';
import {ForceConfiguration} from '../../hooks/useSimulation.types';
import {ViewBox} from '../../viz.types';
import {simForces} from '../callbacks/forces';
import {simTick} from '../callbacks/tick';
import {initSimulationRoot} from '../callbacks/init';
import {SimulationData, Style} from './types/types';

////////////////////

/**
 * Function Parameters for {@see useSimulation}
 */
interface SimulationParameters {
    offset: ViewBox;
    data: SimulationData;
    style: Style;
    forces?: ForceConfiguration;


}

/**
 * Function that creates a D3 Graphic
 *
 ***    Nodes and Links
 ***    Optional force simulation
 *
 * @param offset
 * @param information
 * @param style
 * @param simSettings
 */
export function useSimulation({offset, data, style, forces: forceSettings}: SimulationParameters) {
    const components           = useSvgComponents(data, forceSettings);
    const simRoot              = useD3RootSvg({offset, data, components});
    const simulationController = useState<Simulation<any, any>>();
    const [simulation]         = simulationController;

    // Stylize the SVG
    {
        useEffect(() => initSimulationRoot(simRoot, offset), [offset]);
    }

    // Setup the Force simulation
    {
        const deps = [data.nodes,
                      data.edges,
                      style.radius,
                      forceSettings,
                      offset];

        const update     = useCallback(() => simTick(simRoot, data, simulation), deps);
        const makeForces = useCallback(() => simForces(forceSettings, data, offset, update, simulationController), deps);
        useEffect(makeForces, deps);
    }

    // Reheat the simulation
    {
        useEffect(() => { simulation?.alphaTarget(1).restart(); }, [forceSettings, !!simulation, offset])
    }
    return simRoot.svg ? simRoot.svg.node() : null;
}
