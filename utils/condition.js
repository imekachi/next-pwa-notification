/**
 * iF function is the same as short if, with default value of else condition, '' (empty string)
 * this helps when writing short if in strings or classNames
 * where using && will return string 'false' when condition is not true
 *
 * example:
 * const isActive = true
 * className={`fa-heart${ !isActive && '-o' }`}    \\ this will return 'fa-heart-false'
 * className={`fa-heart${ iF(!isActive, '-o') }`}  \\ this will return 'fa-heart'
 *
 * or you can prevent this by writing like this everywhere
 * className={`fa-heart${ isActive ? '' : '-o' }`}  \\ this will also work and return 'fa-heart'
 *
 * @param   {boolean} condition expression
 * @param   {*} then
 * @param   {*} [ifNotThen = '']
 * @return  {*} returning value depend on condition
 */
export const iF = (condition, then, ifNotThen = '') => (condition ? then : ifNotThen)
