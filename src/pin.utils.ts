export const removeValuesFromArray = (valuesArray: string[], value: string) => {

  const valueIndex = valuesArray.findIndex(entry => entry === value)
  if(valueIndex === -1) {
    return
  }
  valuesArray.splice(valueIndex, 1)
}