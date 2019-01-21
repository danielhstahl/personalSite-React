export const convertDataToXY = ({ dx, xmin, y }) =>
  y.map((y, index) => ({ y, x: xmin + dx * index }))
