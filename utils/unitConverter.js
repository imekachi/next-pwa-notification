import _ from 'lodash'
import { getNumber } from './number'
import { throwIfNotDataTypes } from './validate'

/**
 * strip out units from string
 *
 * @param   {string|number} input
 * @return  {number}
 */
export const stripUnit = _.memoize(input => {
  if (_.isNumber(input)) return input
  throwIfNotDataTypes(input, ['number', 'string'])
  return getNumber(input)
})

/**
 * convert input value to string with px unit
 * if given value is string, it will return the input immediately
 *
 * @param   {number|string} value
 * @return  {string}
 */
export const parsePixel = _.memoize(value => {
  if (_.isString(value)) return value
  throwIfNotDataTypes(value, ['number', 'string'])
  return `${getNumber(value)}px`
})

/**
 * parse value with defaultValue and using parsePixel as default parser.
 *
 * Why?
 * If you want a style to have default value when the value isn't sent in
 * you'd write a code like this:
 *
 * margin: ${props => parsePixel(props.margin || defaultMargin)};
 *
 * But what if you want no margin at all? <Component margin={0} />
 * it will render using defaultMargin because 0 is falsy
 * and you'd have to re-write the code like this:
 *
 * margin: ${props => parsePixel(props.margin > -1 ? props.margin : defaultMargin)};
 *
 * pretty long and looks complicated.
 * thus, this function is born and we will be writing like this:
 *
 * margin: ${props => parseWithDefault(props.margin, defaultMargin)}
 *
 * better?
 *
 * @param   {number|string} value
 * @param   {number|string} defaultValue
 * @param   {Function} [parser=parsePixel] - value parser
 * @return  {string|*} - return whatever parser returned or the value if it's a string
 */
export const parseWithDefault = (value, defaultValue, parser = parsePixel) => {
  if (_.isString(value)) return value
  return parser(value > -1 ? value : defaultValue)
}

/**
 * convert a number to percent unit as a string and ending with '%' symbol
 * if given value is string, it will return the input immediately
 *
 * @param   {number|string} value
 * @return  {string}
 */
export const parsePercent = _.memoize(value => {
  if (_.isString(value)) return value
  throwIfNotDataTypes(value, ['number', 'string'])
  return `${getNumber(value) * 100}%`
})

/**
 * convert input value to time in css (ms | s)
 * if given value is string, it will return the input immediately
 *
 * @param   {number|string} value
 * @param   {string} [unit = ms]
 * @return  {string}
 */
export const parseTime = (value, unit = 'ms') => {
  if (_.isString(value)) return value
  throwIfNotDataTypes(value, ['number', 'string'])
  return getNumber(value) + unit
}

/**
 * convert hex color to rgba color
 *
 * @param   {string} hex - expanded hex with leading #, example: #F37A01
 * @param   {number} [alpha=1] - alpha channel range 0 - 1
 * @param   {boolean} [asArray = false] - return value as js array (the function returns css string by default)
 * @return  {string|Array} rgba - if asArray option is true, it will return an array `[r,g,b,a]`
 */
export const hexToRgba = (hex, alpha = 1, asArray = false) => {
  throwIfNotDataTypes(hex, ['string'])
  throwIfNotDataTypes(alpha, ['number'])

  // /^(?:#)?(\w{2})(\w{2})(\w{2})/g
  const red = parseInt(hex.substring(1, 3), 16)
  const green = parseInt(hex.substring(3, 5), 16)
  const blue = parseInt(hex.substring(5, 7), 16)

  if (asArray) {
    return [red, green, blue, alpha]
  }
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}
