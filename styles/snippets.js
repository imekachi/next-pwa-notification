import _ from 'lodash'
import { css } from 'styled-components'
import { parsePercent, parsePixel, parseWithDefault } from '../utils/unitConverter'
import SHADOWS from './shadows'
import { RATIOS } from './sizes'
import { mediaBreakpoints } from './utils'

// RESETS
export const resetDefaultButtonStyle = css`
  border: 0 none;
  outline: 0 none;
  box-shadow: none;
  padding: 0;
  background: none;
  cursor: pointer;
`

// TEXT SNIPPETS
export const withEllipsisBreak = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const withPropEllipsisBreak = props => props.ellipsisBreak && withEllipsisBreak

export const withWordWrap = css`
  word-wrap: break-word;
  word-break: break-word;
`
export const withTextShadow = css`
  text-shadow: ${SHADOWS.TEXT};
`

export const withOutTextShadow = css`
  text-shadow: none;
`

/**
 * receive lineColor and return css for lineThrough
 *
 * @param {string} lineColor
 * @param {boolean} [addPositionRelative = true] - auto add position relative to the element
 * @return {InterpolationValue[]} css
 */
export const withLineThrough = (lineColor, addPositionRelative = true) => css`
  ${addPositionRelative &&
    css`
      & {
        position: relative;
      }
    `};

  &:after {
    content: '';
    position: absolute;
    height: 1px;
    background-color: ${lineColor};
    top: 0;
    bottom: 0;
    left: -2px;
    right: -2px;
    margin: auto;
  }
`

// LAYOUT SNIPPETS
export const withFlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const withFlexCenterLeft = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const withFlexTopLeft = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

// If using flex with overflow layout, like scrolling,
// and you want to make it center, you cannot use justify-content: center
// it will overflow container but you can't make it scroll
// you have to make it center by making child that has margin auto to fill space up
// and push the rest children into center
//
// ref: https://stackoverflow.com/questions/34184535/change-justify-content-value-when-flex-items-overflow-container
export const withFlexCenterScrollable = css`
  &:before,
  &:after {
    content: '';
    margin: auto;
  }
`

export const withClearFloat = css`
  &:before,
  &:after {
    content: ' ';
    display: table;
  }

  &:after {
    clear: both;
  }
`

// INTERACTIONS SNIPPETS
export const withPreventUserSelect = css`
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
`

// SIZING SNIPPETS
export const withRatioOG = css`
  height: 0;
  padding-bottom: ${parsePercent(RATIOS.OG)};
`

export const withRatioSquare = css`
  height: 0;
  padding-bottom: 100%;
`

export const withRatioHD = css`
  height: 0;
  padding-bottom: ${parsePercent(RATIOS.HD)};
`

export const withAbsoluteStretch = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const withFixedStretch = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const textButtonReset = css`
  ${resetDefaultButtonStyle};
  background-color: transparent;
  padding: 0;
`

// VISIBILITY RESPONSIVE
export const hiddenOnDesktop = css`
  ${mediaBreakpoints.tablet.up`display: none !important;`};
`

export const hiddenOnMobile = css`
  ${mediaBreakpoints.mobile.down`display: none !important;`};
`

export const withPropHiddenOnDesktop = props => props.hiddenOnDesktop && hiddenOnDesktop

export const withPropHiddenOnMobile = props => props.hiddenOnMobile && hiddenOnMobile

export const makeFlexChildrenEllipsisBreak = (children = '*') => css`
  min-width: 1px; // this has to be present for child to be truncated correctly

  > ${children} {
    ${withEllipsisBreak};
    max-width: 100%;
  }
`

export const withCustomScrollbar = styleOptions => {
  const defaultStyles = {
    width: 8,
    height: 8,
    thumb: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 4,
    },
    track: {
      backgroundColor: 'transparent',
    },
    hiddenUntilHover: false,
  }

  const styles = _.merge({}, defaultStyles, styleOptions)

  return css`
    &::-webkit-scrollbar {
      width: ${parsePixel(styles.width)};
      height: ${parsePixel(styles.height)};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${styles.thumb.backgroundColor};
      border-radius: ${parseWithDefault(styles.thumb.borderRadius, styles.width / 2)};
    }

    &::-webkit-scrollbar-track {
      background-color: ${styles.track.backgroundColor};
      border-radius: ${parseWithDefault(styles.track.borderRadius, styles.width / 2)};
    }

    ${styles.hiddenUntilHover &&
      css`
        &:not(:hover) {
          &::-webkit-scrollbar,
          &::-webkit-scrollbar-thumb,
          &::-webkit-scrollbar-track {
            background-color: transparent !important;
          }
        }
      `};
  `
}
