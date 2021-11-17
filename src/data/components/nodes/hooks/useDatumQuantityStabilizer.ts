import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useLocalStorage} from '../../../../hooks/util/useLocalStorage';
import _ from 'lodash';

type DatumSortFunction<T> = (a: T, b: T) => number;
export type DataController<Datum, Raw = any, Id = any> = {
    init: ((d: Partial<Datum> | any) => Datum);
    sort: DatumSortFunction<Datum>;
    raw: Raw[],
    getId: (d: Datum) => Id | null,
    swapItems: (items: Datum[]) => void;
    setItems: (items: Datum[]) => void;
    setMap: (map: Map<Id, Datum>) => void;
    items: Datum[];
    map: Map<Id, Datum>
};
export function useDataController<T, Id = any>(
    raw: T[],
    getId: (d: any) => Id,
    init: (d: any) => T,
    sort: DatumSortFunction<T>,
) {
    const [items, setItems] = useState<T[]>(raw);
    const [map, setMap]     = useState(() => new Map());
    useEffect(() => {
        setItems(raw);
        console.log(raw)
    }, [raw]);
    useEffect(() => {
        const arr = items;
        const map = new Map();
        arr.forEach(node => map.set(getId(node), node))
        setMap(map)
    }, [items]);

    return useMemo(() => {
        return {
            init,
            raw,
            sort,
            getId,
            items,
            map,

            setItems,
            setMap,

            swapItems:
                (items: T[]) => {
                    items.length = 0;
                    items.push(...items);
                },
        } as DataController<T>
    }, [items, raw, map]);
}

/**
 * Adds or removes items based on the number of things
 * @param controller
 * @param desiredQuantity
 * @param storageKey
 */
export function useDatumQuantityStabilizer<T extends {
    id?: any;
    x?: number;
    y?: number;
    fy?: number;
    fx?: number;
    forces?: {
        electronegativity?: number
    }
}>(
    controller: DataController<T>,
    desiredQuantity: number,
    storageKey: string,
) {
    const [saved, setSaved] = useLocalStorage(storageKey, {} as { [k: string]: Partial<T> });
    const savedRef          = useRef(saved);
    savedRef.current        = saved;
    const removeToFill      =
              useCallback((quantity: number, data: T[]) => {
                              const removalCount = data.length - quantity;
                              const arr          = data.slice().sort(controller.sort);
                              arr.splice(-removalCount, removalCount);
                              controller.setItems(arr)
                          },
                          [controller]);
    const addToFill         =
              useCallback((quantity: number) => {
                              const currLen   = controller.items.length ?? 0
                              const lenDiff   = (quantity ?? 1) - currLen;
                              const seedArray = Array.from(Array(lenDiff));
                              const newItems  = seedArray.map(
                                  (i, k) => {
                                      const datum = controller.init({
                                                                        id:         'boon' + k,
                                                                        y:          0,
                                                                        NODE_COUNT: quantity,
                                                                        save:       (d: T) => {
                                                                            setSaved({
                                                                                         ...savedRef.current,
                                                                                         [d.id ?? '']: {
                                                                                             x:      d.x,
                                                                                             y:      d.y,
                                                                                             fx:     d.fx,
                                                                                             fy:     d.fy,
                                                                                             forces: {
                                                                                                 electronegativity: d.forces?.electronegativity,
                                                                                             },
                                                                                         },
                                                                                     })

                                                                        },
                                                                    });
                                      _.merge(datum, savedRef.current[controller.getId(datum)] ?? {});

                                      return datum;
                                  },
                              );
                              const nextMap   = new Map();
                              const nextList  = ([] as T[])
                                  .concat(controller.raw, newItems as T[])
                                  .map(node => nextMap.set(controller.getId(node), node) && node)
                              controller.setMap(nextMap);
                              controller.setItems(nextList);
                          },
                          [controller]);

    const callbacks = useRef({removeToFill, addToFill});
    useEffect(() => {
        const {addToFill, removeToFill} = callbacks.current;
        const {items: raw}              = controller;
        const prevLength                = raw.length;

        if (prevLength === desiredQuantity) return;
        if (prevLength > desiredQuantity) return removeToFill(desiredQuantity, controller.raw);
        addToFill(desiredQuantity);
    }, [desiredQuantity, controller.items.length]);
}