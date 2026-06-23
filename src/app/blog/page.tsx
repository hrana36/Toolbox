import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog | Systems Operations & IT Security Insights',
  description: 'Explore tutorials, guides, and engineering articles about Azure administration, automated patch cycles, endpoint security, and backup strategies.',
  keywords: ['Systems Admin Blog', 'IT Security Insights', 'Azure Tutorials', 'Endpoint Management Guide', 'BCDR Strategies'],
  openGraph: {
    title: 'Blog | Systems Operations & IT Security Insights',
    description: 'Explore tutorials, guides, and engineering articles about Azure administration and endpoint security.',
    url: 'https://toolbox-ten-omega.vercel.app/blog',
    type: 'website',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': "Rana's Systems Operations Blog",
    'description': "Tech tutorials and analysis on cloud infrastructure management and cybersecurity operations.",
    'url': 'https://toolbox-ten-omega.vercel.app/blog'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogClient />
    </>
  );
}
