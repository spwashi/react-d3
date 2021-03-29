import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {VizConfigState} from './app/components/config/config/types';
import {NodeDatum} from './simulation/data/types/node';
import {interpolateBlues} from 'd3';
import {AppConfig} from './app/components/config/components/AppConfig';
import {useAppConfig} from './app/components/config/hooks';
import {readConfig} from './app/components/config/util/read';
import {ConfiguredVisualization} from './app/components/viz';
import {AppWrapper} from './app/wrapper.styled';
import {GlobalStyle} from './app/global.styled';
import {defaultConfig} from './app/config/config';
import {EdgeDatum} from './simulation/data/types/edge';


export {};

let x_quantization = Math.PI * 10;
let y_quantization = Math.PI * 16;
function useRandomNodes(config: VizConfigState) {
    const idCounter              = useRef(0);
    const isActiveRef            = useRef(true);
    const stopGenerating         = () => isActiveRef.current = false;
    const incrementID            = () => idCounter.current = (idCounter.current + 1);
    const [list, setActiveNodes] = useState<NodeDatum[]>(() => [])
    const interpolator           = useMemo(() => interpolateBlues, [])

    const map = useRef(new Map).current;

    const initDatumPosition = useCallback((node: Partial<NodeDatum>) => {
                                              if (typeof node.id === 'undefined') throw new Error('Node does not have an ID');
                                              let x  = (.5 * Math.cos(node.id * Math.PI / x_quantization)) + .5;
                                              let y  = (.5 * Math.sin(node.id * Math.PI / (y_quantization))) + .5;
                                              node.x = (x * readConfig(config.svgWidth, 1)) + readConfig(config.offsetX, 0);
                                              node.y = (y * readConfig(config.svgHeight, 1)) + readConfig(config.offsetY, 0)
                                          },
                                          [])
    const initDatum         = useCallback((id): NodeDatum => {
                                              let radius            = readConfig(config.radius) ?? 0;
                                              const node: NodeDatum = {};

                                              node.id = +id;
                                              if (node.id === 2000) stopGenerating();

                                              node.r = (radius);
                                              initDatumPosition(node)
                                              node.color = interpolator(node.y ?? .5);

                                              map.set(node.id, node);
                                              return node;
                                          },
                                          [config, list.length]);
    const updateNodes       = useCallback(() => {
                                              const i = list.length;
                                              incrementID();
                                              const nodes = [initDatum(idCounter.current), ...list];
                                              if (i > 30) {
                                                  nodes.splice(30).forEach(node => map.delete(node.id))
                                              }
                                              setActiveNodes(nodes)
                                          },
                                          [list]);

    useLayoutEffect(() => {
        if (!isActiveRef.current) return;
        const i = setTimeout(() => { updateNodes() }, readConfig(config.interval, 200));
        return () => { clearTimeout(i); }
    }, [list]);

    useEffect(() => {
        setActiveNodes(list.map(node => {
                           node.r = readConfig(config.radius) ?? 0;
                           return node;
                       }),
        )
    }, [config.radius]);
    return {
        map,
        list,
    };
}
function useRandomRelationships() {
    let list = useMemo(() => [] as EdgeDatum[], []);
    return {
        list,
    }
}

function App(model: VizConfigState) {
    const [config, setConfig] = useAppConfig(model);
    const dataRef             = useRef({nodes: [] as NodeDatum[], edges: [] as EdgeDatum[]});
    const {list: nodes}       = useRandomNodes(config);
    const {list: edges}       = useRandomRelationships()
    const data                = useMemo(() => {
        dataRef.current.nodes = nodes;
        dataRef.current.edges = edges;
        return dataRef.current;
    }, [nodes, edges]);
    return (
        <div className={'d3app-wrapper-inner'}>
            <AppConfig setConfig={setConfig} config={config}/>
            <ConfiguredVisualization data={data} config={config}/>
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