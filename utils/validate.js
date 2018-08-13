import _ from 'lodash'
import { isStyledComponent } from 'styled-components'

export const typeCheckingFunctions = {
  number: value => !_.isNaN(value) && _.isNumber(value),
  string: _.isString,
  array: _.isArray,
  object: _.isObject,
  date: _.isDate,
  styledComponent: isStyledComponent,
}

/**
 * get type of variable
 * example:
 *
 * const foo = ['bar']
 *
 * typeof foo // "object"
 * getTypeOf(foo) // "Array"
 *
 * @param   {*} variable
 * @return  {string} nameOfType
 */
export const getTypeOf = variable =>
  Object.prototype.toString.call(variable).replace(/\[object (\w+)]/, '$1')

/**
 * validate if input is any of given type, otherwise it will throw an error
 *
 * @param   {*} value - value to test
 * @param   {Array} allowTypes - Array of type name. These types are available ['number', 'string', 'array', 'object', 'date', 'styledComponent']
 */
export const throwIfNotDataTypes = (value, allowTypes) => {
  if (!_.isArray(allowTypes)) {
    throw new TypeError(
      `Make sure 'allowTypes' in 'throwIfNotDataTypes' is an array.\nReceived '${getTypeOf(
        allowTypes
      )}': ${JSON.stringify(allowTypes)}`
    )
  }

  const errorMsg = `Input value is not one of following types: ${JSON.stringify(
    allowTypes
  )}.\nReceived '${getTypeOf(value)}': ${_.isFunction(value) ? value : JSON.stringify(value)}`

  const isTypeOfValue = type => typeCheckingFunctions[type](value)
  const validateResult = allowTypes.some(isTypeOfValue)

  if (!validateResult) {
    throw new TypeError(errorMsg)
  }
}

/**
 * Deep filter object with function resolver
 *
 * @param   {Array|Object} collection
 * @param   {Function} resolver
 * @return  {Array|Object} filtered object
 */
export const deepFilterObject = (collection, resolver) => {
  throwIfNotDataTypes(collection, ['array', 'object'])

  return Object.entries(collection).reduce((result, [key, value]) => {
    const resultReceived = result
    if (resolver(value)) {
      const isValueArray = _.isArray(value)
      const isValueObject = value.constructor.toString().indexOf('Object') > -1

      resultReceived[key] =
        typeof value === 'object' && (isValueObject || isValueArray)
          ? deepFilterObject(value, resolver)
          : value
    }

    return resultReceived
  }, _.isArray(collection) ? [] : {})
}

/**
 * Remove null value from object
 *
 * @param   {Array|Object} object
 * @return  {Array|Object} object without null value
 */
export const removeNullValues = object => deepFilterObject(object, value => !_.isNull(value))

/**
 * Diff 2 objects with only 1 level of depth with strict equality("===") comparison as default comparator.
 * Usually used for comparing props in react.
 *
 * if options.verbose is false (default)
 * it will return an array of keys that value is different
 *
 * if options.verbose is true
 * it will return an object in shape like
 * {
 *   [diffKey]: {
 *      prev: 'prevValue',
 *      next: 'nextValue'
 *   }
 * }
 *
 * @param   {Object} prevObj
 * @param   {Object} nextObj
 * @param   {Object} [options]
 * @param   {boolean} [options.verbose = false]
 * @param   {Function} [options.comparator] - uses "===" as value comparator
 * @returns {Array|Object} diff
 */
export const diffObjects = (prevObj, nextObj, options) => {
  const defaultOptions = {
    verbose: false,
    comparator: (prevValue, nextValue) => prevValue === nextValue,
  }

  const mergedOptions = _.merge({}, defaultOptions, options)

  // get all unique keys from both objects
  const allObjKeys = Object.keys(Object.assign({}, prevObj, nextObj))

  // verbose: true => return object of keys that changed with prev, next values inside
  if (mergedOptions.verbose) {
    return allObjKeys.reduce((changes, key) => {
      if (!mergedOptions.comparator(prevObj[key], nextObj[key])) {
        return {
          ...changes,
          [key]: {
            // these value are for debugging purpose
            prev: prevObj[key],
            next: nextObj[key],
          },
        }
      }
      return changes
    }, {})
  }

  // verbose: false => returns an Array of keys that diff
  return allObjKeys.reduce((changes, key) => {
    if (!mergedOptions.comparator(prevObj[key], nextObj[key])) return [...changes, key]
    return changes
  }, [])
}
