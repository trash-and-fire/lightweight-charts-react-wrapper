import {createContext} from 'react';
import {ChartActionResult} from '../../internal/chart';

export type ChartContextValue = null | (() => ChartActionResult);

export const ChartContext = createContext<ChartContextValue>(null);

ChartContext.displayName = 'ChartContext';
