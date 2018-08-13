import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { injectGlobalCSS } from '../styles/global'
import defaultTheme from '../styles/themes'

// Inject global css by styled-components
// note: this styled cannot be changed on client side,
// it will be compiled by server once
injectGlobalCSS()

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags,
    }
  }

  render() {
    return (
      <html lang="th">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Language" content="th" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
          />
          <meta name="theme-color" content={defaultTheme.colors.primary} />
          <link href="/static/favicon.ico" rel="icon" type="image/ico" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet" />
          <link rel="manifest" href="/static/manifest/manifest.json" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
