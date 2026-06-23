import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Rana - Systems Operations & Cloud Security Specialist',
  description: 'Professional portfolio of Rana, a specialist in systems administration, cloud security engineering, MD-102 and AZ-104 endpoint compliance, and proactive monitoring.',
  keywords: ['Rana portfolio', 'Systems Operations', 'Cloud Security Specialist', 'AZ-104', 'MD-102', 'IT Support Specialist', 'SecOps Engineer'],
  openGraph: {
    title: 'Rana - Systems Operations & Cloud Security Specialist',
    description: 'Professional systems administration and cloud security portfolio. Check out my interactive terminal console and system verification badge dossiers.',
    url: 'https://toolbox-ten-omega.vercel.app',
    type: 'website',
    images: [{ url: 'https://toolbox-ten-omega.vercel.app/md-102.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rana - Systems Operations & Cloud Security Specialist',
    description: 'Systems administration and cloud security engineering portfolio.',
    images: ['https://toolbox-ten-omega.vercel.app/md-102.png'],
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Rana',
    'url': 'https://toolbox-ten-omega.vercel.app',
    'jobTitle': 'Systems Operations & Cloud Security Specialist',
    'knowsAbout': [
      'Systems Administration',
      'Cloud Security Engineering',
      'Endpoint Compliance Auditing',
      'Microsoft Azure Administration',
      'Workstation Maintenance',
      'Server Maintenance',
      'Patch Management'
    ],
    'sameAs': [
      'https://github.com/hrana36',
      'https://linkedin.com/in/hrana36'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeClient />
    </>
  );
}
