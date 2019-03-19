export const objset = <T>(target: Object, source: T, omit?: keyof T) =>
  target &&
  source &&
  Object.keys(source).forEach(key => {
    if (key === omit) {
      return
    } else {
      target[key] !== source[key] ? (target[key] = source[key]) : null
    }
  })
