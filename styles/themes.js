import COLORS from './colors'
import { FONT_FAMILIES } from './fonts'
import { CONTAINER_MAX_WIDTHS } from './layout'

const defaultTheme = {
  fontSizes: {
    root: 14,
  },
  fontFamilies: {
    normal: FONT_FAMILIES.ROBOTO,
  },
  colors: {
    primary: '#0257ee',
    primaryLight: '#6783ff',
    primaryDark: '#002fba',
    textOnPrimary: COLORS.WHITE,
    secondary: '#fdd835',
    secondaryLight: '#ffff6b',
    secondaryDark: '#c6a700',
    textOnSecondary: COLORS.BLACK,
    text: COLORS.GRAY_DARK_3,
    background: COLORS.GRAY_LIGHT_4,
    link: COLORS.ORANGE_THEME,
  },
  container: {
    maxWidth: CONTAINER_MAX_WIDTHS.MEDIUM,
    innerSpaceX: 15,
  },
  pageWrapper: {
    innerSpaceBottom: 75,
  },
  borderRadius: 10,
}

export default defaultTheme
