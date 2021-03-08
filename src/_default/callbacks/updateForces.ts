import {ForceConfiguration} from '../../hooks/useSimulation.types';
import {ViewBox} from '../../viz.types';
import {forceCenter, forceLink, forceManyBody, forceSimulation} from 'd3';
import {DatumEdge} from '../../data/data.types';
import {offset_height, offset_width} from '../selectors';
import {_Simulation} from '../types';
import {SimulationData} from '../hooks/types';
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
export function updateForces<F>(forces: ForceConfiguration | undefined,
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
            _simulation = _simulation.force('charge', forceManyBody().strength(nodeForceStrength));
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
        const isBoundingBoxActive = () => !!forces.boundingBox;

        const height   = offset_height(offset);
        const svgWidth = offset_width(offset);
        const xOffset  = offset[0];
        const yOffset  = offset[1];

        // Centering Force
        {
            const centeringForce = forces.center;
            if (centeringForce !== undefined) {
                _simulation =
                    _simulation
                        .force('center', forceCenter().strength(.01 * centeringForce));
            }
        }

        // Inclusive (containing) Bounding Box
        {
            if (isBoundingBoxActive()) {
                _simulation = _simulation.force('box',
                                                function inclusiveBoundingBox() {
                                                    if (!isBoundingBoxActive()) return;

                                                    let i = 0, n = data.nodes.length;

                                                    for (; i < n; ++i) {
                                                        const curr_node = data.nodes[i] as Datum;
                                                        if ((curr_node.bound ?? 1) >= 0) continue;


                                                        const radius = curr_node.r * 2;

                                                        const x     = curr_node.x;
                                                        const minX  = xOffset + radius;
                                                        const maxX  = (xOffset + svgWidth) - radius;
                                                        curr_node.x = Math.max(minX, Math.min(maxX, x));

                                                        const y     = curr_node.y;
                                                        const maxY  = (height + yOffset) - radius;
                                                        const minY  = yOffset + radius;
                                                        curr_node.y = Math.max(minY, Math.min(maxY, y));

                                                        const smallest_x = curr_node?.forces?.boundary?.smallest?.x;
                                                        const largest_x  = curr_node?.forces?.boundary?.largest?.x;
                                                        if ((smallest_x ?? false) && (curr_node.x < smallest_x)) {
                                                            curr_node.x = smallest_x;
                                                        } else if ((largest_x ?? false) && (curr_node.x > largest_x)) {
                                                            curr_node.x = largest_x;
                                                        }

                                                        const smallest_y = curr_node?.forces?.boundary?.smallest?.y;
                                                        const largest_y  = curr_node?.forces?.boundary?.largest?.y;
                                                        if ((smallest_y ?? false) && (curr_node.y < smallest_y)) {
                                                            curr_node.y = smallest_y;
                                                        } else if ((largest_y ?? false) && (curr_node.y > largest_y)) {
                                                            curr_node.y = largest_y;
                                                        }
                                                    }
                                                })
            }
        }

        // Exclusive Bounding Box
        {
            if (isBoundingBoxActive()) {
                _simulation = _simulation.force('box-ex',
                                                function exclusiveBoundingBox() {
                                                    if (!isBoundingBoxActive()) return;

                                                    let i = 0, n = data.nodes.length;

                                                    for (; i < n; ++i) {
                                                        const curr_node = data.nodes[i] as Datum;
                                                        if ((curr_node.bound ?? 1) < 0) continue;

                                                        const radius = curr_node.r * 2;

                                                        const x    = curr_node.x;
                                                        const minX = xOffset - (radius);
                                                        const maxX = (xOffset + svgWidth) + (radius);

                                                        if (x > maxX) curr_node.x = maxX;
                                                        else if (x > minX && x < maxX) curr_node.x = x > xOffset ? maxX : minX;

                                                        const y    = curr_node.y;
                                                        const maxY = (height + yOffset) - radius;
                                                        const minY = yOffset + radius;

                                                        curr_node.y = Math.max(minY, Math.min(maxY, y));
                                                    }
                                                })
            }
        }

        // Exclusive Bounding Box
        {
            _simulation = _simulation.force('box-ex',
                                            function exclusiveBoundingBox() {
                                                if (!isBoundingBoxActive()) return;

                                                let i = 0, n = data.nodes.length;

                                                for (; i < n; ++i) {
                                                    const curr_node = data.nodes[i] as Datum;
                                                    if ((curr_node.bound ?? 1) < 0) continue;

                                                    const radius = curr_node.r * 2;

                                                    const x    = curr_node.x;
                                                    const minX = xOffset - (radius);
                                                    const maxX = (xOffset + svgWidth) + (radius);

                                                    if (x > maxX) curr_node.x = maxX;
                                                    else if (x > minX && x < maxX) curr_node.x = x > xOffset ? maxX : minX;

                                                    const y    = curr_node.y;
                                                    const maxY = (height + yOffset) - radius;
                                                    const minY = yOffset + radius;

                                                    if (y > maxY) curr_node.y = maxY;
                                                    else if (y > minY && y < maxY) curr_node.y = y > yOffset ? maxY : minY;
                                                }
                                            })
        }
    }

    // ---

    // Start the simulation
    {
        simulation
            ?.alphaTarget(.9)
            .restart();
        setSimulation(_simulation);
    }
}