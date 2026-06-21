# Expanding Tips & Tricks Design Spec

**Goal:** Expand the "Tips & Tricks" bulletins section with three new real-world IT systems & cybersecurity engineering bulletins, and dynamic severity badge colors in the UI.

## Added Bulletins

We are adding 3 new blog posts:
1. **[SEC-ADV-26-03] Active Directory Hardening: CIS Benchmark Implementation** (Severity: `HIGH`, Category: `AD Hardening`)
2. **[SYS-RUN-26-04] Automating Patch Management & Compliance Audits** (Severity: `MEDIUM`, Category: `RMM Automation`)
3. **[NET-ADV-26-05] Perimeter Firewall Hardening & Network Port Auditing** (Severity: `LOW`, Category: `Network Security`)

## UI Enhancements

- **Severity Badge Colors**:
  - `HIGH`: Red theme (`bg-red-950/40 border-red-800 text-red-400`)
  - `MEDIUM`: Yellow theme (`bg-yellow-950/40 border-yellow-800 text-yellow-400`)
  - `LOW`: Cyan theme (`bg-cyan-950/40 border-cyan-800 text-cyan-400`)
- **Single Page View**:
  - Dynamically color-code the severity text under the header matching the list view theme.
