export const onChangeHOF = (fields, setFields) => key => value =>
  setFields({ ...fields, [key]: value.target.value })

export const getValueAndOnChangeHOF = (fields, onChange) => key => ({
  value: fields[key],
  onChange: onChange(key)
})

export const formOffset = { size: 8, offset: 4 }
