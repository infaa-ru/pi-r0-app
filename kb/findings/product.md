---
id: findings.product
tier: internal
doc_type: findings
owners: [fixture-team]
---

<!-- Generated from product.yaml — edit the YAML -->

# Product findings (R0 sandbox)

Synthetic registry of the R0 sandbox.

## Summary

| System | bug | ux | dead | test-gap | debt | decision | ops | total |
|---|---|---|---|---|---|---|---|---|
| Shop | · | · | · | · | 1 | · | · | 1 |
| **Total** | **0** | **0** | **0** | **0** | **1** | **0** | **0** | **1** |

Priorities: P1 — 0, P2 — 0, P3 — 1, P4 — 0, — — 0.

## Shop

| ID | Type | Subsystem | Priority | Summary | Where described | Source | Status | Depends on |
|---|---|---|---|---|---|---|---|---|
| F-001 | debt | shop.orders | P3 | The orders contract has no cancelled-order example | {{cap:shop.orders.order-list}} | fixture walkthrough | open | — |
