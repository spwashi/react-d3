import {VizConfigState} from '../../app/components/config/config/types';
import {useEffect, useState} from 'react';
import {NodeDatum} from '../../root/data/components/node.types';
import {readConfig} from '../../app/components/config/util/read';

export function useExampleNodes1(config: VizConfigState) {
    const [activeNodes, setActiveNodes] = useState<NodeDatum[]>([]);
    const [map]                         = useState(() => new Map());

    useEffect(() => {
        const nodes = Array.from(Array(10)).map((i, k) => {
            let node = {
                id:           k,
                r:            readConfig(config.radius, 10),
                color:        '#ffffff',
                dragBehavior: {
                    savePos: true,
                },
            } as NodeDatum;
            map.set(node.id, node)
            return node
        });
        console.log(nodes)
        setActiveNodes(nodes);
    }, []);

    useEffect(() => {
        activeNodes.forEach(node => {
            node.r = readConfig(config.radius) ?? 0;
            return node;
        });
    }, [config.radius, activeNodes]);
    console.log(activeNodes)
    return {
        map,
        list: activeNodes,
    };
}