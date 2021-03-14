import {drag as d3drag, Simulation} from 'd3';
import {D3NodeLabelSelection, D3NodeSelection, SvgSelection} from '../../../data/data.types';
import {NodeComponentManager} from '../../../hooks/simulation.types';
import {SimulationData} from '../types/types';
import {Datum} from '../../../data/types/datum';
import {dragged} from '../../../util/dragged';
import {useContext} from 'react';
import {SimulationContext} from '../../context/context';

export const d_selectX      = (d: Datum | undefined) => d?.x ?? null;
export const d_selectY      = (d: Datum | undefined) => d?.y ?? null;
export const d_selectRadius = (d: Datum | undefined) => d?.r || 1;


export function useNodes(data: SimulationData): NodeComponentManager {
    const simulationContext = useContext(SimulationContext);

    return {
        data: data.nodes,
        initComponent(svg: SvgSelection) {
            const s_g           = svg.append('g')
                                     .attr('class', 'nodes')
                                     .selectAll('g.node');
            const s_nodeWrapper = s_g.data(data.nodes)
                                     .enter()
                                     .append('g')
                                     .classed('node-wrapper', true);
            const s_nodes       = s_nodeWrapper.append('circle')
                                               .style('stroke', 'white');
            s_nodeWrapper.style('fill', 'white')
                         .append('text')
                         .attr('text-anchor', 'start')
                         .style('font', d => `${d.r || 0}px 'Jetbrains Mono'`)
                         .text(d => d.description?.title || '');
            if (s_nodes) this.format(svg);
        },
        format(svg: SvgSelection, simulation?: Simulation<any, any>) {
            const s_g                          = this.selection(svg);
            const s_text: D3NodeLabelSelection = s_g.selectAll('text');

            s_text?.attr('x', d => d.x)
                  .attr('y', d => d.y - (d.r + 10));

            const circles: D3NodeSelection = s_g.selectAll('circle');
            circles?.attr('cx', (d) => d_selectX(d))
                   .attr('cy', (d) => d_selectY(d))
                   .attr('r', ((d) => d_selectRadius(d) || 10))
                   .attr('fill', (d => d?.color ?? '#ffffff'))
                   .attr('stroke', (d => d?.stroke ?? '#ffffff'));

            // @ts-ignore
            const drag = d3drag<unknown, Datum>().on('drag', dragged)
                                                 .on('end', (e, d) => d.dragBehavior?.release?.(e, d));
            s_g.selectAll('.node-wrapper')?.call(drag);
            circles?.on('click', (event: MouseEvent, d: Datum) => {
                event.stopPropagation();
                !event.shiftKey && d.reset?.();
                simulation?.alphaTarget(.9).restart();
                (d.click ?? (() => console.log(d)))?.(event);
            });
        },
        selection(svg: SvgSelection) { return svg.select('g.nodes') as unknown as D3NodeSelection; },
        setData(svg, data) { this.selection(svg).selectAll('circle').data(data); },
    };
}