# POS System — Platform Support Specification

**Version:** 1.0

---

# 1. Supported Platforms

## Desktop

* Windows
* macOS
* Linux
* Ubuntu

## Mobile

* Android
* iOS

---

# 2. Cross-Platform Principle

The product should share business logic wherever practical.

Shared areas:

* Product logic
* Sales rules
* Payment rules
* Validation
* Permissions
* Transaction rules
* Synchronization
* Reporting

Platform-specific areas:

* UI
* Camera
* Printing
* Hardware
* Local storage
* OS integration

---

# 3. Desktop

Desktop clients should support:

* Keyboard
* Mouse
* Barcode scanner
* Thermal printer
* A4 printer
* Network printer
* Offline operation where configured

---

# 4. Windows

Consider:

* USB scanners
* Windows printers
* Network printers
* Local database/service
* Keyboard shortcuts

---

# 5. macOS

Consider:

* USB scanners
* macOS printers
* Network printers
* Camera
* Local operation

---

# 6. Linux / Ubuntu

Consider:

* USB scanners
* CUPS printing
* Network printers
* Local database/service
* Camera support where practical

Ubuntu should be treated as an important supported Linux environment rather than assuming all Linux distributions behave identically.

---

# 7. Android

Support:

* Touch POS
* Camera barcode scanning
* Bluetooth scanners
* Bluetooth printers where supported
* Local data
* Offline operation where configured

---

# 8. iOS

Support:

* Touch POS
* Camera barcode scanning
* Bluetooth hardware where supported
* Printing where supported
* Local data
* Offline operation where configured

---

# 9. Barcode Scanning

Physical scanner:

```text
Scanner
 ↓
OS Input
 ↓
POS Barcode Handler
```

Camera:

```text
Camera
 ↓
Barcode Decoder
 ↓
POS Barcode Handler
```

Both must reach the same product lookup service.

---

# 10. Printing

Use a platform abstraction:

```text
POS
 ↓
Print Service
 ↓
Platform Adapter
 ↓
Printer
```

The business logic should not depend directly on an operating-system-specific printer API.

---

# 11. Offline

Where local/hybrid mode is configured, the client must support:

* Local persistence
* Transaction queue
* Retry
* Synchronization
* Conflict handling

---

# 12. Platform Testing

Each supported platform should eventually test:

* Installation
* Startup
* Login
* Product search
* Barcode scanning
* Sale
* Payment
* Receipt
* Printing
* Export
* Offline operation
* Synchronization
* Upgrade

---

# 13. Hardware Compatibility

Hardware support should prioritize standard interfaces and protocols where practical.

Do not unnecessarily lock the product to one scanner or printer manufacturer.

---

# 14. Platform Rule

A platform-specific limitation must not silently change business behavior.

If platform differences exist, isolate them behind an adapter or capability layer.
