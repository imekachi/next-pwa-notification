import styled, { css } from 'styled-components'
import { parsePixel, parseWithDefault } from '../utils/unitConverter'

export const getInnerSpaceX = ({ innerSpaceX, theme }, withUnit = true) => {
  const noParser = value => value
  // If withUnit is true, then customParser is undefined,
  // which means parseWithDefault will use the default parser for it.
  // But if withUnit is false, it will send in `noParser` function
  // which will return value without parsing anything, so no unit is attached
  const customParser = withUnit ? undefined : noParser
  return parseWithDefault(innerSpaceX, theme.container.innerSpaceX, customParser)
}

const Container = styled.div`
  ${props =>
    props.position &&
    css`
      position: ${props.position};
    `};
  max-width: ${props => parsePixel(props.maxWidth || props.theme.container.maxWidth)};
  margin: auto;
  padding: 0 ${getInnerSpaceX};
  ${props => props.minWidth && `min-width: ${parsePixel(props.minWidth)}`};
  ${props => props.width && `width: ${parsePixel(props.width)}`};
`

export default Container
