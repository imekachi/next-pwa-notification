import { injectGlobal } from 'styled-components'
import { iF } from '../utils/condition'
import { FONT_FACE_CONFIGS } from './fonts'
import { getBaseStyle, normalizeCSS } from './resets'
import defaultTheme from './themes'
import { fontFace } from './utils'

export const fontFaceDeclarationCSS = Object.values(FONT_FACE_CONFIGS).reduce(
  (result, config) => result + fontFace(config),
  ''
)

/**
 * injectGlobal css using styled-components injectGlobal with options
 *
 * @param   {Object} [options = {}]
 * @param   {boolean} [options.withNormalize = true] - inject normalize css
 * @param   {boolean} [options.withBaseStyle = true] - inject base style, such as root font-size, body bg color, font-family
 */
export const injectGlobalCSS = ({
  withNormalize = true,
  withBaseStyle = true,
} = {}) => injectGlobal`
    ${iF(withNormalize, normalizeCSS)}
    ${iF(withBaseStyle, getBaseStyle(defaultTheme))}
    ${fontFaceDeclarationCSS}
  `
