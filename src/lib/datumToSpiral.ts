import {DataCalculationPoint, Datum} from './data.types';

export function datumToSpiral({steps = 12, width = 100, height = 100, radius = 0, radiusMultiplier = 1, thetaMultiplier = 0, index = 0, count}: DataCalculationPoint,
): Datum {
    const distance = steps * Math.sqrt(index + 0.5);

    return {
        x: width / 2 + (distance * Math.cos(thetaMultiplier)),
        y: height / 2 + (distance * Math.sin(thetaMultiplier)),
        i: index,
        r: radius * radiusMultiplier,
        radiusMultiplier,
    };
}