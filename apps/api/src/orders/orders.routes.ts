import { app } from '../app.ts'
import { listOrders, placeOrder } from './orders.service.ts'

app.get('/shops/:shopId/orders', { permission: 'orders.view' }, (req) => listOrders(req.params.shopId))
app.post('/shops/:shopId/orders', { permission: 'orders.place' }, (req) => placeOrder(req.params.shopId, Number(req.body.totalCents)))
