import {VizConfigState} from '../../app/components/config/config/types';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useClusters} from '../components/clusters/hooks/useClusters';
import {useNodes} from '../components/nodes/hooks/useNodes';
import {useEdges} from '../components/edges/hooks/useEdges';
import {clusterComponent} from '../components/clusters/component';
import {nodeComponent} from '../components/nodes/component';
import {edgeComponent} from '../components/edges/component';
import {NodeDatum} from '../components/nodes/types/types';

function useSelfReferencingNodeStream<T extends NodeDatum>() :[T[], (t: T[]) => void]{
    const [nodeData, setNodeData] = useState(() => [
        {_r: 3},
        {_r: 2},
        {_r: 2},
    ] as T[]);

    const ref = useRef(nodeData);

    useEffect(() => {
        const t = setInterval(() => {
            setNodeData([{_r: 5* Math.random()} as T, ...ref.current ?? []]);
        }, 1000)
        return () => { clearInterval(t); };
    }, []);

    return [nodeData, (current: T[]) => {ref.current = current}];
}
export function useData(config: VizConfigState) {
    const [nodeData, acknowledgeCurrentNodes] = useSelfReferencingNodeStream();

    const clusters = useClusters(config);
    const nodes    = useNodes(config, nodeData ?? []);
    const edges    = useEdges(config, nodes)

    useEffect(() => {
        nodes.items.forEach(d => {
            d.cluster = clusters.map.get(+(d.id ?? 0) % clusters.items.length);
        })
        acknowledgeCurrentNodes(nodes.items)
    }, [clusters.items, nodes.items]);


    const data =
              useMemo(() => {
                  return {
                      nodes:    nodes.items,
                      edges:    edges.items,
                      clusters: clusters.items,
                  };
              }, [nodes.items, edges.items, clusters.items]);

    const components = useMemo(() => [clusterComponent, nodeComponent, edgeComponent], []);
    return {components, data};
}