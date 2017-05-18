import { add0 } from '@/util'

describe('util.js', () => {
  it('add0', () => {
    expect(add0(1))
      .to.equal('01')
  })
})
