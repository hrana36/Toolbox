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

  return new Promise<Response>((resolve) => {
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
            bits: (cert.pubkey as any)?.bits || 'N/A',
            type: (cert.pubkey as any)?.type || 'N/A'
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
