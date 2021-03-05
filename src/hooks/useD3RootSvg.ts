import {create} from 'd3';
import {useMemo} from 'react';
import {SvgSelection} from '../data/data.types';
import {SimulationRoot, SvgComponentManagers, UseD3RootSvgParams} from './simulation.types';


/**
 * React Hook that creates a D3 SVG element bas
 *
 * @param offset
 * @param information
 * @param elements
 */
export function useD3RootSvg({offset, data, components}: UseD3RootSvgParams): SimulationRoot {
    const componentManagers = components
    const svg               =
              useMemo(
                  () => {
                      let selection: SvgSelection = create('svg');
                      const _svg: SvgSelection    = selection.attr('viewBox', offset.join(' '))
                                                             .attr('overflow', 'visible')
                                                             .attr('style', 'border: thin solid red');

                      _svg.append('g')
                          .append('circle')
                          .style('fill', 'white')
                          .attr('r', 4)
                          .attr('cx', 0)

                      // Initialize each component
                      componentManagers.forEach(component => component.initComponent(_svg))

                      return _svg;
                  },
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  [data.nodes, data.edges, ...offset],
              );

    return {svg, componentManagers}
}


/**
 * Based on the "root" SVG selection, return a set of components that can be accessed as an object
 *
 * @param root
 * @returns SvgComponentManagers
 */
export function getComponentManagers(root: SimulationRoot): SvgComponentManagers {
    const [edges, nodes] = root.componentManagers;
    return {edges, nodes};
}
