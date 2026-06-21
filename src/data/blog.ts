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
    slug: 'active-directory-hardening-best-practices',
    title: '[SEC-ADV-26-03] Active Directory Hardening: CIS Benchmark Implementation',
    excerpt: 'Standard operating procedures for configuring Group Policy Objects to enforce credential protection and disable insecure protocols.',
    date: '2026-06-02',
    severity: 'HIGH',
    category: 'AD Hardening',
    content: 'Securing Active Directory is fundamental to enterprise networks. Implement the following GPO hardening policies:\n\n1. Disable LLMNR and NetBIOS to prevent local credential interception (responder attacks).\n2. Restrict NTLM authentication and enforce SMB Signing and SMB Encryption to prevent relay attacks.\n3. Enforce LSA protection and enable Credential Guard on supported Windows endpoints to secure LSASS memory.\n4. Separate administrative accounts using the tier administration model (Tier 0, Tier 1, Tier 2).'
  },
  {
    slug: 'deploying-sentinelone-enterprise-endpoints',
    title: '[SEC-RUN-26-02] Deploying SentinelOne Across Enterprise Nodes',
    excerpt: 'Configuration runbook for automating the installation and tuning of SentinelOne EDR agents in Windows Server domains.',
    date: '2026-05-18',
    severity: 'MEDIUM',
    category: 'EDR Deployment',
    content: 'Automating Endpoint Detection and Response (EDR) agent deployment ensures compliance across all corporate systems. This runbook details deploying SentinelOne agents via Group Policy Objects (GPOs) and RMM platforms:\n\n- Extract the S1 site token and configure the MSI installer flags.\n- Define active response configurations (Protect vs Detect modes).\n- Set up exclusion policies to prevent conflicts with legacy system utilities.'
  },
  {
    slug: 'rmm-patching-automation-best-practices',
    title: '[SYS-RUN-26-04] Automating Patch Management & Compliance Audits',
    excerpt: 'Automating patch cycles for third-party applications and OS hotfixes using RMM policy monitoring.',
    date: '2026-05-30',
    severity: 'MEDIUM',
    category: 'RMM Automation',
    content: 'Inconsistent patching is a primary vector for server exploit payloads. Establish proactive patch cycles:\n\n- Categorize servers into separate reboot cycles (Staging, Production Tier A, Production Tier B).\n- Automate third-party updates (Chrome, Adobe, Zoom) using RMM software management policies.\n- Write daily scripting checks to report devices with missing critical security hotfixes older than 14 days.\n- Integrate automatic rollback checks for failed patches.'
  },
  {
    slug: 'securing-network-perimeter-firewall-hardening',
    title: '[NET-ADV-26-05] Perimeter Firewall Hardening & Network Port Auditing',
    excerpt: 'Auditing and securing firewall access control rules to block common lateral movement vectors.',
    date: '2026-04-25',
    severity: 'LOW',
    category: 'Network Security',
    content: 'Minimizing external and internal port exposure reduces the opportunity for unauthorized network reconnaissance and pivoting:\n\n1. Enforce strict outbound firewall rules (deny all by default, explicitly allow required egress ports).\n2. Block SMB (Port 445), LDAP (Port 389/636), and RDP (Port 3389) across public-facing interfaces.\n3. Implement network segmentation to isolate operational zones from corporate client subnets.\n4. Deploy intrusion prevention signatures (IPS) to detect active vulnerability scanning probes.'
  }
];
