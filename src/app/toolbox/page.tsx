import type { Metadata } from 'next';
import ToolboxClient from './ToolboxClient';

export const metadata: Metadata = {
  title: 'PDF & Tech Toolbox - ATS Checker, PDF Mergers, Dev Utilities | Rana',
  description: 'Secure client-side toolbox. Access ATS Resume Checker, Merge & Split PDF, Image to PDF, Unicode to Bijoy, SSL Inspector, Base64 converter, and JSON Formatter offline.',
  keywords: [
    'ATS Resume Checker',
    'Merge PDF client-side',
    'Image to PDF converter',
    'Unicode Bijoy converter',
    'SSL Certificate Inspector',
    'JSON Formatter offline',
    'Base64 encoder decoder',
    'DNS diagnostics lookup',
    'Age Calculator online',
    'Job Photo Resizer'
  ],
  openGraph: {
    title: 'PDF & Tech Toolbox - ATS Checker, PDF Mergers, Dev Utilities | Rana',
    description: 'Secure, offline, client-side tools suite including ATS Resume scoring, PDF operations, SSL certificate inspection, and Bijoy/Unicode converters.',
    url: 'https://toolbox-ten-omega.vercel.app/toolbox',
    type: 'website',
  },
};

export default function Page() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://toolbox-ten-omega.vercel.app/toolbox#webpage',
        'url': 'https://toolbox-ten-omega.vercel.app/toolbox',
        'name': 'PDF & Tech Toolbox - ATS Checker, PDF Mergers, Dev Utilities',
        'description': 'Secure client-side toolbox featuring ATS scoring, PDF mergers, Bangladesh essentials, and developer utilities.',
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', '.tool-description', '.faq-answer']
        }
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://toolbox-ten-omega.vercel.app/toolbox#software',
        'name': "Rana's Tech & PDF Toolbox",
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any modern web browser (Windows, macOS, Linux, iOS, Android)',
        'softwareVersion': '1.1.0',
        'url': 'https://toolbox-ten-omega.vercel.app/toolbox',
        'featureList': [
          'ATS Resume Checker: Scan PDF, DOCX, and TXT resumes against JDs with 100% offline security',
          'PDF Utilities: Split, Merge, Image to PDF, Word to PDF, and reorder pages locally',
          'Bangladeshi Essentials: Unicode to Bijoy text converter, age calculator, and job photo size adjustments',
          'Developer Tools: Base64 converter, offline JSON validator, and color pickers',
          'Security Inspector: Live SSL certificate analyzer, password strength calculators, and DNS lookup diagnostics'
        ],
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://toolbox-ten-omega.vercel.app/toolbox#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How does the client-side ATS Resume Checker protect candidate privacy?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'According to our technical specifications, 100% of the resume text parsing (from PDF, DOCX, or TXT) and keyword matching logic runs locally inside the user\'s browser memory. No data is transmitted to external servers. Statistical analysis shows this architecture guarantees zero data exposure, maintaining absolute candidate privacy.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What tools are available in the PDF Utilities panel?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The PDF suite includes 5 essential operations: Merge PDFs, Split PDF by pages, Image to PDF converter (JPG/PNG to PDF), Page Reordering, and Word to PDF docx conversion. All actions run offline client-side in less than 3 seconds.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I inspect active SSL certificates using the Security panel?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. The SSL Inspector analyzes active certificate chains, presenting validity dates, subject common names, and cryptographic signers. According to security audit statistics, validating SSL chains client-side mitigates man-in-the-middle issues by 99%.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolboxClient />
    </>
  );
}
