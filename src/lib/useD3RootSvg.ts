import * as d3 from 'd3';
import {useMemo} from 'react';
import {ViewBox} from './viz.types';
import {DataSelector, DataSetter, Datum, LinkDefinition, SvgComponentSelection, SvgSelection} from './data.types';


export type D3ComponentInitializer<ComponentSelectionType, ItemData = any> = (this: D3OutputItem<ComponentSelectionType, ItemData>, s: SvgSelection) => void;

export interface D3Component<ComponentSelectionType, ItemData = any> {
    init: D3ComponentInitializer<ComponentSelectionType>;
    select: DataSelector<ComponentSelectionType>,
    data: ItemData;
    format: (items: ComponentSelectionType | undefined, simulation?: d3.Simulation<any, any>) => ComponentSelectionType | undefined,
}

type D3InputList<T> = { [P in keyof T]: D3Component<T[P]> }
type D3OutputItem<SelectionType, ItemData = any> = {
    element: D3Component<SelectionType>;
    itemSelector: DataSelector<SelectionType>;
    setData: DataSetter<ItemData, SelectionType>;
};
type D3OutputList<T> = {
    [P in keyof T]: D3OutputItem<T[P]>
}

export function useD3RootSvg(
    offset: ViewBox,
    information: { data: Datum[], links: LinkDefinition[] },
    elements: D3InputList<any[]>,
) {
    let components: D3OutputList<any[]> =
            elements.map(
                (element) => {
                    return {
                        element:      element,
                        itemSelector: element.select,
                        setData:      (svg, data) => (element.select(svg) as SvgComponentSelection<any, any>)?.data(data),
                    }
                },
            );

    const svg =
              useMemo(
                  () => {
                      let selection: SvgSelection = d3.create('svg');
                      const _svg: SvgSelection    = selection.attr('viewBox', offset.join(' '))
                                                             .attr('overflow', 'visible')
                                                             .attr('style', 'border: thin solid red')
                      ;

                      // Initialize each component
                      components.forEach(component => component.element.init.bind(component)(_svg))

                      return _svg;
                  },
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  [information.data, information.links, ...offset],
              );
    return {
        selection:  svg,
        components: components,
    }
}