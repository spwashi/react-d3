import {D3DragEvent, Simulation} from 'd3';
import {D3NodeLabelSelection, D3NodeSelection, SvgSelection} from '../../../data/data.types';
import {NodeComponentManager} from '../../../hooks/simulation.types';
import {SimulationData} from '../types';
import {Datum} from '../../../data/types/datum';

export const d_selectX      = (d: Datum | undefined) => d?.x ?? null;
export const d_selectY      = (d: Datum | undefined) => d?.y ?? null;
export const d_selectRadius = (d: Datum | undefined) => d?.r || 1;

export function initSvgNodes(data: SimulationData): NodeComponentManager {
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
                         .attr('text-anchor', 'middle')
                         .style('font', d => `bold ${d.r || 0}px sans-serif`)
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
                   .attr('fill', (d => d?.color ?? '#ffffff'));

            if (simulation) {
                let click =
                        (event: D3DragEvent<any, any, any>, d: Datum) => {
                            d.reset?.();
                            simulation?.alphaTarget(.9).restart();
                            (d.log ?? (() => console.log(d)))?.();
                        }

                // @ts-ignore
                circles?.on('click', click);
            }
        },
        selection(svg: SvgSelection) { return svg.select('g.nodes') as unknown as D3NodeSelection; },
        setData(svg, data) { this.selection(svg).selectAll('circle').data(data); },
    };
}