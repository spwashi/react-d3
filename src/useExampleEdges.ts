import {NodeDatum} from './root/data/components/node.types';
import {EdgeDatum} from './root/data/components/edge.types';
import {useEffect, useMemo} from 'react';
import {VizConfigState} from './app/components/config/config/types';
import {readConfig} from './app/components/config/util/read';

export function useExampleEdges(config: VizConfigState, map: Map<any, NodeDatum>) {
    const list: EdgeDatum[] =
              useMemo(
                  () => {
                      const edges =
                                Array.from(Array(map.size))
                                     .flatMap((i, k) => [
                                         {source: k, target: Math.abs((k - 20))},
                                         {source: k, target: 1},
                                     ]);


                      function completeNode(edge: EdgeDatum & { width?: number }) {
                          edge.source = typeof edge.source !== 'object' ? map.get(edge.source) : edge.source;
                          edge.target = typeof edge.target !== 'object' ? map.get(edge.target) : edge.target;
                          if (!edge.source || !edge.target) return false;

                          edge.strength = edge.strength ?? Math.random();
                          return edge;
                      }

                      return edges
                          .map(completeNode)
                          .filter(Boolean) as EdgeDatum[];
                  },
                  [map.size, map, config.n],
              );

    useEffect(() => {
        (list as (EdgeDatum & { width: number })[])
            .map((edge) => edge.width = readConfig(config.edgeWidth, 1))
    }, [config.edgeWidth, list]);


    return {list}
}