# Real Browser Security Gauge Design Spec

**Goal:** Replace the hardcoded compliance & security gauge with a real browser-based security posture checker. It runs client-side diagnostics to measure security/privacy features and generates a dynamic security score and checklist.

## Security Checks & Scoring Weights

We evaluate the visitor's browser security posture using 7 checks, totaling up to 100%:

1. **HTTPS Connection** (20%): Evaluated via `location.protocol === 'https:'`.
2. **Secure Context** (20%): Evaluated via `window.isSecureContext`.
3. **Cookies Enabled** (10%): Evaluated via `navigator.cookieEnabled`.
4. **Do Not Track** (15%): Evaluated via `navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1'`.
5. **Ad Blocker Detected** (15%): Probe test by fetching `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`. If the request fails (and the browser is online), we assume an ad blocker is blocking ads/trackers (which enhances security/privacy).
6. **WebRTC Leak Risk** (10%): Check if `RTCPeerConnection` exists. If not, the visitor is protected against WebRTC IP leaks (+10%). If it exists, there is a potential leak risk (+0%).
7. **Screen Lock (WebAuthn)** (10%): Evaluated via existence of `navigator.credentials`.

## User Interface & Feedback

- **Dynamic Circular Gauge**:
  - Animates the SVG circular path from 0% to the calculated score.
  - Changes status text (e.g., "Optimal", "Warning", "Vulnerable") and color (Emerald, Amber, Rose) dynamically based on the score threshold.
- **Detailed Checklist**:
  - Replaces static metadata list with a list of the 7 browser checks.
  - Renders a clean status badge for each check (e.g., `SECURE` in green, `RISK FOUND` in yellow, `ACTIVE` in emerald, etc.).
