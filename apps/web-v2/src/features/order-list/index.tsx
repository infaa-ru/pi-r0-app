interface OrderRow {
  readonly id: string
  readonly note?: string
}

export const OrderTable = ({ orders = [] }: { readonly orders?: readonly OrderRow[] }) => (
  <ul>
    {orders.map((order) => (
      <li key={order.id}>
        {order.id}
        {order.note ? <span> {order.note}</span> : null}
      </li>
    ))}
  </ul>
)
