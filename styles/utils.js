import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { wrapDisplayName } from 'recompose'
import styled, { css } from 'styled-components'
import { isInArray } from '../utils/array'
import { iF } from '../utils/condition'
import { parsePixel } from '../utils/unitConverter'
import { throwIfNotDataTypes } from '../utils/validate'
import { FONT_FACE_FORMAT_KEYS, FONT_FACE_FORMATS, LINE_HEIGHTS } from './fonts'
import { breakpoints } from './responsive'
import defaultTheme from './themes'

/**
 * Make background image with no-repeat center center
 *
 * @param   {string} url
 * @param   {string|number} bgSize
 * @param   {string} [fallbackColor]
 * @return  {string}
 */
export const bgImage = (url, bgSize, fallbackColor) => {
  let style = `background: ${iF(!!fallbackColor, fallbackColor)} ${iF(
    !!url,
    `url("${url}")`
  )} no-repeat center center;`

  if (bgSize) {
    style += `background-size: ${bgSize};`
  }

  return style
}

/**
 * return CSS font property in short form
 *
 * @param   {Object} options
 * @param   {string|number} [options.fontSize = defaultTheme.fontSizes.root] - font size with unit, but if value is a number 'px' unit will be attached
 * @param   {string} [options.color]
 * @param   {string|number} [options.lineHeight = LINE_HEIGHTS.DEFAULT]
 * @param   {string} [options.fontFamily = FONT_FAMILIES.TAHOMA]
 * @param   {string|number} [options.fontWeight = 'normal']
 * @param   {string} [options.fontStyle = 'normal']
 * @return  {string} font property
 */
export const fontShorten = ({
  fontSize = defaultTheme.fontSizes.root,
  color,
  lineHeight = LINE_HEIGHTS.DEFAULT,
  fontFamily = defaultTheme.fontFamilies.normal,
  fontWeight = 'normal',
  fontStyle = 'normal',
}) =>
  `font: ${fontStyle} ${fontWeight} ${parsePixel(fontSize)}/${lineHeight} ${fontFamily};${iF(
    color,
    `color: ${color};`
  )}`

/**
 * generate src of font-face
 *
 * @param   {string} path - path without trailing slash ('/')
 * @param   {string} filename - filename without extension
 * @param   {Array} [formats = FONT_FACE_FORMAT_KEYS] - array of formatKey
 * @return  {string} src
 */
export const getFontFaceSrc = (path, filename, formats = FONT_FACE_FORMAT_KEYS) => {
  const fontPath = `${path}/${filename}`

  const pathDeclarations = formats.map(key => {
    // if not format found in FONT_FACE_FORMATS, use the key as format
    const format = FONT_FACE_FORMATS[key] || key

    let extension = ''
    switch (key) {
      case 'eot':
        extension = 'eot?#iefix'
        break
      case 'svg':
        extension = `svg##${filename}`
        break
      default:
        extension = key
    }

    return `url("${fontPath}.${extension}") format("${format}")`
  })

  let src = `src: ${pathDeclarations.join(',')};`

  if (isInArray(formats, 'eot')) {
    src = `src: url("${fontPath}.eot"); ${src}`
  }

  return src
}

/**
 * generate CSS fontFace string
 *
 * @param   {Object} options - option object
 *
 * @param   {string} options.familyName
 * @param   {string} options.path - path without trailing slash ('/')
 * @param   {string} options.filename - filename without extension
 * @param   {string|number} [options.weight = 'normal'] - weight of this specific font file
 * @param   {string} [options.style = 'normal'] - font style
 * @param   {Array} [options.formats = FONT_FACE_FORMAT_KEYS] - array of format available in short form (extensions) ie, ['woff', 'ttf']
 * @param   {boolean} [options.minify = false] - option to return minified string or not
 * @return  {string} font face string
 */
export const fontFace = ({
  familyName,
  path,
  filename,
  weight = 'normal',
  style = 'normal',
  formats = FONT_FACE_FORMAT_KEYS,
  minify = false,
}) => {
  const fontFaceString = `@font-face {
      font-family: "${familyName}";
      font-weight: ${weight};
      font-style: ${style};
      ${getFontFaceSrc(path, filename, formats)}
    }`

  return minify ? fontFaceString.replace(/\s/g, '') : fontFaceString
}

/**
 * Factory function for a function that generate CSS media breakpoint 'min-width' for given size
 * Call the returned function with Tagged Template Literals, for example:
 *
 * const mediaTabletUp = mobileFirstMedia(768)
 *
 * const Container = styled.div`
 *    max-width: 480px;
 *    margin: auto;
 *
 *    ${mediaTabletUp`
 *        max-width: 1070px;
 *    `}
 * `
 *
 * @param   {number} breakpoint - breakpoint size in pixel unit (but without 'px')
 * @return  {Function} mediaQueryCreator - media query creator function
 */
export const mobileFirstMedia = breakpoint => (...styles) => css`
  @media (min-width: ${parsePixel(breakpoint)}) {
    ${css(...styles)};
  }
`

