export const combineStrWith = (combineWith = ' ', filterFn = () => true, ...strings) =>
  strings.filter(filterFn).join(combineWith)

export const classNames = (...classes) =>
  combineStrWith(
    ' ', // combine with space
    item => !!item, // remove all falsy values
    ...classes
  )
