declare function pgTable(name: string, columns: Record<string, string>): unknown

export const orders = pgTable('orders', { id: 'text', status: 'text', totalCents: 'integer' })
