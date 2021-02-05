import * as d3 from 'd3';
import {useCallback, useEffect, useState} from 'react';
import {getComponentManagers, useD3RootSvg} from './useD3RootSvg';
import {ViewBox} from './viz.types';
import {Datum, SvgCircleSelection, SvgLineSelection} from './data.types';
import {Information, Style, useD3Elements} from './useD3Elements';
import {getFn_updateLinkLineElementWhenDragged} from './getLinkDraggingFunction';

////////////////////
/**
 * Types
 */
export interface ForceConfiguration {
    boundingBox?: boolean;
    nodeForceStrength: number;
    center?: number;
    nodeLinkStrength: number
}

type NDimensionalTuple_2 = [number, number];

////////////////////
/**
 * Selectors
 */

/**
 * Simulation Width
 * @param offset
 */
const o_Width = (offset: ViewBox) => offset[2];

/**
 * Simulation Height
 * @param offset
 */
const o_Height = (offset: ViewBox) => offset[3];


///////////////////////////////
/**
 * Export
 */

/**
 * Function Parameters for {@see useSimulation}
 */
interface SimulationParameters {
    offset: ViewBox;
    information: Information;
    style: Style;
    simSettings?: ForceConfiguration;


}

/**
 * Function that creates a D3 Graphic
 *
 ***    Nodes and Links
 ***    Optional force simulation
 *
 * @param offset
 * @param information
 * @param style
 * @param simSettings
 */
export function useSimulation({offset, information, style, simSettings}: SimulationParameters) {
    const d3Elements                  = useD3Elements(information, style, simSettings);
    const root                        = useD3RootSvg({
                                                         offset:      offset,
                                                         information: information,
                                                         components:  d3Elements,
                                                     });
    const [simulation, setSimulation] = useState<d3.Simulation<any, any>>();

    // Stylize the SVG
    {
        useEffect(() => {
                      const {
                                lines:   linkManager,
                                circles: circleManager,
                            } = getComponentManagers(root);
                      circleManager.element.format(circleManager.itemSelector(root.svg))
                      linkManager.element.format(linkManager.itemSelector(root.svg))

                      if (root.svg) root.svg.attr('viewBox', offset.join(' '))
                  },
                  [style.radius, offset])

    }

    // Setup the Force simulation
    {
        const update =
                  useCallback(
                      () => {
                          /* initialize components */
                          const {
                                    lines:   linkManager,
                                    circles: circleManager,
                                } = getComponentManagers(root);

                          let links: SvgLineSelection | undefined;
                          if (root.svg && information.links) links = linkManager.setData(root.svg, linkManager.element.data);

                          let circles: SvgCircleSelection | undefined;
                          if (root.svg && information.data) circles = circleManager.setData(root.svg, circleManager.element.data);

                          // remove components
                          {
                              links?.exit().remove();
                              circles?.exit().remove();
                          }


                          // update components
                          {

                              linkManager.element.format(links as SvgLineSelection);
                              linkManager.element.format(links?.enter().append('line').merge(links) as SvgLineSelection);
                              // @ts-ignore
                              const drag = d3.drag().on('drag', getFn_updateLinkLineElementWhenDragged(simulation, links));


                              // @ts-ignore
                              circles?.call(drag)


                              circleManager.element.format(circles, simulation);
                              circleManager.element.format(circles?.enter().append('circle'),
                                                           simulation);
                          }

                      },
                      [
                          information.data,
                          information.links,
                          style.radius,
                          simSettings?.nodeLinkStrength,
                          simSettings?.nodeForceStrength,
                          simSettings?.center,
                      ],
                  );

        const useTheForce =
                  useCallback(
                      () => {
                          if (!simSettings) return;
                          let _simulation = d3.forceSimulation(information.data).alphaDecay(0);


                          // node force
                          {
                              const nodeForceStrength = simSettings.nodeForceStrength || 0;
                              if (nodeForceStrength) {
                                  _simulation = _simulation.force('charge',
                                                                  d3.forceManyBody()
                                                                      // Sim moves slowly when strength is a function
                                                                    .strength(nodeForceStrength));

                              }
                          }


                          // Links
                          {
                              const nodeLinkStrength = simSettings.nodeLinkStrength;
                              if (nodeLinkStrength) {
                                  _simulation =
                                      _simulation
                                          .force(
                                              'link',
                                              d3
                                                  .forceLink()
                                                  .links(information.links)
                                                  .strength(nodeLinkStrength),
                                          )
                                          .on('tick', () => update());
                              }
                          }


                          // box-dependent forces
                          //    - center
                          //    - bounding box
                          {
                              const height  = o_Height(offset);
                              const width   = o_Width(offset);
                              const xOffset = offset[0];
                              const yOffset = offset[1];

                              // Centering Force
                              {

                                  const centeringForce = simSettings.center;
                                  if (centeringForce !== undefined) {
                                      const centerOptions:
                                                {
                                                    none: false,
                                                    zero: NDimensionalTuple_2,
                                                    offset: NDimensionalTuple_2,
                                                    negativeOffset: NDimensionalTuple_2,
                                                    halfSvgSize: NDimensionalTuple_2,
                                                    quarterSvgSize: NDimensionalTuple_2,
                                                    svgSize: NDimensionalTuple_2,
                                                }                                       =
                                                {
                                                    none:           false,
                                                    zero:           [0, 0],
                                                    offset:         [xOffset, yOffset],
                                                    negativeOffset: [-xOffset, -yOffset],
                                                    halfSvgSize:    [width, height].map(i => i / 2) as NDimensionalTuple_2,
                                                    quarterSvgSize: [width, height].map(i => i / 4) as NDimensionalTuple_2,
                                                    svgSize:        [width, height],
                                                };
                                      const centeringOption: keyof typeof centerOptions = 'offset';
                                      const center: NDimensionalTuple_2 | boolean       = centerOptions[centeringOption];

                                      if (center) {
                                          _simulation =
                                              _simulation
                                                  .force(
                                                      'center',
                                                      d3
                                                          .forceCenter()
                                                          .strength(.01 * centeringForce),
                                                  );
                                      }
                                  }
                              }

                              // SimulationBoundingBox
                              {
                                  if (simSettings.boundingBox !== undefined) {
                                      _simulation =
                                          _simulation
                                              .force('box', function box_force() {
                                                  for (var i = 0, n = information.data.length; i < n; ++i) {
                                                      const curr_node = information.data[i] as Datum;
                                                      const radius    = curr_node.r;
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
                              }

                          }


                          /* --- */
                          //
                          // Start the simulation
                          {
                              simulation
                                  ?.alphaTarget(.9)
                                  .restart();
                              setSimulation(_simulation);
                          }
                      },
                      [
                          update,
                          information.data,
                          information.links,
                          simSettings?.nodeLinkStrength,
                          simSettings?.nodeForceStrength,
                          simSettings?.center,
                          ...offset,
                      ],
                  );
        useEffect(useTheForce, [simSettings, information.data, information.links]);
    }

    // Reheat the simulation
    {
        useEffect(() => { simulation?.alphaTarget(.9).restart(); }, [simSettings, !!simulation])
    }
    return root.svg ? root.svg.node() : null;
}
