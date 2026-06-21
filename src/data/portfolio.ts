export const portfolioData = {
  hero: {
    name: 'Md Habibur Rahaman Rana',
    title: 'Systems Engineer | Cybersecurity & IT Infrastructure',
    valueStatement: 'Securing and maintaining enterprise IT environments across SentinelOne, Microsoft 365/Azure AD, and MSP platforms',
    cta: [
      { text: 'View Resume', link: '/resume.pdf' },
      { text: 'Contact Me', href: '#contact' }
    ]
  },
  about: {
    description: 'Highly experienced and certified IT professional specializing in System Administration, Cyber Security principles, and Infrastructure Management. Proven expertise in configuring, maintaining, and supporting Microsoft-centric environments (Windows Server, Active Directory, Office 365). Focused on endpoint security (AV/EDR), security awareness, system patching, and leveraging RMM/PSA tools for proactive support and compliance. Certified as a Microsoft 365 Certified: Endpoint Administrator Associate and Microsoft Certified: Azure Administrator Associate.',
    location: 'Dhaka, Bangladesh (working remotely for Sydney, Australia-based MSP)'
  },
  technicalSkills: {
    categories: [
      {
        title: 'Endpoint Security & EDR',
        skills: ['SentinelOne', 'Bitdefender', 'Datto AV', 'Datto EDR', 'Acronis Cyber Protect']
      },
      {
        title: 'Identity & Access Management',
        skills: ['Active Directory', 'Azure AD/Entra ID', 'Group Policy (GPO)']
      },
      {
        title: 'Cloud & Productivity',
        skills: ['Microsoft 365', 'Azure AD', 'Microsoft Endpoint Manager', 'Exchange']
      },
      {
        title: 'Email Security & Awareness',
        skills: ['Graphus', 'Barracuda Email Protection', 'BullPhish ID', 'Firewalls']
      },
      {
        title: 'MSP/RMM-PSA Platforms',
        skills: ['Datto RMM', 'Autotask PSA', 'Ninja RMM', 'ConnectWise Manage', 'IT Glue', '3CX']
      },
      {
        title: 'Infrastructure & Networking',
        skills: ['WAN/LAN', 'Routers', 'VPN', 'Terminal Services', 'Virtualization', 'Acronis Backup']
      }
    ]
  },
  experience: [
    {
      role: 'Support Engineer | IT Operations Specialist',
      company: 'Tech Ants Solutions Pty Ltd',
      location: 'North Sydney, NSW',
      period: 'Feb 2024 – Present',
      achievements: [
        'Managed complete incident lifecycle using Autotask PSA, ensuring SLA-compliant resolution',
        'Conducted scheduled monthly maintenance using Datto RMM for remote patching',
        'Maintained SentinelOne, Bitdefender, Datto AV, and Datto EDR for threat defense and compliance',
        'Administered phishing simulation and security awareness training (BullPhish ID)',
        'Supported Windows Server/Active Directory health and managed support queues via 3CX',
        'Maintained infrastructure documentation via IT Glue, communicated status to stakeholders'
      ]
    },
    {
      role: 'Support Engineer | Systems & Operations Support',
      company: 'COBAIT',
      location: 'Houston, Texas',
      period: 'Oct 2022 – Jan 2024',
      achievements: [
        'Managed technical incident lifecycle within ConnectWise Manage, coordinating escalations',
        'Used Ninja RMM for proactive endpoint monitoring and Acronis Backup for data integrity',
        'Administered GPOs to enforce domain-wide security standards',
        'Conducted/documented monthly workstation and server maintenance',
        'Supported Microsoft 365 (Exchange, Entra ID/Azure AD) — access control and licensing',
        'Assisted with VPN, Terminal Services, and core Microsoft business applications'
      ]
    },
    {
      role: 'Associate, IT Support',
      company: 'Quantanite',
      location: 'Mirpur, Dhaka',
      period: 'Jan 2021 – Sep 2022',
      achievements: [
        'Primary point of contact for L1/L2 hardware, software, and networking support',
        'Administered user accounts, permissions, and passwords in Active Directory',
        'Configured network devices (access points, switches) and managed IT asset inventory'
      ]
    }
  ],
  projects: [
    {
      slug: 'secure-network-segmentation',
      title: 'Secure Network Segmentation & Firewall Lab',
      category: 'Network',
      description: 'Design a segmented network with a firewall and validate access.',
      tech: ['pfSense', 'OPNsense', 'VLANs', 'Firewall Rules', 'Network Segmentation'],
      link: '#'
    },
    {
      slug: 'server-hardening',
      title: 'Server Hardening & Baseline Configuration',
      category: 'Endpoint',
      description: 'Apply CIS benchmarks to secure Windows or Linux systems and verify reduced vulnerabilities.',
      tech: ['CIS Benchmarks', 'Group Policy (GPO)', 'Linux Hardening', 'Vulnerability Auditing'],
      link: '#'
    },
    {
      slug: 'endpoint-monitoring',
      title: 'Endpoint Monitoring & EDR Deployment',
      category: 'Endpoint',
      description: 'Deploy an open-source EDR solution and detect suspicious endpoint behavior.',
      tech: ['Wazuh', 'EDR', 'Endpoint Security', 'Sysmon', 'Threat Detection'],
      link: '#'
    },
    {
      slug: 'automated-patching',
      title: 'Automated Patching & Configuration Management',
      category: 'Endpoint',
      description: 'Automate OS patching and security configuration enforcement across systems.',
      tech: ['Ansible', 'Datto RMM', 'Ninja RMM', 'PowerShell', 'Patch Management'],
      link: '#'
    },
    {
      slug: 'cloud-hardening',
      title: 'Cloud Environment Hardening & Monitoring',
      category: 'Cloud',
      description: 'Build and monitor a secure AWS or Azure environment using native security services.',
      tech: ['AWS Security Hub', 'Azure Entra ID', 'IAM Hardening', 'CloudTrail', 'GuardDuty'],
      link: '#'
    },
    {
      slug: 'vulnerability-scanning',
      title: 'Vulnerability Scanning & Remediation Pipeline',
      category: 'SecOps',
      description: 'Scan systems for vulnerabilities, remediate findings, and validate fixes through rescanning.',
      tech: ['Nessus', 'OpenVAS', 'Vulnerability Assessment', 'Remediation tracking'],
      link: '#'
    },
    {
      slug: 'network-ids-ips',
      title: 'Network IDS/IPS Deployment & Tuning',
      category: 'Network',
      description: 'Deploy and tune IDS rules to detect attacks while minimizing false positives.',
      tech: ['Snort', 'Suricata', 'IDS/IPS', 'Rule Tuning', 'Packet Analysis'],
      link: '#'
    },
    {
      slug: 'siem-implementation',
      title: 'SIEM Implementation & Log Management',
      category: 'SecOps',
      description: 'Centralize logs and configure security alerts using a SIEM platform.',
      tech: ['ELK Stack', 'Wazuh SIEM', 'Syslog', 'Log Parsing', 'Security Alerting'],
      link: '#'
    },
    {
      slug: 'container-security',
      title: 'Container Security: Image Scanning & Hardening',
      category: 'Cloud',
      description: 'Scan and harden Docker images to reduce container vulnerabilities.',
      tech: ['Docker', 'Trivy', 'Image Hardening', 'Container Security', 'CI/CD security'],
      link: '#'
    },
    {
      slug: 'active-directory-security',
      title: 'Active Directory Security Lab',
      category: 'Endpoint',
      description: 'Deploy and secure an AD domain using Group Policy and auditing best practices.',
      tech: ['Active Directory', 'GPO Hardening', 'LDAP Security', 'Auditing Policy', 'Kerberos Hardening'],
      link: '#'
    }
  ],
  educationAndCertifications: {
    certifications: [
      {
        name: 'Microsoft Certified: Azure Administrator Associate (AZ-104) [Active]',
        date: 'June 2024'
      },
      {
        name: 'Microsoft 365 Certified: Endpoint Administrator Associate (MD-102) [Previous]',
        date: 'May 8, 2024'
      },
      {
        name: 'Coursera: Microsoft Cybersecurity Analyst Specialization',
        date: '2024'
      },
      {
        name: 'Coursera: Google IT Support Specialization',
        date: '2021'
      },
      {
        name: 'Coursera: Python 3 Programming Specialization',
        date: '2020'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science (Hons)',
        institution: 'Al Madinah International University, Kuala Lumpur, Malaysia',
        year: '2020',
        cgpa: '3.57'
      },
      {
        degree: 'Higher Secondary School Certificate',
        institution: 'St. Joseph Higher Secondary School, Mohammadpur, Dhaka',
        year: '2014',
        gpa: '4.90'
      },
      {
        degree: 'Secondary School Certificate',
        institution: 'Mirpur Bangla High School, Mirpur, Dhaka',
        year: '2012',
        gpa: '5.00'
      }
    ]
  },
  contact: {
    email: 'hrana36@gmail.com',
    phone: '+8801621892727',
    linkedin: 'https://www.linkedin.com/in/hrana36/',
    github: 'https://github.com/hrana36'
  }
};