import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { listOrders, placeOrder, returnOrder } from './orders.service.ts'

describe('orders service', () => {
  it('lists the seeded order', () => {
    assert.equal(listOrders('shop-1').length, 2)
  })

  it('places a new order', () => {
    assert.equal(placeOrder('shop-1', 100).status, 'new')
  })

  it('returns a shipped order', () => {
    assert.equal(returnOrder('shop-1', 'o-2').status, 'returned')
  })

  it('refuses to return an order that was not shipped', () => {
    assert.throws(() => returnOrder('shop-1', 'o-1'))
  })
})
