import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import COLORS from '../styles/colors'
import { FONT_FAMILIES } from '../styles/fonts'
import SHADOWS from '../styles/shadows'
import { withFlexCenter } from '../styles/snippets'
import { fontShorten } from '../styles/utils'

const styles = {
  button: {
    fontFamily: FONT_FAMILIES.ROBOTO,
    fontWeight: 'bold',
  },
}

const ContentContainer = styled.div`
  ${withFlexCenter};
  flex-direction: column;
  flex: 1;
`

const Button = styled.button`
  ${fontShorten(styles.button)};
  display: block;
  padding: 12px;
  border-radius: 3px;
  background-color: ${props => props.backgroundColor || props.theme.colors.secondary};
  color: ${props => props.color || props.theme.colors.textOnSecondary};
  min-width: 150px;
  border: 0 none;
  outline: none;
  box-shadow: ${SHADOWS.BUTTON};
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin: 15px auto;

  &:active {
    box-shadow: ${SHADOWS.BUTTON_FLOATING};
  }
`

const Home = () => (
  <Layout>
    <ContentContainer>
      <Button>Test</Button>
      <Button backgroundColor={COLORS.RED} color={COLORS.WHITE}>
        Test 2
      </Button>
    </ContentContainer>
  </Layout>
)

export default Home
