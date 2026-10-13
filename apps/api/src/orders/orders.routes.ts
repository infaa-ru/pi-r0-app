import { app } from '../app.ts'
import { listOrders, placeOrder, returnOrder } from './orders.service.ts'

app.get('/shops/:shopId/orders', { permission: 'orders.view' }, (req) => listOrders(req.params.shopId))
app.post('/shops/:shopId/orders', { permission: 'orders.place' }, (req) => placeOrder(req.params.shopId, Number(req.body.totalCents)))
app.post('/shops/:shopId/orders/:orderId/return', { permission: 'orders.return' }, (req) => returnOrder(req.params.shopId, req.params.orderId))
