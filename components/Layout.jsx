import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import defaultTheme from '../styles/themes'
import PropTypesCustom from '../utils/propTypes'
import { parseWithDefault } from '../utils/unitConverter'
import Container from './Container'
import NavBar from './NavBar'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;

  // if background-color is not default color, we have to provide the color of background here
  // if we do it in body it will have an issue with global scope
  ${props =>
    props.theme.colors.background !== defaultTheme.colors.background &&
    css`
      background-color: ${props.theme.colors.background};
    `};
`

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${props =>
    parseWithDefault(props.innerSpaceBottom, props.theme.pageWrapper.innerSpaceBottom)};

  > * {
    width: 100%;
  }
`

const MainContainer = Container.extend`
  // this will make Loader that is direct child work properly. Because it's absolute position.
  position: relative;

  flex: 1;
  width: 100%;

  // this will make its children aware of its height
  display: flex;
  flex-direction: column;

  // make page wrapper stretch height to fill
  > ${PageWrapper} {
    flex: 1;
  }
`

const Layout = props => {
  const { children, withNavBar } = props

  return (
    <MainWrapper>
      {withNavBar && <NavBar />}
      <MainContainer>{children}</MainContainer>
    </MainWrapper>
  )
}

Layout.propTypes = {
  withNavBar: PropTypes.bool,
  children: PropTypesCustom.children.isRequired,
}

Layout.defaultProps = {
  withNavBar: true,
}

export default Layout
