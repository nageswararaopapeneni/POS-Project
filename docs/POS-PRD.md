# POS System — Product Requirements Document

**Version:** 1.0
**Status:** Product Baseline
**Product:** Configurable Cross-Platform POS & Sales Tracking Platform

---

## 1. Product Vision

Build one POS product that adapts to the requirements of each business.

The product is primarily a **Sales + Tracking POS**, not a full ERP.

It should be simple enough for a small shop while being capable of supporting restaurants and multi-branch businesses when additional capabilities are enabled.

### Core Principle

> **Configure the product according to the business instead of forcing the business to use unnecessary features.**

---

## 2. Target Businesses

### Small Businesses

Examples:

* Retail shops
* Grocery stores
* Clothing stores
* Electronics stores
* Specialty shops
* Small restaurants
* Other local businesses

Typical requirements:

* Sales
* Billing
* Product management
* Stock tracking when required
* Customers when required
* Printing
* Reports
* Data export

Deployment may be:

* Local
* Cloud

---

### Restaurant / Food Businesses

May additionally require:

* Inventory
* Online orders
* Swiggy
* Zomato
* Printing
* Order tracking
* Restaurant-specific workflows

These capabilities remain optional.

---

### Multi-Branch Businesses

May require:

* Multiple branches
* Central management
* Branch-level POS
* Branch-level users
* Branch-level tracking
* Cloud infrastructure
* Local infrastructure
* Hybrid operation
* Synchronization
* Central reports
* Branch reports

---

# 3. Core Product Workflow

The fundamental POS workflow is:

```text
Product
   ↓
Cart
   ↓
Sale
   ↓
Payment
   ↓
Receipt
   ↓
Transaction Tracking
```

If inventory is enabled:

```text
Sale
   ↓
Inventory Movement
```

---

# 4. Configurable Modules

## Core

* Business
* Users
* Products
* Sales
* Payments
* Receipts
* Sales history
* Basic reports

## Optional

* Inventory
* Customers
* Discounts
* Returns/refunds
* Barcode scanning
* Camera scanning
* Printing
* XLSX export
* CSV export
* PDF export
* Online orders
* Swiggy
* Zomato
* Multi-branch
* Cloud synchronization
* Hybrid operation
* Advanced reports

A business must not be forced to configure or use an optional module.

---

# 5. Product Setup

A business can configure:

* Business name
* Logo
* Contact information
* Address
* Currency
* Tax settings
* Receipt settings
* Enabled modules
* Users
* Branches where applicable
* Devices
* Printers
* Barcode options
* Payment methods

---

# 6. Product Management

Products should support:

* Name
* SKU
* Barcode
* Category
* Brand
* Cost price
* Selling price
* Tax
* Unit
* Stock when inventory is enabled
* Minimum stock level
* Image
* Active/inactive status

Actions:

* Create
* Edit
* Archive
* Search
* Filter
* Import
* Export

---

# 7. POS Billing

The POS should support:

* Product search
* Barcode scanner
* Camera scanner
* Category selection
* Cart
* Quantity modification
* Item removal
* Discount
* Tax
* Customer selection
* Payment
* Sale completion
* Receipt generation

The checkout workflow should prioritize speed and simplicity.

---

# 8. Barcode Scanning

Two input methods are required.

### Physical Scanner

Support common:

* USB scanners
* Bluetooth scanners
* HID/keyboard scanners

### Camera

Support:

* Android camera
* iOS camera
* Supported desktop/laptop cameras where practical

Both methods must use the same product lookup logic.

Common barcode formats should be supported, including:

* EAN-13
* EAN-8
* UPC-A
* UPC-E
* Code 128
* Code 39
* QR where appropriate

---

# 9. Payments

Initial payment methods:

* Cash
* Card
* UPI
* Manual/Other

Payment records should contain:

* Sale reference
* Amount
* Method
* Status
* Reference number where applicable
* Date/time
* User

Payment providers should be implemented through integrations rather than being embedded directly into sales logic.

---

# 10. Printing

