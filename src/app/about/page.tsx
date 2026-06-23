import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Rana | Certifications & Systems Administration Experience',
  description: "Learn more about Rana's professional experience, active Microsoft credentials (AZ-104 & MD-102), cloud deployments, and endpoint management expertise.",
  keywords: ['About Rana', 'AZ-104 Certified', 'MD-102 Certified', 'Systems Administrator Experience', 'Acronis Backups', 'Endpoint Protection'],
  openGraph: {
    title: 'About Rana | Certifications & Systems Administration Experience',
    description: "Detailed dossier of Rana's enterprise experience, cloud engineering credentials, and system administration skills.",
    url: 'https://toolbox-ten-omega.vercel.app/about',
    type: 'profile',
    images: [{ url: 'https://toolbox-ten-omega.vercel.app/az-104.png' }],
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About Rana',
    'description': "Technical dossier and experience history of Systems Operations & Cloud Security Specialist Rana.",
    'url': 'https://toolbox-ten-omega.vercel.app/about',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Rana',
      'jobTitle': 'Systems Operations Specialist',
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
          'credentialCategory': 'Certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'Microsoft 365 Certified: Endpoint Administrator Associate (MD-102)',
          'credentialCategory': 'Certification'
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutClient />
    </>
  );
}
