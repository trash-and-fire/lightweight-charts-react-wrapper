import {createContext} from 'react';
import {ISeriesApi, SeriesType} from 'lightweight-charts';

export type SeriesContextValue = null | (() => ISeriesApi<SeriesType>);

export const SeriesContext = createContext<SeriesContextValue>(null);
