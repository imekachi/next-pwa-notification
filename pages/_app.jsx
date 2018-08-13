import PropTypes from 'prop-types'
import React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../styles/themes'
import PropTypesCustom from '../utils/propTypes'

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    )
  }
}

CustomApp.propTypes = {
  pageProps: PropTypes.object,
  Component: PropTypesCustom.component.isRequired,
}

CustomApp.defaultProps = {
  pageProps: {},
}
