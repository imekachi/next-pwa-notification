import PropTypes from 'prop-types'

const PropTypesCustom = {
  numberOrString: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
}

export default PropTypesCustom
