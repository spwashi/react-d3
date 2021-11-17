import {VizConfigState} from '../../../../app/components/config/config/types';
import {useCallback, useEffect, useState} from 'react';
import {ClusterDatum} from '../types/types';
import {readConfig} from '../../../../app/components/config/util/read';
import {useDebounce} from '../../../../hooks/util/useDebounce';
import {cluster_init} from '../datum/init';
import {DataController, useDataController, useDatumQuantityStabilizer} from '../../nodes/hooks/useDatumQuantityStabilizer';


export function useConfigUpdate(config: VizConfigState, controller: DataController<ClusterDatum>) {
    const radius = readConfig(config.clusterRadius, 10);
    useEffect(() => {
        const items = controller.items;
        items.forEach((item, k) => {
            Object.assign(item,
                          {
                              x: item.x ?? (k * 30 * radius),
                              r: radius * (item._r ?? 1),
                          })
        })
    }, [radius, controller.items]);
}


function defaultIdSelector<Id = any>(datum: any): Id {
    return datum.id ?? null;
}
function useClusterUpdate(raw: ClusterDatum[], config: VizConfigState) {
    const sort       = useCallback((a: ClusterDatum, b: ClusterDatum) => a && b ? 0 : (a ? -1 : 1), []);
    const controller = useDataController(raw, defaultIdSelector, cluster_init, sort);
    const quantity   = useDebounce(Math.floor(readConfig(config.clusterN, 1000)), 500);
    useConfigUpdate(config, controller);
    useDatumQuantityStabilizer<ClusterDatum>(controller, quantity, 'clusters');
    return controller;
}
export function useClusters(config: VizConfigState) {
    const [raw] = useState([])
    return useClusterUpdate(raw, config);
}