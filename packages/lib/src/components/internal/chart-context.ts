import {createContext} from 'react';
import {IChartApi} from 'lightweight-charts';

export type ChartContextValue = null | (() => IChartApi);

export const ChartContext = createContext<ChartContextValue>(null);
