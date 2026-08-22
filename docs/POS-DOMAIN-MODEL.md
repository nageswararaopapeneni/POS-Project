# POS System — Domain Model

**Version:** 1.0

---

# 1. Business

Represents the customer organization.

Possible fields:

* id
* name
* contact
* address
* currency
* tax configuration
* settings
* createdAt
* updatedAt

---

# 2. Branch

Represents a physical business location.

Fields:

* id
* businessId
* name
* address
* status
* settings

---

# 3. User

Represents a person using the system.

Fields:

* id
* businessId
* branchId
* name
* email/phone
* role
* status

Possible roles:

* Owner
* Admin
* Manager
* Cashier
* Inventory Manager

---

# 4. Device

Represents a POS device.

Fields:

* id
* businessId
* branchId
* platform
* device type
* deployment mode
* status
* last sync
* configuration

---

# 5. Product

Fields:

* id
* businessId
* name
* SKU
* barcode
* category
* brand
* cost price
* selling price
* tax
* unit
* image
* status

---

# 6. Category

Fields:

* id
* businessId
* name
* parentId where applicable
* status

---

# 7. Inventory

Optional domain.

Fields:

* id
* productId
* branchId
* quantity
* minimumQuantity
* reservedQuantity

---

# 8. Inventory Movement

Represents stock movement.

Types:

* SALE
* PURCHASE
* RETURN
* DAMAGE
* ADJUSTMENT
* TRANSFER

Every movement should contain:

* quantity
* type
* source transaction
* user
* branch
* timestamp

---

# 9. Sale

Represents a completed sales transaction.

Fields:

* id
* businessId
* branchId
* deviceId
* userId
* customerId
* subtotal
* discount
* tax
* total
* status
* createdAt

---

# 10. Sale Item

Fields:

* id
* saleId
* productId
* quantity
* unitPrice
* discount
* tax
* total

---

# 11. Payment

Fields:

* id
* saleId
* method
* amount
* status
* reference
* createdAt

---

# 12. Customer

Optional.

Fields:

* id
* businessId
* name
* phone
* email
* address

---

# 13. Order

Used when online ordering is enabled.

Fields:

* id
* businessId
* branchId
* source
* externalOrderId
* status
* subtotal
* discount
* tax
* total
* createdAt

Possible sources:

* POS
* Swiggy
* Zomato
* Other

---

# 14. Integration

Represents an external service connection.

Fields may include:

* id
* businessId
* branchId
* provider
* status
* configuration
* createdAt
* updatedAt

Secrets must not be stored insecurely.

---

# 15. Receipt

Represents a generated sales document.

Possible relationships:

* Sale
* Template
* Printer
* Digital output

---

# 16. Export Job

Represents a data export.

Possible fields:

* id
* businessId
* userId
* type
* format
* filters
* status
* createdAt

---

# 17. Audit Log

Tracks important actions.

Examples:

* Sale
* Refund
* Stock adjustment
* Permission change
* Configuration change
* Integration change
* Login/security events

---

# 18. Entity Relationship

Conceptually:

```text
Business
 ├── Users
 ├── Branches
 │    ├── Devices
 │    ├── Sales
 │    ├── Inventory
 │    └── Orders
 │
 ├── Products
 ├── Customers
 ├── Integrations
 └── Reports
```

---

# 19. Transaction Integrity

A completed sale may create:

```text
Sale
 ├── Sale Items
 ├── Payment
 ├── Inventory Movement
 ├── Receipt
 └── Audit Log
```

The implementation must preserve consistency between related records.

---

# 20. Historical Records

Completed financial transactions should not normally be silently edited.

Use:

* Refund
* Return
* Reversal
* Adjustment

when correction is required.
