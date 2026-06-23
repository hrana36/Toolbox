import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolbox-ten-omega.vercel.app';
  
  const routes = [
    '',
    '/portfolio',
    '/blog',
    '/faq',
    '/about',
    '/toolbox',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route === '/toolbox' ? 0.9 : 0.7,
  }));
}
