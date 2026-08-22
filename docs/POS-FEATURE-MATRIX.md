# POS System — Feature Matrix

**Version:** 1.0

---

# 1. Purpose

This document defines which capabilities belong to different business configurations.

The product remains one system.

Features are enabled according to requirements.

---

# 2. Business Configuration Matrix

| Feature            | Small Local | Small Cloud | Restaurant  | Multi-Branch |
| ------------------ | ----------- | ----------- | ----------- | ------------ |
| Sales              | Core        | Core        | Core        | Core         |
| Billing            | Core        | Core        | Core        | Core         |
| Products           | Core        | Core        | Core        | Core         |
| Payments           | Core        | Core        | Core        | Core         |
| Sales History      | Core        | Core        | Core        | Core         |
| Basic Reports      | Core        | Core        | Core        | Core         |
| Barcode Scanner    | Optional    | Optional    | Optional    | Optional     |
| Camera Scanner     | Optional    | Optional    | Optional    | Optional     |
| Inventory          | Optional    | Optional    | Recommended | Recommended  |
| Customers          | Optional    | Optional    | Optional    | Optional     |
| Printing           | Optional    | Optional    | Recommended | Recommended  |
| XLSX Export        | Optional    | Optional    | Optional    | Recommended  |
| CSV Export         | Optional    | Optional    | Optional    | Recommended  |
| PDF Export         | Optional    | Optional    | Optional    | Recommended  |
| Online Orders      | Optional    | Optional    | Optional    | Optional     |
| Swiggy             | Optional    | Optional    | Optional    | Optional     |
| Zomato             | Optional    | Optional    | Optional    | Optional     |
| Multi-Branch       | No          | No          | Optional    | Core         |
| Cloud Sync         | No          | Core        | Optional    | Core         |
| Offline Operation  | Core        | Optional    | Recommended | Recommended  |
| Hybrid             | Optional    | Optional    | Optional    | Recommended  |
| Central Management | No          | Optional    | Optional    | Core         |

---

# 3. Core Features

Core features should remain available in every normal configuration:

* Business setup
* Products
* Sales
* Payments
* Sales history
* Basic reports

---

# 4. Optional Features

Optional features include:

* Inventory
* Customers
* Barcode scanning
* Camera scanning
* Printing
* Export
* Online orders
* Marketplace integrations
* Multi-branch
* Cloud
* Hybrid
* Advanced reporting

---

# 5. Configuration Principle

If a business does not enable a module:

* It should not be required during setup.
* It should not create unnecessary configuration.
* It should not clutter the main POS workflow.
* It should not introduce unnecessary dependencies.

---

# 6. Example — Simple Shop

```text
Enabled:
✓ Sales
✓ Products
✓ Barcode
✓ Printing
✓ Basic Reports

Disabled:
✗ Online Orders
✗ Swiggy
✗ Zomato
✗ Multi-Branch
```

---

# 7. Example — Restaurant

```text
Enabled:
✓ Sales
✓ Products
✓ Inventory
✓ Printing
✓ Barcode
✓ Online Orders
✓ Swiggy
✓ Zomato
✓ Reports
```

---

# 8. Example — Multi-Branch Business

```text
Enabled:
✓ Sales
✓ Products
✓ Inventory
✓ Users
✓ Branches
✓ Cloud
✓ Synchronization
✓ Central Reports
✓ Printing
✓ Export
```

---

# 9. Feature Activation

Feature activation should eventually be represented through configuration rather than separate applications.

Conceptually:

```text
Business Configuration
        ↓
Enabled Modules
        ↓
POS Experience
```

---

# 10. Product Rule

Never assume:

> More features = better POS.

The objective is:

> **The right features for the right business.**
