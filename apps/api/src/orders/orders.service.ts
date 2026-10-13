import type { OrderStatus } from '../../../../../contracts/src/contract/orders.ts'

export interface Order {
  readonly id: string
  readonly status: OrderStatus
  readonly totalCents: number
}

const orders: Order[] = [
  { id: 'o-1', status: 'new', totalCents: 900 },
  { id: 'o-2', status: 'shipped', totalCents: 500 },
]

export function listOrders(_shopId: string): readonly Order[] {
  return orders
}

export function placeOrder(_shopId: string, totalCents: number): Order {
  return { id: `o-${orders.length + 1}`, status: 'new', totalCents }
}

export function returnOrder(_shopId: string, orderId: string): Order {
  const order = orders.find((o) => o.id === orderId)
  if (!order) throw new Error(`order not found: ${orderId}`)
  if (order.status !== 'shipped') throw new Error(`only a shipped order can be returned: ${orderId}`)
  const returned: Order = { ...order, status: 'returned' }
  orders[orders.indexOf(order)] = returned
  return returned
}
