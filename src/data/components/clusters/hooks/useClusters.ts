import {VizConfigState} from '../../../../app/components/config/config/types';
import {useCallback, useEffect, useState} from 'react';
import {ClusterDatum} from '../types/types';
import {readConfig} from '../../../../app/components/config/util/read';
import {useDebounce} from '../../../../util/hooks/useDebounce';
import {cluster_init} from '../datum/init';
import {useLocalStorage} from '../../../../util/hooks/useLocalStorage';
import _ from 'lodash';

function useClusterUpdate(raw: ClusterDatum[], config: VizConfigState) {
    const [activeClusters, setActiveClusters] = useState<ClusterDatum[]>(raw);
    const [map, setMap]                       = useState(() => new Map());
    const clusterCount                        = useDebounce(readConfig(config.clusterN, 1000), 500);
    const [saved, setSaved]                   = useLocalStorage('clusters', {} as Partial<ClusterDatum>)

    const removeClusters =
              useCallback((data: ClusterDatum[], clusterCount: number) => {
                              const removalCount = activeClusters.length - clusterCount;
                              data.splice(-removalCount, removalCount);
                              const map = new Map();
                              data.forEach(cluster => map.set(cluster.id, cluster))
                              setMap(map)
                              setActiveClusters(data.slice())
                          },
                          [setMap, setActiveClusters]);

    const addClusters =
              useCallback(() => {
                  const count     = Math.floor(clusterCount);
                  const currLen   = activeClusters.length;
                  const seedArray = Array.from((Array((count ?? 1) - currLen)));
                  raw.push(...seedArray.map((i, k) => {
                      const cluster: ClusterDatum = cluster_init(k);

                      cluster.CLUSTER_COUNT = count;

                      cluster.r                    = readConfig(config.clusterRadius);
                      cluster.x                    = (k + currLen) * 30 * cluster.r;
                      cluster.k                    = k;
                      cluster.dragBehavior         = cluster.dragBehavior ?? {};
                      cluster.dragBehavior.drag    = (event, d) => {
                          const x = d._fx ?? event.x;
                          const y = d._fy ?? event.y;

                          d.x = d.fx = x;
                          d.y = d.fy = y;
                      }
                      cluster.dragBehavior.release = (event, d) => {
                          setSaved({
                                       ...saved,
                                       [d.id ?? '']: {
                                           x:      d.x,
                                           y:      d.y,
                                           fx:     d.fx,
                                           fy:     d.fy,
                                           forces: {
                                               electronegativity: d.forces?.electronegativity,
                                           },
                                       },
                                   })
                      }
                      _.merge(cluster, saved[cluster.id ?? ''] ?? {})

                      return cluster as ClusterDatum;
                  }));

                  const map  = new Map();
                  const list = raw.map(cluster => map.set(cluster.id, cluster) && cluster)

                  setMap(map)
                  setActiveClusters(list);
              }, [setMap, setActiveClusters, clusterCount, config, activeClusters]);

    useEffect(() => {
                  const length = raw.length;
                  if (length === clusterCount) return;
                  if (length >= clusterCount) return removeClusters(raw, clusterCount);
                  addClusters();
              },
              [clusterCount, raw, addClusters, removeClusters]);

    return {list: activeClusters, map};
}
export function useClusters(config: VizConfigState) {
    const [raw]       = useState([] as ClusterDatum[]);
    const {list, map} = useClusterUpdate(raw, config);
    return {map, list};
}