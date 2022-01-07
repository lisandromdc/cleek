export default {
  // general
  size: (type) => {
    return ['xs', 's', 'm', 'l', 'xl'].includes(type)
  },
  group: (type) => {
    return ['left', 'right', 'center'].includes(type)
  },
  groupVertical: (type) => {
    return ['top', 'bottom', 'center'].includes(type)
  },
  // specials
  buttonType: (type) => {
    return ['filled', 'outlined', 'text'].includes(type)
  },
};