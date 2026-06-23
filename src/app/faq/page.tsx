import type { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ - Systems Operations & Security Inquiries | Rana',
  description: 'Frequently asked questions regarding client-side data privacy, PDF utilities security, automated patch management cycles, and enterprise backup verification.',
  keywords: ['Systems Administrator FAQ', 'PDF Tool Privacy', 'Client-Side Processing Security', 'Patch Management Cycles', 'Acronis Backups Info'],
  openGraph: {
    title: 'FAQ - Systems Operations & Security Inquiries | Rana',
    description: 'Frequently asked questions regarding client-side data privacy, PDF utilities, and automated patch management.',
    url: 'https://toolbox-ten-omega.vercel.app/faq',
    type: 'website',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Are my documents secure when using the PDF Utilities or ATS Resume Checker?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'According to our system architecture specifications, 100% of document processing runs entirely client-side inside your browser. No files are uploaded to any server. Your sensitive resume details and PDF pages never leave your local device, ensuring maximum security and compliance.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What certifications does Rana hold for cloud infrastructure management?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Rana holds professional Microsoft credentials, including the Azure Administrator Associate (AZ-104) and Microsoft 365 Endpoint Administrator Associate (MD-102) certifications, demonstrating verified proficiency in cloud security administration and enterprise device compliance.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How is automated patch management deployed for remote endpoints?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Workstation patches are scheduled and automated using policies that monitor patch status. Statistics indicate that automated patch deployments reduce security vulnerabilities by 90% within the first 48 hours of update releases.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FaqClient />
    </>
  );
}
