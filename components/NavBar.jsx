import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { FONT_FAMILIES } from '../styles/fonts'
import SHADOWS from '../styles/shadows'
import { withFlexCenter } from '../styles/snippets'
import { fontShorten } from '../styles/utils'
import { parsePixel } from '../utils/unitConverter'
import Container from './Container'

export const styles = {
  height: 56,
  fontSize: 18,
  fontFamily: FONT_FAMILIES.ROBOTO,
  lineHeight: 1,
}

const Wrapper = styled.nav`
  position: relative;
  height: ${parsePixel(styles.height)};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textOnPrimary};
  box-shadow: ${SHADOWS.NAV_BAR};
`

const NavContainer = Container.extend`
  height: 100%;
  ${withFlexCenter};
  ${fontShorten(styles)};
`

const NavBar = ({ title }) => (
  <Wrapper>
    <NavContainer>{title}</NavContainer>
  </Wrapper>
)

NavBar.propTypes = {
  title: PropTypes.string,
}

NavBar.defaultProps = {
  title: 'Home',
}

export default NavBar
