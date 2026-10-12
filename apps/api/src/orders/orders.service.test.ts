import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { listOrders, placeOrder } from './orders.service.ts'

describe('orders service', () => {
  it('lists the seeded order', () => {
    assert.equal(listOrders('shop-1').length, 1)
  })

  it('places a new order', () => {
    assert.equal(placeOrder('shop-1', 100).status, 'new')
  })
})
