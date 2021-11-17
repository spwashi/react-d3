import {VizConfigState} from '../config/types';
import {useMemo} from 'react';
import {readConfig} from '../util/read';
import {BoundingForceConfig, Force, ForceConfiguration} from '../../../../simulation/forces/types';
import {nodeForces} from '../../../../simulation/forces/options/nodeForces';
import {edgeForces} from '../../../../simulation/forces/options/edgeForces';
import {center} from '../../../../simulation/forces/options/center';
import {internal} from '../../../../simulation/forces/options/internal';
import {collision} from '../../../../simulation/forces/options/collision';
import {bounding} from '../../../../simulation/forces/options/bounding';
import {useDebounce} from '../../../../hooks/util/useDebounce';

export function useForceInitialization(config: VizConfigState) {
    const forces: ForceConfiguration = useMemo(() => ({forces: [], options: {}}), []);

    const collisionForce  = useDebounce(readConfig(config.collisionForce, !!0), 200);
    const doCenter        = useDebounce(readConfig(config.useCenteringForce, !!0), 200);
    const doInternal      = useDebounce(readConfig(config.useInternalForce, !!0), 200);
    const edgeStrength    = useDebounce(readConfig(config.edgeStrength, 0), 200);
    const height          = useDebounce(readConfig(config.svgHeight), 200);
    const nodeCharge      = useDebounce(readConfig(config.nodeStrength, 0), 200);
    const useBoundingBox  = readConfig(config.useBoundingBox, false);
    const useEdgeStrength = readConfig(config.useEdgeStrength, false);
    const useNodeStrength = readConfig(config.useNodeStrength, false);
    const width           = useDebounce(readConfig(config.svgWidth), 200);
    const velocityDecay   = readConfig(config.velocityDecay, 0);

    return useMemo(
        () => {
            const offsetX = 0;
            const offsetY = 0;

            return {
                options: {
                    bounding:
                        {
                            width,
                            height,
                            x:      {max: width / 2 + offsetX, min: -width / 2 - offsetX},
                            y:      {max: height / 2 - offsetY, min: -height / 2 + offsetY},
                            option: readConfig(config.boundingOption, 0),
                        } as BoundingForceConfig,
                    center:        doCenter ? 1 : 0,
                    nodeCharge:    nodeCharge,
                    edgeStrength:  edgeStrength,
                    internal:      doInternal,
                    velocityDecay: velocityDecay / 100,
                },
                forces:
                         [
                             (useNodeStrength && !!nodeCharge && nodeForces) as Force | false,
                             (useEdgeStrength && !!edgeStrength && edgeForces) as Force | false,
                             (doCenter && center) as Force | false,
                             (doInternal && internal) as Force | false,
                             (collisionForce && collision) as Force | false,
                             (useBoundingBox && bounding) as Force | false,
                         ].filter(Boolean) as Force[],
            };
        },
        [
            config,
            forces,
            collisionForce,
            doCenter,
            doInternal,
            edgeStrength,
            height,
            nodeCharge,
            useBoundingBox,
            useEdgeStrength,
            useNodeStrength,
            width,
        ],
    );
}