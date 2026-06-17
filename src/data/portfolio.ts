export const portfolioData = {
  hero: {
    name: 'Md Habibur Rahaman Rana',
    title: 'Systems Engineer | Cybersecurity & IT Infrastructure',
    valueStatement: 'Securing and maintaining enterprise IT environments across SentinelOne, Microsoft 365/Azure AD, and MSP platforms',
    cta: [
      { text: 'View Resume', link: '/resume.pdf' }, // Assuming we have a resume PDF
      { text: 'Contact Me', href: '#contact' }
    ]
  },
  about: {
    description: 'Highly experienced and certified IT professional specializing in System Administration, Cyber Security principles, and Infrastructure Management. Proven expertise in configuring, maintaining, and supporting Microsoft-centric environments (Windows Server, Active Directory, Office 365). Focused on endpoint security (AV/EDR), security awareness, system patching, and leveraging RMM/PSA tools for proactive support and compliance. Certified as a Microsoft 365 Certified: Endpoint Administrator Associate.',
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
      title: 'BD Toolbox',
      description: 'Architected and built a bilingual (EN/Bangla) multi-tool utility platform with 20+ client-side tools (Next.js, TypeScript, client-side processing for privacy/security)',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
      link: '#' // In a real app, this would be a link to the project
    },
    {
      title: 'Royal Health Insight',
      description: 'Built and maintain a Bengali-language health information website, including technical SEO setup and structured data implementation',
      tech: ['WordPress', 'SEO', 'Bengali Content'],
      link: '#'
    },
    {
      title: 'Color the Canvas',
      description: 'Manage end-to-end content production pipeline for a YouTube Shorts channel, including branding and cross-platform distribution workflow',
      tech: ['YouTube', 'Video Editing', 'Branding'],
      link: '#'
    }
  ],
  educationAndCertifications: {
    certifications: [
      {
        name: 'Microsoft 365 Certified: Endpoint Administrator Associate',
        date: 'May 8, 2024'
      },
      {
        name: 'Google IT Support',
        date: 'Jan 5, 2021'
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
  }
};