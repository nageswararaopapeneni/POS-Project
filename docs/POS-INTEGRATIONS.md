# POS System — Integration Specification

**Version:** 1.0

---

# 1. Integration Principle

External services must remain separate from the POS core.

Use an adapter model:

```text
POS Core
   ↓
Integration Interface
   ↓
Provider Adapter
   ↓
External Platform
```

This allows providers to be added or removed without rewriting core sales logic.

---

# 2. Online Ordering

Online ordering is optional.

A business that does not need online ordering should not be asked to configure it.

If enabled, online orders become another source of orders.

```text
Swiggy ──┐
Zomato ──┼──→ Integration Layer → POS Order Domain
Other ───┘
```

---

# 3. Swiggy

Potential capabilities:

* Order ingestion
* External order ID
* Product/item mapping
* Order status
* Cancellation
* Refund information
* Settlement information
* Order source tracking

Exact capabilities depend on the official integration/API access available at implementation time.

Do not invent undocumented APIs.

---

# 4. Zomato

Potential capabilities:

* Order ingestion
* External order ID
* Product/item mapping
* Order status
* Cancellation
* Refund information
* Settlement information
* Order source tracking

Exact capabilities depend on the official integration/API access available at implementation time.

Do not invent undocumented APIs.

---

# 5. Payment Integrations

Core payment methods:

* Cash
* Card
* UPI
* Other/manual

Future payment providers must use adapters.

The POS should not unnecessarily store sensitive payment credentials or card information.

---

# 6. Barcode Hardware

Supported input:

* USB HID scanner
* Bluetooth scanner
* Camera scanner

The barcode domain should receive a normalized barcode value regardless of source.

---

# 7. Printer Integration

Potential printer connections:

* USB
* Network
* Bluetooth where supported

Printer abstraction:

```text
POS
 ↓
Print Service
 ↓
Printer Adapter
 ↓
Physical Printer
```

Printer failure must not invalidate a completed transaction.

---

# 8. Export Integration

Supported outputs:

* XLSX
* CSV
* PDF

Export service:

```text
Data
 ↓
Permission Check
 ↓
Export Service
 ↓
Requested Format
```

---

# 9. Future Integrations

Potential future categories:

* Accounting
* Payment gateways
* E-commerce
* Delivery
* Messaging
* Tax services
* Customer engagement

Each new integration requires product validation before implementation.

---

# 10. Integration Security

Integrations must consider:

* API credentials
* OAuth where applicable
* Secret storage
* Token rotation
* Webhook verification
* Request validation
* Rate limits
* Retry
* Idempotency
* Audit logs

---

# 11. Integration Failure

External integration failure must not automatically corrupt the POS core.

For example:

```text
Swiggy unavailable
      ↓
POS continues normal local sales
      ↓
Integration retries according to policy
```

The exact behavior depends on the integration and business configuration.

---

# 12. Integration Rule

The POS must remain useful even when no external integration is enabled.
