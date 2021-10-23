import {VizConfigState} from '../config/types';
import {useMemo} from 'react';
import {readConfig} from '../util/read';
import {Force, ForceConfiguration} from '../../../../simulation/forces/types';
import {nodeForces} from '../../../../simulation/forces/default/forces/nodeForces';
import {edgeForces} from '../../../../simulation/forces/default/forces/edgeForces';
import {center} from '../../../../simulation/forces/default/forces/center';
import {internal} from '../../../../simulation/forces/default/forces/internal';
import {collision} from '../../../../simulation/forces/default/forces/collision';
import {bounding} from '../../../../simulation/forces/default/forces/bounding';

export function useConfiguredForces(config: VizConfigState) {
    return useMemo(() => {
        const collisionForce = readConfig(config.collisionForce, 0);

        const nodeCharge     = readConfig(config.nodeStrength, 0);
        const doInternal     = readConfig(config.internalForce, 0);
        const boundingBox    = readConfig(config.boundingBox, 0);
        const doCenter       = readConfig(config.centeringForce, 0);
        const edgeStrength   = readConfig(config.edgeStrength, 0);
        const width          = readConfig(config.width);
        const height         = readConfig(config.height);

        const layout         =
                  {
                      width, height,
                      x:      {max: height, min: -height},
                      y:      {max: height, min: -height},
                      option: readConfig(config.boundingOption, 0),
                  };

        const forces: ForceConfiguration =
                  {
                      options:
                          {
                              bounding:     layout,
                              center:       doCenter,
                              nodeCharge:   nodeCharge,
                              edgeStrength: edgeStrength,
                          },
                      forces:
                          [
                              nodeCharge && nodeForces,
                              edgeStrength && edgeForces,
                              doCenter && center,
                              doInternal        && internal,
                              collisionForce    && collision,
                              boundingBox       && bounding,
                          ].filter(i => !!i) as Force[],
                  };
        return forces;
    }, [config]);
}