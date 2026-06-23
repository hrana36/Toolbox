import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: "Portfolio | Active Lab Configurations & Systems Demos",
  description: "Browse Rana's portfolio featuring interactive SecOps console commands, live network deployments, endpoint security structures, and Microsoft credentials.",
  keywords: ['Rana portfolio', 'IT Ops Projects', 'Azure Lab Configurations', 'Interactive terminal console', 'SecOps Demos'],
  openGraph: {
    title: 'Portfolio | Active Lab Configurations & Systems Demos',
    description: "Browse Rana's portfolio featuring interactive SecOps console commands and network deployments.",
    url: 'https://toolbox-ten-omega.vercel.app/portfolio',
    type: 'website',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': "Rana's Systems Operations Portfolio",
    'description': "A collection of interactive console queries, system credentials, and active cloud engineering project documentation.",
    'url': 'https://toolbox-ten-omega.vercel.app/portfolio'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PortfolioClient />
    </>
  );
}
