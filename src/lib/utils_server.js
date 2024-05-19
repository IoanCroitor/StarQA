// @ts-nocheck
export const serializeNonPOJOs = (obj) => {
  return structuredClone(obj)
}

export const generateUsername = (name) => {
  const random = Math.floor(Math.random() * 10000)
  return name.split(' ').join('') + random
}
