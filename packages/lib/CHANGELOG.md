# Lightweight Charts React Wrapper changelog

## 2.1.1

- `rightOffset` is only applied to TimeScale if it has changed.
- 
## 2.1.0

Added support for some new `lightweight-charts@4.1.0` features:
- Implemented `<CustomSeries>` component.
- Implemented `<SeriesPrimitive>` component.

### Breaking changes

- `lightweight-charts` package breaks type backward compatibility. Typescript users should be prepared to work with new types and update the Lightweight Chart package to at least version 4.1.0.

## 2.0.0

In this major release, the required version of the Lightweight Charts package has been upgraded to 4.0.0 to support the package's new features.

Check out `lightweight-charts@4.0.0` [release notes](https://github.com/tradingview/lightweight-charts/releases/tag/v4.0.0) first.

### Breaking changes

- ESM only (CJS support can be added on demand in the future).
- Properties that were renamed or removed in `lighweight-charts@4.0.0` were also renamed or removed in wrappers.

### New features

- Added `markers` property to `<[Type]Series>` components.
- Supported `autoSize` option on `<Chart>` component.
- Reduced layout shift on SSR. The chart component will reserve the specified width and height if the chart is not auto-sized. New `lightweight-charts@4.0.0` features are also available without being explicitly mentioned in this changelog.

New `lightweight-charts@4.0.0` features are also available without being explicitly mentioned in this changelog.
