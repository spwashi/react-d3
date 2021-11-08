import {VizConfigState} from './app/components/config/config/types';
import {useMemo, useRef} from 'react';
import {NodeDatum} from './data/components/nodes/types/types';
import {EdgeDatum} from './data/components/edges/types/types';
import {ClusterDatum} from './data/components/clusters/types/types';
import {SimulationData} from './data/types';
import {useClusters} from './data/components/clusters/hooks/useClusters';
import {useNodes} from './data/components/nodes/hooks/useNodes';
import {useEdges} from './data/components/edges/hooks/useEdges';
import {clusterComponent} from './data/components/clusters';
import {nodeComponent} from './data/components/nodes';
import {edgeComponent} from './data/components/edges';

export function useData(config: VizConfigState) {
    const dataRef = useRef({
                               nodes:    [] as NodeDatum[],
                               edges:    [] as EdgeDatum[],
                               clusters: [] as ClusterDatum[],
                           } as SimulationData);

    const clusters = useClusters(config)
    const nodes    = useNodes(config, clusters);
    const edges    = useEdges(config, nodes)

    const data =
              useMemo(() => {
                  dataRef.current.nodes    = nodes.list;
                  dataRef.current.edges    = edges.list;
                  dataRef.current.clusters = clusters.list;
                  return dataRef.current;
              }, [nodes.list, edges.list, clusters.list]);

    const components = useMemo(() => [clusterComponent, nodeComponent, edgeComponent], []);
    return {components, data};
}