/**
 * Factory function for a function that generate CSS media breakpoint 'max-width' for given size
 * Call the returned function with Tagged Template Literals, for example:
 *
 * const mediaTabletDown = desktopFirstMedia(991.98)
 *
 * const Container = styled.div`
 *    max-width: 1070px;
 *    margin: auto;
 *
 *    ${mediaTabletDown`
 *        max-width: 480px;
 *    `}
 * `
 *
 * @param   {number} breakpoint - breakpoint size in pixel unit (but without 'px')
 * @return  {Function} mediaQueryCreator - media query creator function
 */
export const desktopFirstMedia = breakpoint => (...styles) => css`
  @media (max-width: ${parsePixel(breakpoint)}) {
    ${css(...styles)};
  }
`

/**
 * Object that stores all breakpoint sizes { mobile, tablet, desktop } = defaultTheme.breakpoints
 * which each size is an object that stores 2 functions { up, down }
 * the function will be called with Tagged Template Literals
 * for example:
 *
 * import { mediaBreakpoints } from 'school/styles/utils'
 *
 * const Container = styled.div`
 *    max-width: 1070px;
 *    margin: auto;
 *
 *    ${mediaBreakpoints.tablet.down`
 *        max-width: 480px;
 *    `}
 * `
 *
 * Note: Not every breakpoint size contains both 'up' and 'down' functions
 * If you use mobile-first approach,
 * everything you write is, by default, for mobile or equal to mediaBreakpoints.mobile.up
 * so, mediaBreakpoints.mobile will only have 'down' function
 *
 * It's the same if you use desktop-first approach,
 * everything you write is, by default, for desktop or equal to mediaBreakpoints.desktop.down
 * so, mediaBreakpoints.desktop will only have 'up' function
 */
export const mediaBreakpoints = Object.keys(breakpoints).reduce((mediaFunctions, breakpointKey) => {
  const { lowerBound, upperBound } = breakpoints[breakpointKey]
  const mediaFunction = {
    [breakpointKey]: {},
  }

  // if lowerBound or upperBound is null, that means you don't need a media-query for that
  if (lowerBound) {
    mediaFunction[breakpointKey].up = mobileFirstMedia(lowerBound)
  }

  if (upperBound) {
    mediaFunction[breakpointKey].down = desktopFirstMedia(upperBound)
  }

  return Object.assign({}, mediaFunctions, mediaFunction)
}, {})

/**
 * Enhance the StyledComponent with dynamic tag ability
 * The component receives props tag(string) and tagResolver(function)
 * and use those to compute which tag it should render.
 * The tag changing mechanism is simply the use of Styled.withComponent method.
 *
 * original source: https://codesandbox.io/s/n5nRmZBv4
 *
 * @param   {StyledComponentClass} StyledComponent
 * @return  {Component} TagMutatedStyledComponent
 */
export const withDynamicTag = StyledComponent => {
  // check if input is instanceof StyledComponent
  throwIfNotDataTypes(StyledComponent, ['styledComponent'])

  // This function will resolve component, which render component has been changed by withComponent
  // then cache the result component.
  const getComponentDynamicTag = _.memoize(tag => StyledComponent.withComponent(tag))

  const Component = props => {
    const { tag, tagResolver } = props
    let renderTag = tag

    // if tag is not defined, using tagResolver to resolve
    if (!renderTag && _.isFunction(tagResolver)) {
      renderTag = tagResolver(props)
    }

    // if renderTag is not a string or the tag is not in predefined tags of styled
    // then return original component
    if (!_.isString(renderTag) || !_.has(styled, renderTag)) {
      return React.createElement(StyledComponent, props)
    }

    // check if not string or not in styled
    return React.createElement(getComponentDynamicTag(renderTag), props)
  }

  Component.displayName = wrapDisplayName(StyledComponent, 'DynamicTag')
  Component.propTypes = {
    tag: PropTypes.string,
    tagResolver: PropTypes.func,
  }

  return Component
}

/**
 * returns first value of given array
 * that make resolver function return true
 *
 * @param {Array} array - array of candidate values
 * @param {function} [resolver] - function to test item in given array, default is item => item !== undefined
 * @return {*} value - first values that pass the test by resolver function
 */
export const fallbacks = (array, resolver) => {
  // if first argument is not an array or empty array, return undefined
  if (!_.isArray(array) || _.isEmpty(array)) return undefined

  // define default value, which is undefined
  let value
  // get tester function
  const defaultTester = item => item !== undefined
  const tester = _.isFunction(resolver) ? resolver : defaultTester

  // loop through items
  // if tester function returns true on some of item,
  // the loop will stop immediately after assign the item to
  array.some(item => {
    if (tester(item)) {
      value = item
      return true
    }
    return false
  })

  // returns the value
  return value
}

/**
 * converts value to negative value
 * this also support string such as, '100%', '100px'
 * NOTE: if value 0, it will return 0, not -0 due to memoization key issue
 *
 * @param {number|string} value
 * @return {number|string} negativeValue
 */
export const negative = value => {
  // to eliminate negative zero that will have a problem with memoization
  if (value === 0 || value === '0' || value === '-0') {
    if (_.isString(value)) return '0'
    return 0
  }

  // if number, multiply it with -1
  if (_.isNumber(value) && !_.isNaN(value)) return -1 * value

  if (_.isString(value)) {
    if (value.substring(0, 1) === '-') {
      return value.substring(1) // if it's negative remove the negative sign
    }
    return `-${value}` // if not add the negative sign
  }

  // if value is not valid just return it
  return value
}
