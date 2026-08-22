# POS System — Product and Architecture Decision Record

**Version:** 1.0

This document records important product and architecture decisions.

These decisions are part of the project source of truth.

---

# DEC-001 — POS Instead of ERP

**Decision:** Build a POS and sales-tracking system.

**Reason:** The primary target is small businesses that need simple sales operations.

**Status:** Accepted

---

# DEC-002 — One Product

**Decision:** Small business, restaurant, and multi-branch configurations use the same product.

**Reason:** Avoid maintaining multiple independent products.

**Status:** Accepted

---

# DEC-003 — Configurable Features

**Decision:** Features are enabled according to business requirements.

**Reason:** A business should not be forced to use irrelevant functionality.

**Status:** Accepted

---

# DEC-004 — Online Orders Are Optional

**Decision:** Online ordering is optional.

**Reason:** Businesses that do not require online ordering should not be asked to configure it.

**Status:** Accepted

---

# DEC-005 — Swiggy and Zomato

**Decision:** Swiggy and Zomato are optional integrations.

**Reason:** Only relevant businesses should enable them.

**Status:** Accepted

---

# DEC-006 — Local Deployment

**Decision:** Support local deployments.

**Reason:** Some businesses need local operation, local control, or offline capability.

**Status:** Accepted

---

# DEC-007 — Cloud Deployment

**Decision:** Support cloud deployment.

**Reason:** Some businesses require remote access, centralized management, and multi-branch operation.

**Status:** Accepted

---

# DEC-008 — Hybrid Deployment

**Decision:** Support hybrid local + cloud operation.

**Reason:** Multi-branch and connectivity-sensitive businesses may need local operation with central cloud synchronization.

**Status:** Accepted

---

# DEC-009 — Supported Platforms

**Decision:** Support:

* Windows
* macOS
* Linux
* Ubuntu
* Android
* iOS

**Reason:** Businesses use different hardware.

**Status:** Accepted

---

# DEC-010 — Barcode Scanner

**Decision:** Support physical barcode scanners.

**Reason:** Physical scanners are common POS hardware.

**Status:** Accepted

---

# DEC-011 — Camera Scanner

**Decision:** Support camera barcode scanning.

**Reason:** Mobile devices can perform barcode scanning without dedicated hardware.

**Status:** Accepted

---

# DEC-012 — Shared Barcode Pipeline

**Decision:** Physical scanner and camera scanner must use the same product lookup/business workflow.

**Reason:** Prevent duplicate business logic.

**Status:** Accepted

---

# DEC-013 — Printing

**Decision:** Support thermal and standard printing.

**Reason:** Physical businesses require printed receipts/documents.

**Status:** Accepted

---

# DEC-014 — Printing Must Not Control Sale Success

**Decision:** A printer failure must not invalidate a successful transaction.

**Reason:** Transaction persistence is more important than physical printing.

**Status:** Accepted

---

# DEC-015 — Data Export

**Decision:** Support XLSX, CSV, and PDF.

**Reason:** Businesses need access to their operational data.

**Status:** Accepted

---

# DEC-016 — Modular Integrations

**Decision:** External services use adapters.

**Reason:** External providers must not be tightly coupled to the POS core.

**Status:** Accepted

---

# DEC-017 — Modular Architecture

**Decision:** Start with a modular monolith.

**Reason:** Keep the initial system maintainable without unnecessary distributed-system complexity.

**Status:** Accepted

---

# DEC-018 — Offline Operation

**Decision:** Local/hybrid deployments should support essential POS operation without internet.

**Reason:** Internet failure should not unnecessarily stop physical sales.

**Status:** Accepted

---

# DEC-019 — Transaction Integrity

**Decision:** Sales and payment records must be durable and auditable.

**Reason:** Financial and inventory data must remain trustworthy.

**Status:** Accepted

---

# DEC-020 — No Automatic ERP Expansion

**Decision:** Do not automatically add ERP functionality.

**Reason:** Product scope must remain focused.

**Status:** Accepted

---

# DEC-021 — Customer-Specific Configuration

**Decision:** The same product should adapt to different businesses through configuration.

**Reason:** Avoid separate products/codebases for different customer types.

**Status:** Accepted

---

# DEC-022 — Future Decision Process

Before changing an accepted decision:

1. Identify the existing decision.
2. Explain the new requirement.
3. Explain the conflict.
4. Evaluate alternatives.
5. Decide whether the original decision should change.
6. Record the new decision.
7. Preserve the historical decision.

Never silently overwrite architectural decisions.
