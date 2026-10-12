export interface Order {
  readonly id: string
  readonly status: 'new' | 'shipped' | 'cancelled'
  readonly totalCents: number
}

const orders: Order[] = [{ id: 'o-1', status: 'new', totalCents: 900 }]

export function listOrders(_shopId: string): readonly Order[] {
  return orders
}

export function placeOrder(_shopId: string, totalCents: number): Order {
  return { id: `o-${orders.length + 1}`, status: 'new', totalCents }
}
