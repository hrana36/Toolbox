export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'securing-m365-tenant-best-practices',
    title: '[SEC-ADV-26-01] Securing Microsoft 365 Tenant: Modern Best Practices',
    excerpt: 'Detailed threat analysis and configuration settings for harding M365 environments against phishing campaigns and token hijacking.',
    date: '2026-06-12',
    severity: 'HIGH',
    category: 'M365 Security',
    content: 'Microsoft 365 environments are primary targets for malicious actors. Securing them requires a multi-layered defense-in-depth approach:\n\n1. Enforce Phishing-Resistant MFA (using FIDO2 keys or Microsoft Authenticator number matching).\n2. Block legacy authentication protocols to eliminate password spray vulnerabilities.\n3. Configure strict Conditional Access Policies restricting login locations to corporate VPN boundaries.\n4. Enable auditing logs and configure real-time alert triggers for anomalous admin actions.'
  },
  {
    slug: 'deploying-sentinelone-enterprise-endpoints',
    title: '[SEC-RUN-26-02] Deploying SentinelOne Across Enterprise Nodes',
    excerpt: 'Configuration runbook for automating the installation and tuning of SentinelOne EDR agents in Windows Server domains.',
    date: '2026-05-18',
    severity: 'MEDIUM',
    category: 'EDR Deployment',
    content: 'Automating Endpoint Detection and Response (EDR) agent deployment ensures compliance across all corporate systems. This runbook details deploying SentinelOne agents via Group Policy Objects (GPOs) and RMM platforms:\n\n- Extract the S1 site token and configure the MSI installer flags.\n- Define active response configurations (Protect vs Detect modes).\n- Set up exclusion policies to prevent conflicts with legacy system utilities.'
  }
];