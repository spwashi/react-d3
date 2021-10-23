import {VizConfigState} from '../../app/components/config/config/types';
import {useEffect, useMemo, useState} from 'react';
import {NodeDatum} from '../../root/data/components/node.types';
import {readConfig} from '../../app/components/config/util/read';
import {interpolateBlues} from 'd3';

export function useExampleNodes(config: VizConfigState) {
    const [activeNodes, setActiveNodes] = useState<NodeDatum[]>([]);
    const [map]                         = useState(() => new Map());
    const interpolator                  = useMemo(() => interpolateBlues, [])

    useEffect(
        () => {
            const nodes =
                      Array.from(Array(Math.floor(readConfig(config.n, 1000)) ?? 1))
                           .map((i, k) => {
                               let node =
                                       {
                                           id: k,

                                           r: readConfig(config.radius, 10),

                                           color:
                                               k === 3 ? '#42a5c3'
                                                       : interpolator(1),

                                           dragBehavior:
                                               {
                                                   savePos: true,
                                               },
                                       } as NodeDatum;

                               map.set(
                                   node.id,
                                   node,
                               );

                               return node;
                           });
            setActiveNodes(nodes);
        },
        [config.n],
    );

    useEffect(
        () => {
            activeNodes
                .forEach(node => {
                    node.r = (readConfig(config.radius) ?? 0);
                    return node;
                });
        },
        [
            config.radius,
            activeNodes,
        ],
    );
    return {
        map,
        list: activeNodes,
    };
}