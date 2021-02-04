import {DataCalculationPoint, Datum} from './data.types';

export function datumToRectangle({width = 100, radiusMultiplier = 1, count = 2000, height = 100, radius = 10, thetaMultiplier = 1, index = 0}: DataCalculationPoint,
): Datum {
    return {
        x: index / 10,
        y: radius + (height * (index % 10) / 10),
        i: index,
        r: radiusMultiplier * radius * (index / count),
    };
}