import {VizConfigState} from '../config/types';
import {ViewBox} from '../../../../viz.types';
import {useEffect, useMemo} from 'react';
import {readConfig} from '../util/read';
import {Force, ForceConfiguration} from '../../../../simulation/forces/types';
import {nodeForces} from '../../../../simulation/forces/default/forces/nodeForces';
import {edgeForces} from '../../../../simulation/forces/default/forces/edgeForces';
import {center} from '../../../../simulation/forces/default/forces/center';
import {internal} from '../../../../simulation/forces/default/forces/internal';
import {collision} from '../../../../simulation/forces/default/forces/collision';
import {useLocalStorage} from '../../../../util/hooks/useLocalStorage';
import {merge} from 'lodash';

export function useConfiguredViewBox(config: VizConfigState) {
    const viewBox: ViewBox = useMemo(() =>
                                         [
                                             readConfig(config.offsetX, 0),
                                             readConfig(config.offsetY, 0),
                                             readConfig(config.svgWidth, 100) || 1,
                                             readConfig(config.svgHeight, 100) || 1,
                                         ],
                                     [
                                         config.offsetX,
                                         config.offsetY,
                                         config.svgWidth,
                                         config.svgHeight,
                                     ])
    return viewBox;
}
export function useConfiguredForces(config: VizConfigState) {
    return useMemo(() => {
        let collisionForce    = readConfig(config.collisionForce, 0);
        let nodeForceStrength = readConfig(config.nodeStrength, 0);
        let doInternal        = readConfig(config.useInternalForce, 0);
        let doCenter          = readConfig(config.centeringForce, 0);
        let nodeLinkStrength  = readConfig(config.linkStrength, 0);

        const forces =
                  [
                      nodeForceStrength && nodeForces,
                      nodeLinkStrength && edgeForces,
                      doCenter && center,
                      doInternal && internal,
                      collisionForce && collision,
                  ].filter(i => !!i) as Force[]
        // console.log(forces.length, '-----------------')
        return ({
            options: {
                nodeCharge:   nodeForceStrength,
                center:       doCenter,
                linkStrength: nodeLinkStrength,
            },
            forces:  forces,
        } as ForceConfiguration);
    }, [config]);
}
export function useConfiguredSize(state: VizConfigState) {
    const {width, height} = state;
    return {width: readConfig(width), height: readConfig(height)};
}
export function useAppConfig<T extends VizConfigState = any>(model: T): [T, (config: Partial<T>) => void] {
    const [config, setState] = useLocalStorage<Partial<T>>('d3app__config', model)
    useEffect(() => {
        setState(
            Object.fromEntries(
                Object.entries(merge({}, config, model))
                      .map(
                          entry => [
                              entry[0], {
                                  state: entry[1]?.defaultState,
                                  ...entry[1] || {},
                              },
                          ],
                      ),
            ) as T,
        )
    }, [model])
    return [config as T, setState];
}