Support:

* 58mm thermal
* 80mm thermal
* A4
* USB printers
* Network printers
* Bluetooth printers where supported

Printing must not determine whether a sale is successful.

Correct workflow:

```text
Sale
 ↓
Transaction saved
 ↓
Receipt generated
 ↓
Print
```

If printing fails, the sale remains valid.

---

# 11. Inventory Tracking

Inventory is optional.

When enabled, track:

### Stock In

* Purchase
* Return
* Adjustment

### Stock Out

* Sale
* Damage
* Adjustment
* Transfer

Every movement must be traceable.

---

# 12. Customers

Optional customer functionality:

* Name
* Phone
* Email
* Address
* Purchase history

Future possibilities:

* Loyalty
* Credit
* Offers
* Customer analytics

---

# 13. Online Orders

Online ordering is optional.

If the customer does not need online ordering:

* Do not ask them to configure it.
* Do not display unnecessary integration settings.
* Do not add online-order workflows to their normal POS experience.

If enabled, integrations may include:

* Swiggy
* Zomato
* Other supported platforms

---

# 14. Sales Tracking

The system should track:

* Sales
* Items sold
* Payment methods
* Users/cashiers
* Branch
* Device
* Date/time
* Discounts
* Taxes
* Returns/refunds

---

# 15. Reports

Basic reports:

* Daily sales
* Weekly sales
* Monthly sales
* Product sales
* Payment breakdown
* Cashier sales
* Branch sales
* Inventory reports where enabled
* Online-order reports where enabled

---

# 16. Data Export

Support:

* XLSX
* CSV
* PDF

Export categories:

* Sales
* Sale items
* Products
* Inventory
* Customers
* Payments
* Orders
* Branch data
* Reports

Exports must respect permissions.

---

# 17. Deployment

The product must support:

### Local

For businesses that want local infrastructure and/or offline operation.

### Cloud

For businesses that want:

* Remote access
* Centralized management
* Multiple devices
* Multi-branch management

### Hybrid

For businesses that require:

* Local operation
* Offline capability
* Cloud synchronization
* Central management

---

# 18. Supported Platforms

### Desktop

* Windows
* macOS
* Linux
* Ubuntu

### Mobile

* Android
* iOS

The business/domain logic should be shared wherever practical.

---

# 19. Multi-Branch

Optional module.

A business can have:

```text
Business
├── Branch A
├── Branch B
└── Branch C
```

Each branch may have:

* Users
* Devices
* Sales
* Inventory
* Orders

Central management may provide:

* Consolidated sales
* Branch comparison
* Central reporting
* Product management

---

# 20. Security

Required:

* Authentication
* Authorization
* Role-based access
* Business isolation
* Branch-level permissions
* Secure sessions
* Input validation
* API security
* Audit logging
* Secrets management

---

# 21. Transaction Integrity

Sales must be durable business records.

Do not silently modify completed financial transactions.

Use:

* Refunds
* Returns
* Reversals
* Adjustments
* Audit logs

when corrections are required.

---

# 22. MVP

The first usable MVP should prove:

1. Business setup
2. Product management
3. Product search
4. Barcode scanning
5. Camera scanning
6. Cart
7. Sale
8. Payment
9. Receipt
10. Sales history
11. Basic tracking
12. Printing
13. Basic reports
14. Data export

Online ordering and multi-branch capabilities can be introduced based on validation.

---

# 23. Product Boundary

The product should not automatically expand into:

* Payroll
* HR
* Manufacturing
* Full accounting
* Full ERP
* Advanced CRM
* Complex warehouse management

Such capabilities require explicit product decisions.

---

# 24. Definition of Success

A real business should be able to:

```text
Setup Business
      ↓
Add Products
      ↓
Scan/Search Product
      ↓
Create Sale
      ↓
Take Payment
      ↓
Generate Receipt
      ↓
Print
      ↓
Track Transaction
      ↓
View Reports
      ↓
Export Data
```

The product succeeds when this workflow is reliable, fast, and simple.
