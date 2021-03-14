import {createContext} from 'react';

interface SimulationContextState {
}

function initSimulationContext(): SimulationContextState {
    return {}
}
export const SimulationContext = createContext(initSimulationContext());