import {VizConfigState} from '../../app/components/config/config/types';
import {useMemo} from 'react';
import {NodeDatum} from '../components/nodes/types/types';
import {EdgeDatum} from '../components/edges/types/types';
import {ClusterDatum} from '../components/clusters/types/types';
import {SimulationData} from '../types';
import {useClusters} from '../components/clusters/hooks/useClusters';
import {useNodes} from '../components/nodes/hooks/useNodes';
import {useEdges} from '../components/edges/hooks/useEdges';
import {clusterComponent} from '../components/clusters/component';
import {nodeComponent} from '../components/nodes/component';
import {edgeComponent} from '../components/edges/component';

export function useData(config: VizConfigState) {
    const dataRef = useMemo(() => ({
        nodes:    [
                      {_r: 3},
                      {_r: 5},
                      {_r: 6},
                      {_r: 10},
                      {_r: 30},
                  ] as NodeDatum[],
        edges:    [] as EdgeDatum[],
        clusters: [] as ClusterDatum[],
    } as SimulationData), []);

    const clusters = useClusters(config)
    const nodes    = useNodes(config, dataRef.nodes ?? [], clusters);
    const edges    = useEdges(config, nodes)

    const data =
              useMemo(() => {
                  dataRef.nodes    = nodes.list;
                  dataRef.edges    = edges.list;
                  dataRef.clusters = clusters.list;
                  return dataRef;
              }, [nodes.list, edges.list, clusters.list]);

    const components = useMemo(() => [clusterComponent, nodeComponent, edgeComponent], []);
    return {components, data};
}