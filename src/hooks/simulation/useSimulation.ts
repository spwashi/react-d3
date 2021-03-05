import {Simulation} from 'd3';
import {useCallback, useEffect, useState} from 'react';
import {initSvgComponents} from '../../_default/hooks/initSvgComponents';
import {useD3RootSvg} from '../useD3RootSvg';
import {ForceConfiguration} from '../useSimulation.types';
import {ViewBox} from '../../viz.types';
import {updateForces} from '../../_default/callbacks/updateForces';
import {tick} from '../../_default/callbacks/tick';
import {setupSimulationRoot} from '../../_default/callbacks/setupSimulationRoot';
import {SimulationData, Style} from '../../_default/hooks/types';

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
export function useSimulation({offset, data, style, forces}: SimulationParameters) {
    const components           = initSvgComponents(data, forces);
    const simRoot              = useD3RootSvg({offset, data, components});
    const simulationController = useState<Simulation<any, any>>();
    const [simulation]         = simulationController;

    // Stylize the SVG
    {
        useEffect(() => setupSimulationRoot(simRoot, offset), [offset]);
    }

    // Setup the Force simulation
    {
        const deps = [data.nodes,
                      data.edges,
                      style.radius,
                      forces];

        const update     = useCallback(() => tick(simRoot, data, simulation), deps);
        const makeForces = useCallback(() => updateForces(forces, data, offset, update, simulationController), deps);
        useEffect(makeForces, deps);
    }

    // Reheat the simulation
    {
        useEffect(() => { simulation?.alphaTarget(.9).restart(); }, [forces, !!simulation])
    }
    return simRoot.svg ? simRoot.svg.node() : null;
}
