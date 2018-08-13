/**
 * getNumber
 * stripping all non numeric character but reserve negativity number and decimal precisions
 * and returns a number ( Integer by default, but you can disable rounding, it will return float )
 *
 * getNumber('-1,234.435')      // -1234.435
 * getNumber('-12.54')          // -13
 * getNumber('1,234.445', true) // 1234
 *
 * @param   {string|number} data        input string or number
 * @param   {boolean} [isRound = false] option if you want the number rounded or raw float
 * @return  {number}
 */
export function getNumber(data, isRound = false) {
  let number = parseFloat(String(data).replace(/(?!^-)[^(\d|.)]/g, ''))
  number = Number.isNaN(number) ? 0 : number

  return isRound ? Math.round(number) : number
}
