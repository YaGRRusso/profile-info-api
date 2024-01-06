import { connectMany, connectOne } from './prisma.helper'

describe('Prisma Helper', () => {
  it('should be return connection with one id', () => {
    const res = connectOne('123')
    expect(res).toStrictEqual({ connect: { id: '123' } })
  })

  it('should be return connection with many ids', () => {
    const res = connectMany(['123', '456', '789'])
    expect(res).toStrictEqual({
      connect: [{ id: '123' }, { id: '456' }, { id: '789' }],
    })
  })
})
