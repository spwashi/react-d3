import {VizConfigItem, VizConfigState} from '../config/types';
import {isConfigWidget} from '../hooks';

type ValueOf<T> = T[keyof T];
export function readConfig<T>(item: VizConfigItem<T> | ValueOf<VizConfigState>, fallback?: T): T {
    if (!isConfigWidget(item)) {
        return (item ?? fallback) as T;
    }

    let state = item?.state;
    if (typeof state === 'undefined' && typeof fallback === 'undefined') {
        console.log('error -- missing config')
        return undefined as unknown as T;
    }
    return (state ?? fallback) as T;
}