import * as d3 from 'd3';
import {DataCalculationPoint, Datum, DatumPrimaryKey} from './data.types';
import {datumFromList} from './datumFromList';
import {datumToRectangle} from './datumToRectangle';
import {datumToSpiral} from './datumToSpiral';
import {useEffect, useMemo, useState} from 'react';
import {datumToX_2} from './datumToX_2';

export const d_selectIndex  = (d: Datum | undefined) => d?.i;
export const d_Id           = (d: Datum | undefined): DatumPrimaryKey | undefined => d_selectIndex(d);
export const d_selectX      = (d: Datum | undefined) => d?.x;
export const d_selectY      = (d: Datum | undefined) => d?.y;
export const d_selectRadius = (d: Datum | undefined) => d?.r || 1;

export const getDataFillFn = (n: number) => (d: Datum, i: number) => d3.interpolateRainbow((d_selectIndex(d) || 1) / n);


const options: { [key: string]: (d: DataCalculationPoint) => Datum | undefined } =
          {
              spiral: datumToSpiral,
              x_2:    datumToX_2,
              square: datumToRectangle,
              list_1: datumFromList,
              line:   ({count, radius = 5, index: i}: DataCalculationPoint) => {
                  return {
                      x: i * 2 * radius,
                      y: -i * 2 * radius,
                      i,
                      r: radius,
                  }

              },
          };


type GeneratedDataOption = keyof typeof options;

function createNodes(
    choice: GeneratedDataOption,
    count: number,
    theta: number,
    radialDecay: number | undefined,
    width: number,
    height: number,
    radius: number | undefined,
    steps: number,
): Datum[] {
    return Array.from({length: count},
                      (_, index) => {
                          const thetaMultiplier            = theta * index;
                          let fn                           = [
                              ((index || 1) ** 2) / ((radialDecay || 1) * count || 1),
                              Math.pow((index || 1) ** .5, -(radialDecay || 0) / 100) || 1,
                          ][1];
                          const radiusMultiplier           = radialDecay ? fn : 1;
                          let scaledIndex                  = index / count;
                          const args: DataCalculationPoint =
                                    {
                                        count,
                                        width,
                                        height,
                                        index,
                                        radius,
                                        steps,
                                        theta,
                                        scaledIndex,
                                        thetaMultiplier,
                                        radiusMultiplier: isFinite(radiusMultiplier) ? radiusMultiplier : 100,
                                    };
                          if (!options[choice]) {
                              throw new Error(`Missing option for ${choice}`)
                          }
                          return options[choice](args);
                      })
                .filter(i => i !== undefined) as Datum[];
}

type NodeInfo = { steps: number, theta: number, radialDecay?: number, radius?: number, count: number, };

/**
 * ToDo: mutate the data instead of reinitializing it everytime one of the parameters changes
 */
export function useData(strategy: GeneratedDataOption,
                        nodeInfo: NodeInfo,
                        {width, height}: { width: number, height: number },
): Datum[] {
    const radius = nodeInfo.radius ?? 5;

    const [prev, setPrev] = useState<NodeInfo & { strategy: GeneratedDataOption }>();
    useEffect(
        () => { setPrev({...nodeInfo, strategy}) },
        [...Object.values(nodeInfo), strategy],
    );

    const changed =
              (nodeInfo.theta !== prev?.theta) ||
              (nodeInfo.steps !== prev?.steps) ||
              (nodeInfo.radialDecay !== prev?.radialDecay);

    const nodes =
              useMemo(
                  () => createNodes(strategy,
                                    nodeInfo.count,
                                    nodeInfo.theta,
                                    nodeInfo.radialDecay,
                                    width,
                                    height,
                                    nodeInfo.radius ?? 5,
                                    nodeInfo.steps),
                  [changed],
              );

    useEffect(() => {
        if (!prev?.radius || !nodes.length) return;
        const difference = radius - prev.radius;
        if (!difference) return;
        nodes.map(node => node.r += difference);
    }, [prev?.radius, radius]);

    return nodes;
}