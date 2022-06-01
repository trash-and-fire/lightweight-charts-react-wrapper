import {createContext} from 'react';
import {SeriesActionParams, SeriesActionResult} from '../../internal/series';

export type SeriesContextValue = null | (() => SeriesActionResult<SeriesActionParams>);

export const SeriesContext = createContext<SeriesContextValue>(null);

SeriesContext.displayName = 'SeriesContext'
