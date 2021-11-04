import {VizConfigState} from '../../../../app/components/config/config/types';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {ClusterDatum} from '../../../../data/components/clusters/types';
import {readConfig} from '../../../../app/components/config/util/read';
import {interpolateBlues} from 'd3';
import {useDebounce} from '../../useDebounce';

function calculateRadius(config: VizConfigState, n: { [k: string]: any } | null = null) {
    const c = readConfig(config.clusterRadius) ?? 0;
    if (n?.id === 1) {
        return c;
    }
    return c;
}
export function useExampleClusters(config: VizConfigState) {
    const [clusterData, saveClusters]         = useState([] as ClusterDatum[]);
    const [activeClusters, setActiveClusters] = useState<ClusterDatum[]>(clusterData);
    const [map, setMap]                       = useState(() => new Map());
    const interpolator                        = useMemo(() => interpolateBlues, [])
    const n                                   = useDebounce(readConfig(config.clusterN, 10), 500);

    const [prevN, setPrevN] = useState<null | number>(null);

    const setN =
              useCallback(
                  () => {
                      setPrevN(n);
                  },
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  [prevN, setPrevN],
              );
    useEffect(
        () => {
            setN();
        },
        [n, setN],
    );
    useEffect(
        () => {
            const length = clusterData.length;
            if (length === n) return;
            if (length >= n) {
                const removalCount = length - n;
                clusterData.splice(-removalCount, removalCount);
                const map = new Map();
                clusterData.forEach(cluster => map.set(cluster.id, cluster))
                setMap(map)
                setActiveClusters(clusterData.slice())
                return;
            }
            const _n = Math.floor(n);

            let y = 1;
            clusterData.push(
                ...Array.from((Array((_n ?? 1) - length)))
                        .map((i, k) => {
                            const r = calculateRadius(config, {id: k});
                            return {
                                id:    k + length,
                                r:     r,
                                nodes: new Set(),
                                // x:     10 * r * (.5 - Math.random()),
                                x: 5 * r * (k % 5),
                                y: 10 * r * Math.floor(k / 5),
                                set fy(_y) { this.y = y = _y ?? 1; },
                                get fy() { return this.y = y ?? 0; },
                                color:        k === 3 ? '#42a5c3' : interpolator(1),
                                dragBehavior: {savePos: true},
                            } as ClusterDatum;
                        }),
            );
            const map = new Map();
            clusterData.forEach(cluster => map.set(cluster.id, cluster))
            setMap(map)
            setActiveClusters(clusterData.slice());
        },
        [n, interpolator, config, clusterData],
    );
    useEffect(
        () => {
            saveClusters(activeClusters);
            const id = setInterval(() => {saveClusters(activeClusters)}, 10000);
            return () => {
                clearInterval(id)
            };
        },
        [activeClusters],
    );
    useEffect(
        () => {
            activeClusters.forEach(cluster => {
                cluster.r = calculateRadius(config, cluster);
                return cluster;
            });
        },
        [config, activeClusters, activeClusters.length],
    );
    return {
        map,
        list: activeClusters,
    };
}