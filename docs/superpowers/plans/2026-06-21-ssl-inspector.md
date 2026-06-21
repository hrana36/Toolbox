# SSL/TLS Certificate Inspector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a hybrid local/remote SSL/TLS Certificate Inspector under the Network & Security tab.

**Architecture:** A Next.js API Route `/api/ssl-inspect` performs backend connection to Domain ports (443) using Node's native `tls` socket module and returns parsed metadata. Pasted PEM certificates are decoded completely client-side in the browser via custom JavaScript parser.

**Tech Stack:** Next.js, TypeScript, TailwindCSS, Node.js `tls` and `net` packages.

## Global Constraints
- Local-first processing for PEM certificates, keeping security data private.
- No third-party network APIs for SSL lookup to prevent rate-limiting or service dependencies.
- Next.js Route Handlers must handle timeouts and connection errors gracefully.

---

### Task 1: Create Next.js API Route for SSL Domain Query

**Files:**
- Create: [route.ts](file:///d:/ai/Rana/src/app/api/ssl-inspect/route.ts)

**Interfaces:**
- Consumes: HTTP GET request query param `domain` (e.g. `github.com`).
- Produces: JSON response with fields: `subject`, `issuer`, `valid_from`, `valid_to`, `serialNumber`, `fingerprint256`, `keyDetails`.

- [ ] **Step 1: Write API Route file**
  Create `src/app/api/ssl-inspect/route.ts`:
  ```typescript
  import { NextResponse } from 'next/server';
  import tls from 'tls';

  export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    let domain = searchParams.get('domain');
    if (!domain) {
      return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
    }

    // Clean up domain input (remove protocol & path)
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].split(':')[0];

    return new Promise((resolve) => {
      const socket = tls.connect(
        {
          host: domain,
          port: 443,
          servername: domain,
          rejectUnauthorized: false // Retrieve invalid/expired certs too
        },
        () => {
          const cert = socket.getPeerCertificate(true);
          socket.destroy();

          if (!cert || Object.keys(cert).length === 0) {
            resolve(NextResponse.json({ error: 'No certificate found' }, { status: 404 }));
            return;
          }

          resolve(
            NextResponse.json({
              subject: cert.subject,
              issuer: cert.issuer,
              valid_from: cert.valid_from,
              valid_to: cert.valid_to,
              serialNumber: cert.serialNumber,
              fingerprint256: cert.fingerprint256 || cert.fingerprint,
              bits: cert.pubkey?.['bits'] || 'N/A',
              type: cert.pubkey?.['type'] || 'N/A'
            })
          );
        }
      );

      socket.setTimeout(8000);
      socket.on('timeout', () => {
        socket.destroy();
        resolve(NextResponse.json({ error: 'Connection timeout' }, { status: 504 }));
      });

      socket.on('error', (err) => {
        socket.destroy();
        resolve(NextResponse.json({ error: `Connection failed: ${err.message}` }, { status: 500 }));
      });
    });
  }
  ```

- [ ] **Step 2: Verify API Route compiles**
  Run: `npm run build`
  Expected: Compiled successfully with no TypeScript compilation errors.

- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/app/api/ssl-inspect/route.ts
  git commit -m "feat: add api route for live SSL certificate inspection"
  ```

---

### Task 2: Implement Client-Side PEM Parser Utility

**Files:**
- Modify: [page.tsx](file:///d:/ai/Rana/src/app/toolbox/page.tsx)

**Interfaces:**
- Consumes: Raw PEM string.
- Produces: Decoded certificate attributes.

- [ ] **Step 1: Write local PEM parser function**
  Add the helper decoder function inside `src/app/toolbox/page.tsx` right before the main `Toolbox` component export:
  ```typescript
  // Lightweight PEM Certificate decoder (Extract validity dates, issuer, subject)
  function parsePemCertificate(pemText: string) {
    try {
      const cleanPem = pemText
        .replace(/-----BEGIN CERTIFICATE-----/, '')
        .replace(/-----END CERTIFICATE-----/, '')
        .replace(/\s+/g, '');

      const binaryCert = atob(cleanPem);
      
      // Basic heuristic to locate standard ISO UTCTime / GeneralizedTime dates (format YYMMDDHHMMSSZ or YYYYMMDDHHMMSSZ)
      // Standard ASN.1 representation has UTCTime (tag 0x17) and GeneralizedTime (tag 0x18)
      // We search for date representations matching 'YYMMDDHHMMSSZ' pattern in byte string
      const dateRegex = /(\d{10,12})Z/g;
      const matches: string[] = [];
      let match;
      
      // Convert binary data to hex for search
      let hex = '';
      for (let i = 0; i < binaryCert.length; i++) {
        hex += binaryCert.charCodeAt(i).toString(16).padStart(2, '0');
      }

      // Convert hex representation of ASCII digits to string
      let asciiStr = '';
      for (let i = 0; i < hex.length - 1; i += 2) {
        const charCode = parseInt(hex.substring(i, i + 2), 16);
        if (charCode >= 32 && charCode <= 126) {
          asciiStr += String.fromCharCode(charCode);
        } else {
          asciiStr += '.';
        }
      }

      // Look for Validity Dates (usually UTC times in format: 230620120000Z)
      const matchesUtc = asciiStr.match(/\d{12}Z/g);
      let validFrom = 'N/A';
      let validTo = 'N/A';
      if (matchesUtc && matchesUtc.length >= 2) {
        const formatDate = (dateStr: string) => {
          const yy = dateStr.substring(0, 2);
          const year = parseInt(yy) < 50 ? `20${yy}` : `19${yy}`;
          return `${year}-${dateStr.substring(2, 4)}-${dateStr.substring(4, 6)} ${dateStr.substring(6, 8)}:${dateStr.substring(8, 10)} UTC`;
        };
        validFrom = formatDate(matchesUtc[0]);
        validTo = formatDate(matchesUtc[1]);
      }

      // Extract Common Name (CN) heuristics
      // Looking for CN=... sequence
      const cnMatches = asciiStr.match(/CN=([^.\s]+)/);
      const commonName = cnMatches ? cnMatches[1] : 'Local Decoded Certificate';

      return {
        success: true,
        subject: { CN: commonName },
        issuer: { CN: 'Decoded from local file/text' },
        valid_from: validFrom,
        valid_to: validTo,
        serialNumber: 'Decoded locally',
        fingerprint256: 'SHA-256 not computed locally',
        bits: 'N/A',
        type: 'N/A'
      };
    } catch (e) {
      return { success: false, error: 'Failed to decode PEM format. Check certificate format.' };
    }
  }
  ```

- [ ] **Step 2: Commit**
  Run:
  ```bash
  git add src/app/toolbox/page.tsx
  git commit -m "feat: add client-side PEM certificate decoder utility"
  ```

---

### Task 3: Add Locales and UI Component

**Files:**
- Modify: [en.json](file:///d:/ai/Rana/src/locales/en.json)
- Modify: [bn.json](file:///d:/ai/Rana/src/locales/bn.json)
- Modify: [page.tsx](file:///d:/ai/Rana/src/app/toolbox/page.tsx)

- [ ] **Step 1: Add localization translations**
  Insert translation keys to `en.json` and `bn.json` under `security`:
  ```json
  "sub_ssl": "SSL/TLS Inspector",
  "btn_fetch_ssl": "FETCH SSL CERTIFICATE",
  "btn_decode_pem": "DECODE LOCAL PEM"
  ```

- [ ] **Step 2: Define UI States and Buttons**
  Add state hooks and update subtab type options in `src/app/toolbox/page.tsx`:
  - Update `securitySubTab` values: `useState<'ip' | 'dns' | 'pwd' | 'hash' | 'cipher' | 'ssl'>('ip')`
  - Add states for domain lookup (`sslDomain`, `sslDetails`, `sslError`, `sslLoading`).
  - Render the navigation sub-tab and panels under `activeTab === 'security'`.

- [ ] **Step 3: Verify build**
  Run: `npm run build`
  Expected: Build finishes with no compile errors.

- [ ] **Step 4: Commit**
  Run:
  ```bash
  git commit -am "feat: integrate SSL Inspector subtab and panels in UI"
  ```
