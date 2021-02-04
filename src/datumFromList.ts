import {DataCalculationPoint, Datum} from './data.types';

const array: Datum[] = ([
    {
        x:           0,
        y:           -90,
        r:           1,
        description: {title: 'Tables'},
    },
    {
        x:           40,
        y:           10,
        r:           1,
        description: {title: 'Tables'},
    }
]);

export function datumFromList(dp: DataCalculationPoint): Datum | undefined {
    const {index: i} = dp;

    let datum: Datum = {...array[i] || {}};
    if (!datum.r) return undefined;

    datum.r *= dp.radius || 1;
    datum.i = i;

    return datum
}