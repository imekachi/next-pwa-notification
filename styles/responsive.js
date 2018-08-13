export const screenBoundaries = {
  large: 992,
  medium: 768,
  small: 0, // 576,
}

export const boundaryGap = 0.02

export const breakpoints = {
  desktop: {
    upperBound: null, // if you write desktop first, you don't need a media query
    lowerBound: screenBoundaries.large, // mediaBreakpoints.desktop.up (min-width: 992) -> desktop & up
  },
  tablet: {
    upperBound: screenBoundaries.large - boundaryGap, // mediaBreakpoints.tablet.down (max-width: 991.98) -> tablet & down
    lowerBound: screenBoundaries.medium, // mediaBreakpoints.tablet.up (min-width: 768) -> tablet & up
  },
  mobile: {
    upperBound: screenBoundaries.medium - boundaryGap, // mediaBreakpoints.mobile.down (max-width: 767.98) -> mobile & down
    lowerBound: null, // if you write mobile first, you don't need a media query
  },
}
