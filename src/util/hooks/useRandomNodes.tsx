import {VizConfigState} from '../../app/components/config/config/types';
import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {NodeDatum} from '../../root/data/components/node.types';
import {interpolateBlues} from 'd3';
import {readConfig} from '../../app/components/config/util/read';

export function useRandomNodes(config: VizConfigState) {
    const x_quantization                = Math.PI * 10;
    const y_quantization                = Math.PI * 16;
    const idCounter                     = useRef(0);
    const isActiveRef                   = useRef(true);
    const stopGenerating                = () => isActiveRef.current = false;
    const incrementID                   = () => idCounter.current = (idCounter.current + 1);
    const [activeNodes, setActiveNodes] = useState<NodeDatum[]>(() => [])
    const interpolator                  = useMemo(() => interpolateBlues, [])
    const [map]                         = useState(() => new Map());


    const initDatum =
              useCallback((id): NodeDatum => {
                  let radius            = readConfig(config.radius) ?? 0;
                  const node: NodeDatum = {};
                  console.log(id);
                  node.id = +id;
                  if (node.id === 200) stopGenerating();

                  node.r = (radius);

                  initDatumPosition(node)
                  node.color = interpolator(node.y ?? .5);

                  map.set(node.id, node);
                  return node;

                  // helper functions
                  function initDatumPosition(node: Partial<NodeDatum>) {
                      if (typeof node.id === 'undefined') throw new Error('Node does not have an ID');
                      let x  = (.5 * Math.cos(node.id * Math.PI / x_quantization)) + .5;
                      let y  = (.5 * Math.sin(node.id * Math.PI / (y_quantization))) + .5;
                      node.x = (x * readConfig(config.svgWidth, 1)) + readConfig(config.offsetX, 0);
                      node.y = (y * readConfig(config.svgHeight, 1)) + readConfig(config.offsetY, 0)
                  }
              }, [config, activeNodes.length]);

    const updateNodes =
              useCallback(() => {
                  incrementID();
                  const nodes  = [initDatum(idCounter.current), ...activeNodes];
                  const length = activeNodes.length;
                  if (length > 30) {
                      nodes.splice(30).forEach(node => map.delete(node.id))
                  }
                  setActiveNodes(nodes)
              }, [activeNodes]);

    useLayoutEffect(() => {
        if (!isActiveRef.current) return;
        const ms = readConfig(config.interval, 1000);
        const i  = setTimeout(() => { updateNodes() }, ms);
        return () => { clearTimeout(i); }
    }, [activeNodes]);

    useEffect(() => {
        setActiveNodes(
            activeNodes.map(node => {
                node.r = readConfig(config.radius) ?? 0;
                return node;
            }),
        )
    }, [config.radius]);
    return {
        map:  map,
        list: activeNodes,
    };
}