import React, {useMemo, useRef} from 'react';
import {VizConfigState} from './app/components/config/config/types';
import {NodeDatum} from './root/data/components/node.types';
import {AppConfig} from './app/components/config/components/AppConfig';
import {useAppConfig} from './app/components/config/hooks';
import {ConfiguredVisualization} from './app/components/viz';
import {AppWrapper} from './app/wrapper.styled';
import {GlobalStyle} from './app/global.styled';
import {defaultConfig} from './app/config/config';
import {EdgeDatum} from './root/data/components/edge.types';
import {useExampleNodes1} from './util/hooks/useExampleNodes1';


export {};


function useRandomRelationships(map: Map<any, NodeDatum>) {
    const list: EdgeDatum[] = useMemo(
        () => {
            const edges =
                      [
                          {source: 1, target: 2},
                      ];

            function completeNode(edge: EdgeDatum) {
                edge.source = typeof edge.source !== 'object' ? map.get(edge.source) : edge.source;
                edge.target = typeof edge.target !== 'object' ? map.get(edge.target) : edge.target;
                if (!edge.source || !edge.target) return false;

                edge.strength = edge.strength ?? .01;
                return edge;
            }

            return edges.map(completeNode).filter(Boolean) as EdgeDatum[];
        },
        [map.size, map],
    );
    return {list}
}

function App(model: VizConfigState) {
    const [config, setConfig]         = useAppConfig(model);
    const dataRef                     = useRef({nodes: [] as NodeDatum[], edges: [] as EdgeDatum[]});
    const {list: nodes, map: nodeMap} = useExampleNodes1(config);
    const {list: edges}               = useRandomRelationships(nodeMap)
    const data                        = useMemo(() => {
        dataRef.current.nodes = nodes;
        dataRef.current.edges = edges;
        return dataRef.current;
    }, [nodes, edges]);
    return (
        <div className={'d3app-wrapper-inner'}>
            <AppConfig
                config={config}
                setConfig={setConfig}
            />
            <ConfiguredVisualization
                data={data}
                config={config}
            />
        </div>
    );
}

/**
 *
 * @constructor
 */
export function DefaultApplication() {
    const AppInner = App(defaultConfig);
    return (
        <AppWrapper className={'d3app-wrapper'}>
            <GlobalStyle/>
            {AppInner}
        </AppWrapper>
    );
}