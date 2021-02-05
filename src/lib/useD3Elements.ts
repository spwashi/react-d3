import {Datum, LinkDefinition, SvgCircleSelection, SvgLineSelection, SvgSelection} from './data.types';
import * as d3 from 'd3';
import {ValueFn} from 'd3';
import {useCallback, useMemo} from 'react';
import {d_selectRadius, d_selectX, d_selectY, getDataFillFn} from './data';
import {D3Component} from './useD3RootSvg';
import {SimSettings} from './useSimulation';

type L = { source: Datum, target: Datum };

export type Information = { data: Datum[], links: LinkDefinition[] };

export type Style = {
    radius: number,
    colors?: number,
    animation?: 'random',
    radialDecay?: number
};

export function useD3Elements(information: Information, style: Style, simSettings?: SimSettings) {
    type GenericValueFn = ValueFn<any, any, any>;
    const _circles: D3Component<SvgCircleSelection> =
              {
                  data: information.data,
                  init(_svg: SvgSelection) {
                      _svg.append('g').attr('class', 'circles');
                      const circles = this.setData(_svg, information.data);
                      if (circles) this.element.format((circles as SvgCircleSelection).join('circle'));
                  },
                  format:
                        useCallback(
                            (circles?: SvgCircleSelection, simulation?:d3.Simulation<any, any>) => {
                                let out = circles
                                    ?.attr('cx', ((d: Datum) => d_selectX(d)) as GenericValueFn)
                                    .attr('cy', ((d: Datum) => d_selectY(d)) as GenericValueFn)
                                    .attr('r', (d) => d_selectRadius(d) || style.radius)
                                    .attr('fill', getDataFillFn(style.colors || 30) as GenericValueFn);

                                if (simulation) {
                                    let click = (event: d3.D3DragEvent<any, any, any>, d: Datum) => {
                                        delete d.fx;
                                        delete d.fy;
                                        simulation?.alphaTarget(.9).restart();
                                        console.log(d);
                                    }

                                    // @ts-ignore
                                    out?.on('click', click);

                                }
                                return out;
                            },
                            [style.colors, style.radius],
                        ),
                  select:
                        useMemo(() => (svg: SvgSelection) => (svg.select('g.circles').selectAll('circle') as unknown as SvgCircleSelection), []),
              };

    const _links: D3Component<SvgLineSelection> =
              {
                  data: information.links,
                  init(_svg: SvgSelection) {
                      _svg.append('g').attr('class', 'links');
                      const links = this.setData(_svg, information.links);
                      if (links) this.element.format((links as SvgLineSelection).join('line'));
                  },
                  format:
                        useCallback(
                            (links?: SvgLineSelection) => {
                                return links
                                    ?.attr('stroke', '#cccccc')
                                    .attr('stroke-width', (10 * Math.abs((simSettings?.nodeLinkStrength || .1))) + 'px')
                                    .attr('x1', ((l: L) => l.source?.x) as GenericValueFn)
                                    .attr('y1', ((l: L) => l.source?.y) as GenericValueFn)
                                    .attr('x2', ((l: L) => l.target?.x) as GenericValueFn)
                                    .attr('y2', ((l: L) => l.target?.y) as GenericValueFn);
                            },
                            [information.links, information.data, simSettings?.nodeLinkStrength],
                        )
                  ,
                  select:
                        useMemo(() => (svg: SvgSelection) => (svg.select('g.links').selectAll('line') as unknown as SvgLineSelection), []),
              };
    return {_circles, _links};
}