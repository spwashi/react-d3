import {VizConfigState} from '../../../../app/components/config/config/types';
import {useCallback, useEffect, useState} from 'react';
import {NodeDatum} from '../types/types';
import {readConfig} from '../../../../app/components/config/util/read';
import {interpolateBlues} from 'd3';
import {useDebounce} from '../../../../hooks/util/useDebounce';
import {ClusterDatum} from '../../clusters/types/types';
import {node_colorInit, node_init} from '../datum/init';

function calculateRadius(config: VizConfigState, n: NodeDatum | null = null) {
    const c = readConfig(config.radius) ?? 0;
    if (n?._r) {
        return c * (+n._r);
    }
    if (n?.id === 1) {
        return c;
    }
    return c;
}

/**
 * Update Nodes when raw data or config changes
 * @param raw
 * @param config
 */
function useNodeUpdate(raw: NodeDatum[], config: VizConfigState) {
    const [activeNodes, setActiveNodes] = useState<NodeDatum[]>(raw);
    const [map, setMap]                 = useState(() => new Map());
    const nodeCount                     = useDebounce(readConfig(config.n, 1000), 500);

    const removeNodes =
              useCallback((data: NodeDatum[], nodeCount: number) => {
                              const removalCount = activeNodes.length - nodeCount;
                              data.splice(-removalCount, removalCount);
                              const map = new Map();
                              data.forEach(node => map.set(node.id, node))
                              setMap(map)
                              setActiveNodes(data.slice())
                          },
                          [setMap, setActiveNodes]);
    const addNodes    =
              useCallback(() => {
                  const count        = Math.floor(nodeCount);
                  const currLen      = activeNodes.length;
                  const seedArray    = Array.from((Array((count ?? 1) - currLen)));
                  const interpolator = readConfig(config.colorInterpolator, interpolateBlues);
                  raw.push(...seedArray.map((i, k) => {
                      let d: NodeDatum;
                      d            = node_init(k + currLen);
                      d.k          = k;
                      d.NODE_COUNT = count;
                      d.color      = node_colorInit(d, interpolator);
                      d.r          = readConfig(config.radius);
                      return d as NodeDatum;
                  }));

                  const map  = new Map();
                  const list = raw.map(node => map.set(node.id, node) && node)

                  setMap(map)
                  setActiveNodes(list);
              }, [setMap, setActiveNodes, nodeCount, config, activeNodes])
    useEffect(() => {
                  const length = raw.length;
                  if (length === nodeCount) return;
                  if (length >= nodeCount) return removeNodes(raw, nodeCount);
                  addNodes();
              },
              [nodeCount, raw, addNodes, removeNodes]);
    return {list: activeNodes, map};
}

/**
 * Update Nodes when Clusters change
 *
 * @param activeNodes
 * @param config
 * @param clusterMap
 */
function useNodeClusterUpdate(activeNodes: NodeDatum[], config: VizConfigState, clusterMap: Map<any, ClusterDatum>) {
    const size = clusterMap.size;
    useEffect(
        () => {
            const m = Math.floor(activeNodes.length / size);

            activeNodes.forEach(node => {
                node.r           = calculateRadius(config, node);
                const hadCluster = !!(node.cluster && node.cluster.x);
                node.cluster     = clusterMap.get(Math.floor((node.id ?? 0) / m)) ?? undefined;
                const cluster    = node.cluster;
                if (!cluster) return;
                node.x = hadCluster ? node.x : cluster.x;
                node.y = hadCluster ? node.y : cluster.y;
                cluster.nodes?.add(node);
                return node;
            });
        },
        [config, activeNodes, clusterMap, size],
    );
}

export function useNodes(config: VizConfigState, raw: NodeDatum[], {map: clusterMap}: { map: Map<any, ClusterDatum> }) {
    const {list, map} = useNodeUpdate(raw, config);
    useNodeClusterUpdate(list, config, clusterMap);
    return {map, list};
}