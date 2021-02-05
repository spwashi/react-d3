import * as d3 from 'd3';
import {useMemo} from 'react';
import {SvgComponentSelection, SvgSelection} from './data.types';
import {ComponentManagersObject, SvgComponentManagers, SvgRoot, UseD3RootSvgParams} from './useD3RootSvg.types';


/**
 * React Hook that creates a D3 SVG element bas
 *
 * @param offset
 * @param information
 * @param elements
 */
export function useD3RootSvg({offset, information, components}: UseD3RootSvgParams): SvgRoot {
    let componentManagers: ComponentManagersObject<any[]> =
            components
                .map(
                    (element) => ({
                        element,
                        itemSelector: element.select,
                        setData:      (svg, data) => (element.select(svg) as SvgComponentSelection<any, any>)?.data(data),
                    }),
                );

    const svg =
              useMemo(
                  () => {
                      let selection: SvgSelection = d3.create('svg');
                      const _svg: SvgSelection    = selection.attr('viewBox', offset.join(' '))
                                                             .attr('overflow', 'visible')
                                                             .attr('style', 'border: thin solid red')
                      ;

                      _svg.append('g')
                          .append('circle')
                          .attr('r', 4)
                          .attr('cx', 0)

                      // Initialize each component
                      componentManagers.forEach(component => component.element.initComponent.bind(component)(_svg))

                      return _svg;
                  },
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  [information.data, information.links, ...offset],
              );

    return {svg, componentManagers}
}


/**
 * Based on the "root" SVG selection, return a set of components that can be accessed as an object
 *
 * @param root
 * @returns SvgComponentManagers
 */
export function getComponentManagers(root: SvgRoot): SvgComponentManagers {
    const [lines, circles] = root.componentManagers;
    return {lines, circles}
}
