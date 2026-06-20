# Cyber Deck Utilities Expansion Design Spec

**Goal:** Expand the Cyber Deck page to integrate 11 new utilities across 6 organized categories (BD Essentials, Dev & Design, Security & Cryptography, Calculators, Network & Sysadmin, Media & Productivity).

## Proposed Categories & Tools

1. **BD Essentials**
   - Unicode ↔ Bijoy Converter
   - Age Calculator
   - Job Photo & Signature Resizer
2. **Dev & Design**
   - JSON Formatter / Validator
   - Base64 Text Converter
   - Base64 Image Encoder
   - Markdown Live Previewer
   - Color Picker
   - Diff Checker
   - Lorem Ipsum Generator
3. **Security & Cryptography**
   - Password Generator
   - Hash Generator (SHA-256 / MD5)
   - ROT13 & Caesar Cipher
   - QR Code Generator
4. **Calculators & Math**
   - GPA / CGPA Calculator
   - EMI / Loan Calculator
   - Percentage Calculator
   - Unit & Land Converter
   - Subnet (CIDR) Calculator
5. **Network & Sysadmin**
   - IP Lookup
   - DNS Diagnostics
   - MAC Address Lookup (fetches vendor from public lookup or offline mapping list)
   - Unix Timestamp Converter
6. **Media & Productivity**
   - YouTube Thumbnail Downloader
   - Word / Character Counter
   - Case Converter
   - Pomodoro Focus Timer
   - Timezone Planner

## User Interface & Design
- Expand categories header tabs to contain: `BD Essentials`, `Dev & Design`, `Security & Cryptography`, `Calculators & Math`, `Network & Sysadmin`, `Media & Productivity`.
- Incorporate simple interactive subtabs inside each panel view.
- Support language translations (English/Bengali) for all tabs, headers, buttons, and helper hints.

## Core Operations (Client-Side)
- **Base64 Image Encoder**: Uses `FileReader.readAsDataURL` on upload.
- **Markdown Live Previewer**: Renders markdown basic elements (headings, strong, list) client-side safely.
- **Password Generator**: Custom random character loop.
- **Hash Generator**: Uses Web Crypto API (`crypto.subtle.digest`) for secure, native SHA-256/SHA-1 client-side hashing without external packages.
- **Subnet (CIDR) Calculator**: Custom CIDR range calculation.
- **MAC Lookup**: Maps common prefixes (e.g. `00:00:5e`, `00:1a:11`) to vendors locally.
- **Timestamp Converter**: JS `Date` methods.
- **Pomodoro Focus Timer**: `setInterval` hook.
- **Timezone Planner**: Date conversion using target timezones.
