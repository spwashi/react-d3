import {DataCalculationPoint, Datum} from './data.types';

export function datumToX_2({
                               steps = 12,
                               width = 100,
                               height = 100,
                               radius = 0,
                               radiusMultiplier = 1,
                               theta = 1,
                               thetaMultiplier = 0,
                               index = 0,
                               count = 1,
                           }: DataCalculationPoint,
): Datum {
    const distance = steps * Math.sqrt(index + 0.5);

    const horizontalDivisions = (count || 1) / width;
    console.log(count, width)
    return {
        x: 10 * index * (theta/10),
        y: -(index ** 2) * (steps/100),
        i: index,
        r: radius * radiusMultiplier,
        radiusMultiplier,
    };
}