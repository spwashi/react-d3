import {VizConfigItem} from '../config/types';

export function readConfig<T>(item: VizConfigItem<T> | undefined, fallback?: T): T {
    let state = item?.state;
    if (typeof state === 'undefined' && typeof fallback === 'undefined') {
        console.log('error -- missing config')
        return undefined as unknown as T;
    }
    return state ?? fallback as T
}