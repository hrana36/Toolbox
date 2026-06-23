import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Rana | Hire a Systems & Cloud Security Specialist',
  description: 'Get in touch with Rana to collaborate on Azure cloud provisioning, automated patch management setups, enterprise network security auditing, or server maintenance.',
  keywords: ['Contact Rana', 'Hire Systems Administrator', 'Hire Cloud Engineer', 'Hire IT Specialist', 'Rana contact'],
  openGraph: {
    title: 'Contact Rana | Hire a Systems & Cloud Security Specialist',
    description: 'Inquire about project availability, technical consultations, or systems operations hiring.',
    url: 'https://toolbox-ten-omega.vercel.app/contact',
    type: 'website',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Rana',
    'description': 'Secure connection portal to hire or consult with Systems Specialist Rana.',
    'url': 'https://toolbox-ten-omega.vercel.app/contact',
    'mainEntity': {
      '@type': 'ContactPoint',
      'contactType': 'professional support',
      'email': 'hrana36@gmail.com',
      'availableLanguage': ['English', 'Bengali']
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ContactClient />
    </>
  );
}
