---
id: shop.orders.order-list/internal
tier: internal
node: cap:shop.orders.order-list
doc_type: capability
verified_at: "df1e3e9f"
verified_on: "2026-10-06"
owners: [fixture-team]
watch:
  - apps/api/src/orders/**
---

# See orders: internals

## Code

The route {{api:GET /shops/:shopId/orders}} calls {{code:apps/api/src/orders/orders.service.ts#listOrders}}. The response shape is the contract {{code:contracts:src/contract/orders.ts#OrderDto}} in the contracts repository.

## Tests

{{test:apps/api/src/orders/orders.service.test.ts}} covers the list; {{test:contracts:tests/orders.contract.test.ts}} pins the statuses.
