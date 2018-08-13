import { css } from 'styled-components'
import { parsePixel } from '../utils/unitConverter'
import defaultTheme from './themes'

export const normalizeCSS = `
html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-box-sizing:border-box;box-sizing:border-box}body{margin:0;line-height: normal;font-size: 1em}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:Consolas,"Courier New",monospace;font-size:1em}a{background-color:transparent;text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:Consolas,"Courier New",monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#FF0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.21429}button,input{overflow:visible}button,select{text-transform:none}button,html [type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-cancel-button,[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}*,:before,:after{box-sizing:inherit}a,applet,article,audio,b,blockquote,body,canvas,caption,center,code,dfn,div,dl,dt,em,embed,footer,form,h1,h2,h3,h4,h5,h6,header,html,hr,i,iframe,img,ins,label,legend,li,ol,p,pre,section,small,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,ul,video{border:0 none;margin:0;padding:0;vertical-align:baseline}ul,li{list-style:none}a{text-decoration:none}i{font-style:normal;&fafont-style:normal!important}img{max-width:100%}
`

export const getBaseStyle = (theme = defaultTheme) => css`
  html {
    font-size: ${parsePixel(theme.fontSizes.root)};
  }
  body {
    font-family: ${theme.fontFamilies.normal};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`
