import {VizConfigState} from '../../../../app/components/config/config/types';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {NodeDatum} from '../../../../data/components/nodes/types';
import {readConfig} from '../../../../app/components/config/util/read';
import {interpolateBlues} from 'd3';
import {useDebounce} from '../../useDebounce';
import {ClusterDatum} from '../../../../data/components/clusters/types';
import {cluster_selectXCorrection, cluster_selectYCorrection} from '../../../../data/components/clusters/selectors/datum';

function calculateRadius(config: VizConfigState, n: { [k: string]: any } | null = null) {
    const c = readConfig(config.radius) ?? 0;
    if (n?.id === 1) {
        return c;
    }
    return c;
}
export function useExampleNodes(config: VizConfigState, clusterMap: Map<any, ClusterDatum>) {
    const [nodeData, saveNodes]         = useState([] as NodeDatum[]);
    const [activeNodes, setActiveNodes] = useState<NodeDatum[]>(nodeData);
    const [map, setMap]                 = useState(() => new Map());
    const interpolator                  = useMemo(() => interpolateBlues, [])
    const n                             = useDebounce(readConfig(config.n, 1000), 500);
    const [prevN, setPrevN]             = useState<null | number>(null);
    const setN                          =
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
            const length = nodeData.length;
            if (length === n) return;
            if (length >= n) {
                const removalCount = length - n;
                nodeData.splice(-removalCount, removalCount);
                const map = new Map();
                nodeData.forEach(node => map.set(node.id, node))
                setMap(map)
                setActiveNodes(nodeData.slice())
                return;
            }
            const _n = Math.floor(n);
            nodeData.push(
                ...Array.from((Array((_n ?? 1) - length)))
                        .map((i, k) => {
                            let d: NodeDatum;
                            d = {
                                id:           k + length,
                                forces:       {
                                    inclination(d) {
                                        d.x = d.x ?? 0;
                                        d.x = cluster_selectXCorrection(d?.cluster, d.x);
                                        d.y = cluster_selectYCorrection(d?.cluster, d.y ?? 0);
                                    },
                                },
                                r:            calculateRadius(config, {id: k}),
                                color:        k === 3 ? '#42a5c3' : interpolator(1),
                                dragBehavior: {savePos: true},
                            };
                            return d as NodeDatum;
                        }),
            );
            const map = new Map();
            nodeData.forEach(node => map.set(node.id, node))
            setMap(map)
            setActiveNodes(nodeData.slice());
        },
        [n, interpolator, config, nodeData],
    );
    useEffect(
        () => {
            saveNodes(activeNodes);
            const id = setInterval(() => {saveNodes(activeNodes)}, 10000);
            return () => {
                clearInterval(id)
            };
        },
        [activeNodes],
    );
    useEffect(
        () => {
            activeNodes.forEach(node => {
                node.r       = calculateRadius(config, node);
                node.cluster = clusterMap.get((node.id ?? 1) % clusterMap.size) ?? undefined;
                node.cluster?.nodes?.add(node);

                return node;
            });
        },
        [config, activeNodes, activeNodes.length, clusterMap],
    );
    return {
        map,
        list: activeNodes,
    };
}