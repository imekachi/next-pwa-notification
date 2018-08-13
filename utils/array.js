import _ from 'lodash'
import { throwIfNotDataTypes } from './validate'

/**
 * Check if item is in array
 * this is just a shorthand for array.indexOf(item) > -1
 * but accept only an Array, others, an error will be thrown
 *
 * bare in mind that this require ===, or reference equity
 * as for this example will return false,
 * isInArray([{foo: 'bar'}], {foo: 'bar'}) // false
 *
 * but this will return true
 * const obj = {a: 'b'}
 * const obj2 = {c: 'd'}
 * isInArray([obj, obj2], obj) // true
 *
 * if you want to check if an object is in the array, use _.some() instead
 * since this project rely on 'lodash' anyway
 *
 * @param   {Array} array
 * @param   {*} item
 * @return  {boolean}
 */
export const isInArray = (array, item) => {
  throwIfNotDataTypes(array, ['array'])

  if (_.isEmpty(array)) return false
  return array.indexOf(item) > -1
}

/**
 * Generate array of undefined with specific member length
 * for iteration or using array method like map and reduce
 *
 * @param   {number} numberOfMember
 * @return  {Array}
 */
export const makeArrayOf = numberOfMember => {
  throwIfNotDataTypes(numberOfMember, ['number'])

  return Array(...new Array(numberOfMember))
}
