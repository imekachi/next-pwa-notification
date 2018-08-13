export const FONT_FALLBACK = 'Arial, sans-serif'
export const FONT_FAMILY_NAMES = {
  ROBOTO: 'Roboto',
  TAHOMA: 'Tahoma',
  ARIAL: 'Arial',
}
export const FONT_FAMILIES = Object.keys(FONT_FAMILY_NAMES).reduce((families, font) => {
  const family = {
    [font]: `${FONT_FAMILY_NAMES[font]}, ${FONT_FALLBACK}`,
  }

  if (font === 'ARIAL') {
    family[font] = FONT_FALLBACK
  }

  return Object.assign({}, families, family)
}, {})

export const LINE_HEIGHTS = {
  DEFAULT: 1.2142857142857142, // (17 / 14) browser default
  SMALL: 1.2857142857142858, // (18 / 14)
  MEDIUM: 1.4285714285714286, // (20 / 14)
}

export const FONT_FACE_FORMATS = {
  eot: 'embedded-opentype',
  woff: 'woff',
  ttf: 'truetype',
  svg: 'svg',
}
export const FONT_FACE_FORMAT_KEYS = Object.keys(FONT_FACE_FORMATS)

export const FONT_FACE_CONFIGS = {
  // SUKHUMVIT: {
  //   familyName: FONT_FAMILY_NAMES.SUKHUMVIT,
  //   weight: 'normal',
  //   path: '',
  //   filename: 'sukhumvitreg-webfont',
  //   minify: true,
  // },
  // SUKHUMVIT_LIGHT: {
  //   familyName: FONT_FAMILY_NAMES.SUKHUMVIT,
  //   weight: 100,
  //   path: '',
  //   filename: 'sukhumvitlight-webfont',
  //   minify: true,
  // },
}
