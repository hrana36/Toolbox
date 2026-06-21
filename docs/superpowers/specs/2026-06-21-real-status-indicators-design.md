# Real Status Indicators Design Spec

**Goal:** Convert the home page status grid cards (Server Latency, Active Shields, VPN Route, and Status) into real-time dynamic checkers.

## Diagnostics Logic

Inside `src/app/page.tsx`, we will run the following diagnostics:

1. **Server Latency**:
   - A `setInterval` runs every 5 seconds.
   - Executes: `fetch('/?ping=' + Date.now(), { method: 'HEAD', cache: 'no-store' })`.
   - Latency is calculated as `Math.round(endTime - startTime)`.
   - If the request fails (e.g., offline), latency displays `0ms`.
2. **Status**:
   - Uses `navigator.onLine` and responds to `window` online/offline events.
   - Renders green `ONLINE` or red `OFFLINE`.
3. **VPN Route**:
   - Checks `location.protocol === 'https:'`.
   - Displays `Encrypted` if HTTPS, or `Plaintext` if HTTP.
4. **Active Shields**:
   - Tied to connectivity and secure contexts.
   - Renders `Nominal` if online, or `Offline` if offline.

## Translation Updates

- Ensure proper Bengali/English translations exist for all states:
  - `home.status_online`: "ONLINE" / "অনলাইন"
  - `home.status_offline`: "OFFLINE" / "অফলাইন"
  - `home.status_nominal`: "Nominal" / "স্বাভাবিক"
  - `home.status_offline_shields`: "Offline" / "অফলাইন"
  - `home.status_encrypted`: "Encrypted" / "এনক্রিপ্টেড"
  - `home.status_plaintext`: "Plaintext" / "প্লেইনটেক্সট"
