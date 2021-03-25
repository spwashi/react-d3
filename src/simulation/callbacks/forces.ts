import {ForceConfiguration} from '../../hooks/useSimulation.types';
import {ViewBox} from '../../viz.types';
import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation} from 'd3';
import {DatumEdge} from '../../data/data.types';
import {_Simulation} from '../types';
import {SimulationData} from '../hooks/types/types';
import {Datum} from '../../data/types/datum';

export type SimulationController = [_Simulation, (value: _Simulation) => void];

/**
 * Updates the simu
 *
 * @param forces
 * @param data
 * @param offset
 * @param tick
 * @param simulationController
 */
export function simForces<F>(forces: ForceConfiguration | undefined,
                             data: SimulationData,
                             offset: ViewBox,
                             tick: () => void,
                             simulationController: SimulationController) {
    if (!forces) return;
    const [simulation, setSimulation] = simulationController;

    let _simulation = forceSimulation(data.nodes).alphaDecay(0);

    // tick
    {
        _simulation = _simulation.on('tick', tick);
    }

    // node force
    {
        // not: sim moves slowly when strength is a function
        const nodeForceStrength = forces.nodeForceStrength || 0;
        if (nodeForceStrength) {
            _simulation = _simulation
                .force('charge', forceManyBody<Datum>()
                    .strength((d: Datum) => (d?.forces?.electronegativity ?? 1) * nodeForceStrength));
        }
    }

    // edge force
    {
        const nodeLinkStrength = forces.nodeLinkStrength;
        if (nodeLinkStrength) {
            _simulation = _simulation.force('link',
                                            forceLink()
                                                .links(data.edges)
                                                .strength((link) => (((link as DatumEdge).strength ?? 1) * nodeLinkStrength)));

        }
    }

    // box-dependent forces
    //    - bounding box
    //    - center
    {
        // const isBoundingBoxActive = () => !!forces.boundingBox;
        // const height   = offset_height(offset);
        // const svgWidth = offset_width(offset);
        // const xOffset  = offset[0];
        // const yOffset  = offset[1];

        // Centering Force
        {
            const centeringForce = forces.center;
            if (centeringForce !== undefined) {
                _simulation =
                    _simulation
                        .force('center', forceCenter().strength(.01 * centeringForce));
            }
        }
    }

    _simulation = _simulation.force('corrective',
                                    function correctiveForce() {
                                        let i = 0, n = data.nodes.length;

                                        for (; i < n; ++i) {
                                            const curr_node = data.nodes[i] as Datum;
                                            let forces      = curr_node.forces;
                                            let boundary    = forces?.boundary;
                                            if (!boundary) continue;
                                            boundary();
                                        }
                                    })

    _simulation = _simulation.force('collision', forceCollide<Datum>().radius(d => d.r));

    // ---

    // Start the simulation
    {
        simulation
            ?.alphaTarget(.9)
            .restart();
        setSimulation(_simulation);
    }
}