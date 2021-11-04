import {NodeDatum} from './data/components/nodes/_types/node.types';
import {EdgeDatum} from './data/components/edges/_types/edge.types';
import {useEffect, useMemo} from 'react';
import {VizConfigState} from './app/components/config/config/types';
import {readConfig} from './app/components/config/util/read';

export function useExampleEdges(config: VizConfigState, map: Map<any, NodeDatum>) {
    const list: EdgeDatum[] = useMemo(
        () => {
            const n     = map.size;
            const edges =
                      Array.from(Array(n))
                           .flatMap((i, k) => [
                               {source: k, target: Math.abs((k - 2))},
                               {source: k, target: 1},
                               k % 2 ? {source: k, target: k + 2} : false,
                           ]).filter(Boolean) as EdgeDatum[];


            function completeNode(edge: EdgeDatum & { width?: number }) {
                edge.source = typeof edge.source !== 'object' ? (edge.source) : edge.source;
                edge.target = typeof edge.target !== 'object' ? (edge.target) : edge.target;
                if (!map.get(edge.source) || !map.get(edge.target)) return false;

                edge.strength = edge.strength ?? Math.random();
                return edge;
            }

            return edges
                .map(completeNode)
                .filter(Boolean) as EdgeDatum[];
        },
        [map.size, config.edgeStrength, config.nodeStrength],
    );

    useEffect(() => {
        (list as (EdgeDatum & { width: number })[])
            .map((edge) => edge.width = readConfig(config.edgeWidth, 1))
    }, [config.edgeWidth, list]);

    return {list}
}