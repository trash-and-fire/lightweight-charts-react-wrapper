import {createContext} from 'react';

import {ChartActionResult} from '../../internal/chart.js';

export type ChartContextValue = null | (() => ChartActionResult);

export const ChartContext = createContext<ChartContextValue>(null);

ChartContext.displayName = 'ChartContext';
