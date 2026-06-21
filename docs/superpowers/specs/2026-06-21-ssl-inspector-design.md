# SSL/TLS Certificate Inspector Design Spec

**Goal:** Implement a hybrid SSL/TLS Certificate Inspector under the "Network & Security" tab of the Cyber Deck.

## 1. Features
- **Live Domain Check**: Queries a live domain (e.g. `google.com`), runs a secure TLS connection on the backend (port 443), and pulls the active certificate details.
- **Local PEM Decoder**: Parses pasted PEM formatted certificate texts (`-----BEGIN CERTIFICATE-----`) or uploaded file payloads locally in the browser.
- **Detailed Metadata**: Decodes Common Name (CN), Issuer, Serial Number, Validity Dates (Not Before / Not After), Fingerprint (SHA-256), and Key properties.

## 2. Technical Architecture

### A. Next.js API Route (`/api/ssl-inspect`)
- Location: [route.ts](file:///d:/ai/Rana/src/app/api/ssl-inspect/route.ts)
- Inputs: Query parameter `domain` (e.g., `github.com`).
- Logic:
  1. Clean host name (strip `https://` and path names).
  2. Use Node's built-in `tls.connect` to establish a secure socket.
  3. Retrieve `socket.getPeerCertificate(true)` to inspect certificate metadata.
  4. Format attributes (Common Name, Issuer, Validity Dates, Fingerprints) and return JSON.
  5. Handle error states gracefully (timeout, invalid domain, no TLS port open).

### B. Client-side Decoder
- Paste PEM certificate data, strip headers, base64-decode the DER block.
- Implement a lightweight, local ASN.1 parsing helper to extract standard X.509 values:
  - Validity range (UTCTime / GeneralizedTime).
  - Subject and Issuer details (Common Names).
  - Public Key type and length.

### C. UI Integration
- Locate in the **Network & Security** tab as a new sub-tab: `SSL Inspector` (`t('security.sub_ssl')`).
- Include sub-panels:
  - **Query Live Domain**: Input box for Domain Name and a "FETCH CERTIFICATE" button.
  - **Decode Certificate**: Textarea for pasting PEM files, file upload input, and a "DECODE PEM" button.
- Support Bilingual English and Bengali labels.

## 3. Verification Plan
- Verify build compiles cleanly.
- Verify live domain check retrieves real certificate headers.
- Verify local PEM parsing outputs valid metadata.
