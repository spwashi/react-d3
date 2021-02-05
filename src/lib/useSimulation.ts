import * as d3 from 'd3';
import {ValueFn} from 'd3';
import {useCallback, useEffect, useState} from 'react';
import {useD3RootSvg} from './useD3RootSvg';
import {ViewBox} from './viz.types';
import {Datum, Link, SvgCircleSelection, SvgLineSelection} from './data.types';
import {Information, Style, useD3Elements} from './useD3Elements';


type GenericValueFn = ValueFn<any, any, any>;

export interface SimSettings {
    boundingBox?: boolean;
    nodeForceStrength: number;
    center?: [number, number];
    nodeLinkStrength: number
}

const getDragged =
          (simulation: d3.Simulation<any, any>, link: SvgLineSelection) =>
              function dragged(this: Element, event: DragEvent, d: Datum) {
                  d.fx = event.x;
                  d.fy = event.y;

                  // simulation.alpha(1).restart();

                  d3.select(this).attr('cx', d.x).attr('cy', d.y);
                  link.filter((function (l: Link) { return l?.source === d; } as GenericValueFn)).attr('x1', d.x).attr('y1', d.y);
                  link.filter((function (l: Link) { return l?.target === d; } as GenericValueFn)).attr('x2', d.x).attr('y2', d.y);
              }


type NDimensionalTuple_2 = [number, number];

function o_Width(offset: [number, number, number, number]) {
    return offset[2];
}

function o_Height(offset: [number, number, number, number]) {
    return offset[3];
}

export function useSimulation(offset: ViewBox, information: Information, style: Style, simSettings?: SimSettings ) {
    const simSettingSpread            = [simSettings?.nodeForceStrength, simSettings?.nodeForceStrength, simSettings?.center];
    const {_circles, _links}          = useD3Elements(information, style, simSettings);
    const [simulation, setSimulation] = useState<d3.Simulation<any, any>>();

    const {
              selection:  svg,
              components: [
                              {setData: setLinkData, itemSelector: selectLinks},
                              {setData: setCircleData, itemSelector: selectCircles},
                          ],
          } =
              useD3RootSvg(offset, information, [_links, _circles]);


    const update =
              useCallback(
                  () => {
                      /* initialize elements */

                      let links: SvgLineSelection | undefined;
                      if (svg && information.links) links = setLinkData(svg, _links.data);

                      let circles: SvgCircleSelection | undefined;
                      if (svg && information.data) circles = setCircleData(svg, _circles.data);

                      /* remove elements */

                      {
                          links?.exit().remove();
                          circles?.exit().remove();
                      }


                      /* update */

                      {

                          _links.format(links as SvgLineSelection);
                          _links.format(links?.enter().append('line').merge(links) as SvgLineSelection);
                          // @ts-ignore
                          let drag = d3.drag().on('drag', getDragged(simulation, links));


                          // @ts-ignore
                          circles?.call(drag)


                          _circles.format(circles, simulation);
                          _circles.format(circles?.enter().append('circle'),
                                          simulation);
                      }

                  },
                  [
                      information.data,
                      information.links,
                      style.radius,
                      _circles.format,
                      setCircleData,
                      ...simSettingSpread,
                  ],
              );

    // useEffect(update, [])

    useEffect(() => {
                  _circles.format(selectCircles(svg))
                  _links.format(selectLinks(svg))

                  if (svg) svg.attr('viewBox', offset.join(' '))
              },
              [style.radius, offset])

    const useTheForce =
              useCallback(
                  () => {
                      if (!simSettings) return;
                      let _simulation = d3.forceSimulation(information.data).alphaDecay(0);

                      let nodeForceStrength = simSettings.nodeForceStrength || 0;
                      if (nodeForceStrength) {
                          _simulation = _simulation.force('charge',
                                                          d3.forceManyBody()
                                                              // Sim moves slowly when strength is a function
                                                            .strength(nodeForceStrength));

                      }

                      let width  = o_Width(offset);
                      let height = o_Height(offset);

                      let xOffset = offset[0];
                      let yOffset = offset[1];
                      if (simSettings.center !== undefined) {
                          const centerOptions:
                                    {
                                        none: false,
                                        zero: NDimensionalTuple_2,
                                        offset: NDimensionalTuple_2,
                                        negativeOffset: NDimensionalTuple_2,
                                        halfSvgSize: NDimensionalTuple_2,
                                        svgSize: NDimensionalTuple_2,
                                    }                                 =
                                    {
                                        none:           false,
                                        zero:           [0, 0],
                                        offset:         [xOffset, yOffset],
                                        negativeOffset: [-xOffset, -offset[1]],
                                        halfSvgSize:    [width, height].map(i => i / 2) as NDimensionalTuple_2,
                                        svgSize:        [width, height],
                                    };
                          const shortcutOptions                       = ['none', 'zero', 'offset', 'negativeOffset', 'halfSvgSize', 'svgSize'] as (keyof typeof centerOptions)[];
                          let choice                                  = 5;
                          const centeringOption                       = (shortcutOptions[choice] as keyof typeof centerOptions);
                          const center: NDimensionalTuple_2 | boolean = centerOptions[centeringOption];

                          if (center) {
                              _simulation = _simulation.force('center', d3.forceCenter(...center).strength(.005));
                          }
                      }

                      if (simSettings.boundingBox === undefined) {
                          _simulation = _simulation.force('box', function box_force() {
                              for (var i = 0, n = information.data.length; i < n; ++i) {
                                  const curr_node = information.data[i] as Datum;
                                  let radius      = curr_node.r;
                                  curr_node.x     =
                                      Math.max(
                                          xOffset + radius,
                                          Math.min(
                                              (width + xOffset) - radius,
                                              curr_node.x,
                                          ),
                                      );
                                  curr_node.y     =
                                      Math.max(
                                          yOffset + radius,
                                          Math.min(
                                              (height + yOffset) - radius,
                                              curr_node.y,
                                          ),
                                      );
                              }
                          })
                      }


                      let nodeLinkStrength = simSettings.nodeLinkStrength;
                      if (nodeLinkStrength) {
                          _simulation =
                              _simulation.force('link',
                                                d3.forceLink()
                                                  .links(information.links)
                                                  .strength(nodeLinkStrength))
                                         .on('tick', () => update());
                      }
                      simulation?.alphaTarget(.9).restart();
                      setSimulation(_simulation);
                  },
                  [information.data, information.links, ...offset, update, ...simSettingSpread],
              );
    useEffect(useTheForce, [simSettings, information.data, information.links]);
    useEffect(() => {
        simulation?.alphaTarget(.9).restart();
    }, [simSettings, !!simulation])

    return svg ? svg.node() : null;
}