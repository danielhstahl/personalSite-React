import { convertDataToXY } from './charts'
describe('convertDataToXY', () => {
  it('correctly creates xy', () => {
    const dx = 1
    const xmin = -4
    const y = [1, 2, 3, 4]
    const result = convertDataToXY({ dx, xmin, y })
    expect(result).toEqual([
      { y: 1, x: -4 },
      { y: 2, x: -3 },
      { y: 3, x: -2 },
      { y: 4, x: -1 }
    ])
  })
})
