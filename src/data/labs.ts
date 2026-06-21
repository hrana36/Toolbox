export interface LabStep {
  title: string;
  description: string;
  commands?: string[];
  codeSnippet?: string;
  codeLang?: string;
}

export interface LabProject {
  slug: string;
  title: string;
  category: 'Network' | 'Endpoint' | 'Cloud' | 'SecOps';
  description: string;
  tech: string[];
  objectives: string[];
  topology: string;
  steps: LabStep[];
  verification: string[];
}

export const labsData: Record<string, LabProject> = {
  'secure-network-segmentation': {
    slug: 'secure-network-segmentation',
    title: 'Secure Network Segmentation & Firewall Lab',
    category: 'Network',
    description: 'Design a segmented network with a firewall and validate access using pfSense/OPNsense.',
    tech: ['pfSense', 'OPNsense', 'VLANs', 'Firewall Rules', 'Network Segmentation'],
    objectives: [
      'Segment the corporate local area network into three distinct virtual local area networks (VLANs).',
      'Deploy and configure a pfSense firewall router instance at the edge boundary.',
      'Establish strict security group firewall rules to block unauthorized cross-VLAN traffic.',
      'Allow internet transit route paths via outbound NAT mapping policies.'
    ],
    topology: `
[ WAN / Internet ]
       |
       v
+--------------+
| pfSense Edge |
|  Firewall    |
+-------+------+
        |
        +-------- [ VLAN 10 ] (Management Network) -- Range: 10.10.10.0/24
        |
        +-------- [ VLAN 20 ] (Production Servers) -- Range: 10.10.20.0/24
        |
        +-------- [ VLAN 30 ] (IoT Devices LAN)    -- Range: 10.10.30.0/24
`,
    steps: [
      {
        title: 'VLAN and Interface Assignment',
        description: 'Create the virtual interfaces on the pfSense appliance corresponding to VLAN IDs 10, 20, and 30.',
        commands: [
          '# Example of creating parent VLAN interfaces via CLI console prompt:',
          'vconfig add eth1 10',
          'vconfig add eth1 20',
          'vconfig add eth1 30'
        ],
        codeSnippet: `// Interface Map Configuration Example (pfSense structure)
<interfaces>
  <lan>
    <enable/>
    <if>vlan10</if>
    <ipaddr>10.10.10.1</ipaddr>
    <subnet>24</subnet>
  </lan>
  <opt1>
    <descr>PROD_VLAN20</descr>
    <enable/>
    <if>vlan20</if>
    <ipaddr>10.10.20.1</ipaddr>
    <subnet>24</subnet>
  </opt1>
  <opt2>
    <descr>IOT_VLAN30</descr>
    <enable/>
    <if>vlan30</if>
    <ipaddr>10.10.30.1</ipaddr>
    <subnet>24</subnet>
  </opt2>
</interfaces>`,
        codeLang: 'xml'
      },
      {
        title: 'Define Firewall Rules & Inter-VLAN Isolation Block',
        description: 'Configure active firewall rules to restrict the IoT subnet (VLAN 30) from accessing the internal production or management networks.',
        codeSnippet: `# pfSense Rule Settings:
# 1. Action: Block | Protocol: Any | Source: IOT_VLAN30 net | Port: * | Destination: Management_VLAN10 net
# 2. Action: Block | Protocol: Any | Source: IOT_VLAN30 net | Port: * | Destination: PROD_VLAN20 net
# 3. Action: Pass  | Protocol: Any | Source: IOT_VLAN30 net | Port: * | Destination: * (Allows Internet)`,
        codeLang: 'text'
      },
      {
        title: 'Configure Outbound NAT for Internet Access',
        description: 'Map internal private subnets to WAN interface public IP using translation rules.',
        codeSnippet: `# NAT Rule Mapping:
# Interface: WAN | Source: 10.10.0.0/16 | Port: * | Destination: * | NAT Address: WAN Address`,
        codeLang: 'text'
      }
    ],
    verification: [
      'Verify that a client on Management (VLAN 10) can ping the WAN internet gateway successfully.',
      'Ensure a server on Production (VLAN 20) can communicate with database containers but cannot ping Management node IPs.',
      'Check that IoT devices (VLAN 30) are successfully blocked when requesting connections to 10.10.10.0/24 hosts.',
      'Validate NAT tables show appropriate state mappings when internal clients trigger external outbound requests.'
    ]
  },
  'network-ids-ips': {
    slug: 'network-ids-ips',
    title: 'Network IDS/IPS Deployment & Tuning',
    category: 'Network',
    description: 'Deploy Suricata or Snort on gateway node and configure packet inspection rules.',
    tech: ['Snort', 'Suricata', 'IDS/IPS', 'Rule Tuning', 'Packet Analysis'],
    objectives: [
      'Install and configure Suricata as an active Network Intrusion Detection System (NIDS).',
      'Configure interface packet mirroring via SPAN or virtual switches to monitor live traffic.',
      'Draft custom Suricata alert rules to catch reconnaissance scans and command execution attempts.',
      'Apply threshold controls to suppress false positive alert alarms.'
    ],
    topology: `
             [ WAN / Internet ]
                     |
                     v
             +---------------+
             |  Main Gateway | (Configured with SPAN / Mirroring)
             +-------+-------+
                     |
         +-----------+-----------+
         |                       |
live network node        +-------v-------+
                         | Suricata NIDS | (Passive Promiscuous Mode)
                         +---------------+
`,
    steps: [
      {
        title: 'Install Suricata & Configure Interfaces',
        description: 'Install Suricata on the monitoring server and assign the passive monitor interface.',
        commands: [
          'sudo apt update && sudo apt install -y suricata',
          '# Set promiscuous mode active on raw interface:',
          'sudo ip link set eth1 promisc on'
        ],
        codeSnippet: `# /etc/suricata/suricata.yaml snippet
af-packet:
  - interface: eth1
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
    use-mmap: yes`,
        codeLang: 'yaml'
      },
      {
        title: 'Write Custom Threat Detection Rules',
        description: 'Define alerts for common malicious reconnaissance actions (such as Nmap TCP port scans or Web vulnerability scans).',
        codeSnippet: `# Custom detection rules (/var/lib/suricata/rules/local.rules)
alert tcp any any -> $HOME_NET 80 (msg:"RECONNAISSANCE - SQL Injection Attack attempt"; flow:to_server,established; content:"UNION"; nocase; content:"SELECT"; nocase; sid:1000001; rev:1;)
alert tcp any any -> $HOME_NET any (msg:"RECONNAISSANCE - TCP Port Scan Probe"; flags:S; threshold:type threshold, track by_src, count 20, seconds 10; sid:1000002; rev:1;)`,
        codeLang: 'text'
      },
      {
        title: 'Tune False Positives with Threshold Rules',
        description: 'Tuning ensures system security without flooding alerts. Configure threshold filters to suppress alerts on heavy traffic paths.',
        codeSnippet: `# Rule thresholding configuration (/etc/suricata/threshold.config)
# Suppress rule 1000002 for benign network discovery utility IP
suppress gen_id 1, sig_id 1000002, track by_src, ip 10.10.10.25`,
        codeLang: 'text'
      }
    ],
    verification: [
      'Run an external nmap TCP scan toward internal target nodes and ensure alert logs register scan warnings.',
      'Inspect /var/log/suricata/fast.log for alert triggers.',
      'Test SQL injection web payloads to target addresses and verify local.rules triggers alert ID 1000001.',
      'Confirm threshold rule is active and suppresses alerts from authorized monitoring scan engines.'
    ]
  },
  'server-hardening': {
    slug: 'server-hardening',
    title: 'Server Hardening & Baseline Configuration',
    category: 'Endpoint',
    description: 'Apply CIS benchmarks to secure Windows or Linux systems and verify reduced vulnerabilities.',
    tech: ['CIS Benchmarks', 'Group Policy (GPO)', 'Linux Hardening', 'Vulnerability Auditing'],
    objectives: [
      'Configure system configurations to match Center for Internet Security (CIS) Level 1 controls.',
      'Deactivate vulnerable network protocols including SMBv1, LLMNR, NetBIOS, and insecure TLS versions.',
      'Implement auditing policies to track system changes and privilege elevations.',
      'Scan system configurations with automated auditing scripts to report on compliance.'
    ],
    topology: `
  +------------------+
  |  Target Host     | <--- Ansible Controller (Pushes compliance baselines)
  | (Windows/Linux)  |
  +--------+---------+
           |
           +---> Local Security Auditing Logs (/var/log/audit/ or Event Viewer)
`,
    steps: [
      {
        title: 'Deactivate Insecure Legacy Protocols',
        description: 'Disable SMBv1 and legacy local network discovery services like LLMNR to prevent credential spoofing attacks.',
        commands: [
          '# Disable LLMNR via PowerShell CLI for Windows Node:',
          'New-ItemProperty -Path "HKLM:\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "EnableMulticast" -Value 0 -PropertyType DWORD -Force'
        ],
        codeSnippet: `# Ansible task snippet to disable SMBv1 service on Linux systems:
- name: Ensure SMBv1 is disabled in samba configuration
  ini_file:
    path: /etc/samba/smb.conf
    section: global
    option: server min protocol
    value: SMB2
  notify: restart samba`,
        codeLang: 'yaml'
      },
      {
        title: 'Apply Auditing Policies',
        description: 'Configure audit settings to track logins, modifications to files, and command usage by root/administrators.',
        commands: [
          '# Linux audit rule to monitor changes to system login configs:',
          'echo "-w /etc/passwd -p wa -k passwd_changes" | sudo tee -a /etc/audit/rules.d/audit.rules',
          'sudo systemctl restart auditd'
        ]
      }
    ],
    verification: [
      'Ensure running security assessment scanners reports SMBv1 and LLMNR protocols as inactive.',
      'Attempt to read or write to protected configuration files and verify audit.log generates compliance track logs.',
      'Confirm TLS 1.0 and 1.1 handshake connections are actively dropped by web servers.'
    ]
  },
  'endpoint-monitoring': {
    slug: 'endpoint-monitoring',
    title: 'Endpoint Monitoring & EDR Deployment',
    category: 'Endpoint',
    description: 'Deploy an open-source EDR (Wazuh) solution and detect suspicious endpoint behavior.',
    tech: ['Wazuh', 'EDR', 'Endpoint Security', 'Sysmon', 'Threat Detection'],
    objectives: [
      'Deploy a centralized Wazuh Manager interface console.',
      'Install Sysmon and filebeat logging agents onto client servers.',
      'Write custom rules to capture suspicious child processes (e.g. cmd.exe launched from Office programs).',
      'Integrate alerts with active threat intelligence database sources.'
    ],
    topology: `
+------------------+     +------------------+
|  Windows Endpoint|     |  Linux Node      |
|  (Wazuh + Sysmon)|     |  (Wazuh Agent)   |
+--------+---------+     +--------+---------+
         |                        |
         v                        v
    [ Log Stream via Encrypted TLS Channel ]
                        |
                        v
              +------------------+
              |   Wazuh Manager  | ---> Alerting & Threat Dashboard
              +------------------+
`,
    steps: [
      {
        title: 'Install Sysmon on Target Windows Hosts',
        description: 'Download and install Microsoft Sysmon utilizing a secure configuration template.',
        commands: [
          '# Fetch baseline configuration and launch installer:',
          'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml" -OutFile "sysmonconfig.xml"',
          '.\\sysmon.exe -accepteula -i sysmonconfig.xml'
        ]
      },
      {
        title: 'Configure Customized Threat Alerts on Wazuh Manager',
        description: 'Implement detection rules on the Wazuh Manager engine to alert security analysts of command execution attempts by web server applications.',
        codeSnippet: `<!-- /var/ossec/etc/rules/local_rules.xml -->
<group name="web,appsec,">
  <rule id="100050" level="12">
    <if_sid>18100</if_sid>
    <field name="sysmon.image">\\\\cmd.exe|\\\\powershell.exe</field>
    <field name="sysmon.parentImage">\\\\w3wp.exe|\\\\tomcat.exe|\\\\nginx.exe</field>
    <description>Suspicious Shell Execution from Web Server Application Pool</description>
    <mitre>
      <id>T1059</id>
    </mitre>
  </rule>
</group>`,
        codeLang: 'xml'
      }
    ],
    verification: [
      'Verify that endpoint connection states register as active inside the Wazuh Agent Console.',
      'Trigger web execution testing payloads and confirm rule ID 100050 triggers high severity logs.',
      'Ensure Sysmon events are accurately parsed by the Wazuh log analysis daemon.'
    ]
  },
  'automated-patching': {
    slug: 'automated-patching',
    title: 'Automated Patching & Configuration Management',
    category: 'Endpoint',
    description: 'Automate OS patching and security configuration enforcement across systems.',
    tech: ['Ansible', 'Datto RMM', 'Ninja RMM', 'PowerShell', 'Patch Management'],
    objectives: [
      'Build automated scripting configurations utilizing PowerShell and Ansible core playbooks.',
      'Deploy scheduled remote patch cycles using RMM networks.',
      'Integrate validation scanning to audit endpoints update compliance.',
      'Establish rollback rollbooks to recover nodes during failed patch applications.'
    ],
    topology: `
  +-------------+
  | RMM Console |
  +------+------+
         |
         +---> [ Remote Exec Agent ] ---> Server Node A (Applies Updates)
         |
         +---> [ Remote Exec Agent ] ---> Client Workstation B (Applies Updates)
`,
    steps: [
      {
        title: 'Create PowerShell Patch Inspection Script',
        description: 'Develop utility script components that query the Windows Update Agent API to locate missing security KBs.',
        codeSnippet: `# PowerShell Script to query missing updates
$UpdateSession = New-Object -ComObject Microsoft.Update.Session
$UpdateSearcher = $UpdateSession.CreateUpdateSearcher()
$SearchResult = $UpdateSearcher.Search("IsInstalled=0 and Type='Software' and IsHidden=0")
$SearchResult.Updates | Select-Object Title, KBArticleIDs, Severity`,
        codeLang: 'powershell'
      },
      {
        title: 'Create Ansible Enforcement Playbook',
        description: 'Draft baseline playbooks targeting Linux infrastructure to auto-apply security updates and reload critical dependencies.',
        codeSnippet: `# playbooks/update_system.yaml
- name: Apply security upgrades to Debian systems
  hosts: all
  become: yes
  tasks:
    - name: Run apt-get update and upgrade security packages
      apt:
        upgrade: dist
        update_cache: yes
        only_upgrade: yes
      register: upgrade_result
    - name: Reboot if required
      reboot:
        msg: "Reboot initiated by Ansible patch orchestration"
      when: upgrade_result.changed`,
        codeLang: 'yaml'
      }
    ],
    verification: [
      'Ensure the RMM monitoring dashboard shows target systems are fully compliant.',
      'Run the audit script to verify that Zero-Day critical vulnerability updates have been deployed.',
      'Confirm system state recovery logs run cleanly upon initiating rollback triggers.'
    ]
  },
  'active-directory-security': {
    slug: 'active-directory-security',
    title: 'Active Directory Security Lab',
    category: 'Endpoint',
    description: 'Deploy and secure an AD domain using Group Policy and auditing best practices.',
    tech: ['Active Directory', 'GPO Hardening', 'LDAP Security', 'Auditing Policy', 'Kerberos Hardening'],
    objectives: [
      'Implement domain security templates to lock down access privileges.',
      'Configure LAPS (Local Administrator Password Solution) for domain endpoints.',
      'Enforce LDAP channel binding and LDAPS certificate authentication.',
      'Harden Kerberos parameters to guard against ticket attacks.'
    ],
    topology: `
+--------------------+
|  Domain Controller | <=== Kerberos Request Channel (Hardened)
|   (LDAP Over SSL)  |
+--------+-----------+
         |
         +---> Client Node Workstation (Applies Group Policies via Active LAPS)
`,
    steps: [
      {
        title: 'Harden Kerberos Ticket Lifetime Settings',
        description: 'Limit ticket grant times to minimize potential windows for Kerberos spoofing or golden-ticket replay attacks.',
        codeSnippet: `# Group Policy Settings path:
# Computer Configuration\\Windows Settings\\Security Settings\\Account Policies\\Kerberos Policy
# Maximum lifetime for user ticket: 10 Hours
# Maximum lifetime for user ticket renewal: 7 Days`,
        codeLang: 'text'
      },
      {
        title: 'Deploy Microsoft LAPS Template Policies',
        description: 'Enable automated local administrator credentials rotation across all joined domain devices.',
        commands: [
          '# Import LAPS Active Directory PowerShell module tools:',
          'Import-Module Laps',
          'Update-LapsADSchema',
          'Set-LapsADComputerSelfPermission -Identity "OU=Workstations,DC=rana-ops,DC=local"'
        ]
      }
    ],
    verification: [
      'Verify active domain computers publish random, rotated passwords inside secure AD schema objects.',
      'Ensure client connections attempting connections on port 389 are directed to port 636 (LDAPS).',
      'Validate Kerberos ticket lifetime claims match GPO definitions during client login audits.'
    ]
  },
  'cloud-hardening': {
    slug: 'cloud-hardening',
    title: 'Cloud Environment Hardening & Monitoring',
    category: 'Cloud',
    description: 'Build and monitor a secure AWS or Azure environment using native security services.',
    tech: ['AWS Security Hub', 'Azure Entra ID', 'IAM Hardening', 'CloudTrail', 'GuardDuty'],
    objectives: [
      'Build strict IAM credential roles following least-privilege paradigms.',
      'Enable trail and diagnostic route configurations mapping API activity to storage.',
      'Implement threat intelligence tools such as GuardDuty or Azure Sentinel.',
      'Set automated alerting alerts targeting modifications made to network routes.'
    ],
    topology: `
[ Cloud IAM Console / API Engine ]
               |
          (CloudTrail)
               v
     +-------------------+
     | Secure S3 Bucket  | <--- AWS GuardDuty (Analyzes event logs)
     +---------+---------+
               |
         (Threat Log Alert)
               v
     +-------------------+
     | SNS Alert / Email | ---> SecOps Admin Team Notification
     +-------------------+
`,
    steps: [
      {
        title: 'Enforce MFA and IAM Policy Boundaries',
        description: 'Deploy conditional policies to enforce Multi-Factor Authentication for cloud administrative accounts.',
        codeSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyAllExceptMFARequested",
      "Effect": "Deny",
      "NotAction": [
        "iam:CreateVirtualMFADevice",
        "iam:EnableMFADevice",
        "iam:GetUser"
      ],
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}`,
        codeLang: 'json'
      },
      {
        title: 'Enable CloudTrail Auditing Streams',
        description: 'Deploy comprehensive auditing configurations recording all API commands execution across environments.',
        commands: [
          '# Example AWS CLI command to establish global logging trail:',
          'aws cloudtrail create-trail --name secops-audit-trail --s3-bucket-name rana-ops-audit-logs --is-multi-region-trail'
        ]
      }
    ],
    verification: [
      'Verify that logins without multi-factor authorization tokens are actively blocked.',
      'Ensure security console dashboards display live activity logs.',
      'Trigger testing API commands and confirm cloudtrail entries are stored within the S3 bucket.'
    ]
  },
  'container-security': {
    slug: 'container-security',
    title: 'Container Security: Image Scanning & Hardening',
    category: 'Cloud',
    description: 'Scan and harden Docker images to reduce container vulnerabilities.',
    tech: ['Docker', 'Trivy', 'Image Hardening', 'Container Security', 'CI/CD security'],
    objectives: [
      'Establish container scan integrations utilizing Trivy or Grype.',
      'Configure images to execute processes utilizing non-root system users.',
      'Implement read-only container file system profiles.',
      'Scan dynamic runtimes to discover running process vulnerabilities.'
    ],
    topology: `
  [ Developer Push ]
          |
     (CI/CD Pipeline)
          v
  +---------------+
  |  Trivy Scan   | (Fails deployment if High/Critical issues found)
  +-------+-------+
          |
      (Passed)
          v
  +---------------+
  |  Docker Run   | (Executed under restricted non-root runtime profiles)
  +---------------+
`,
    steps: [
      {
        title: 'Implement Security Image Scan Pipeline',
        description: 'Integrate Trivy utility runs to analyze Docker images before shipping.',
        commands: [
          '# Scan base image using local Trivy client:',
          'trivy image --severity HIGH,CRITICAL node:latest'
        ]
      },
      {
        title: 'Create Hardened Non-Root Dockerfile Config',
        description: 'Define secure parameters restricting root permissions for the running process.',
        codeSnippet: `# Dockerfile hardening base configuration
FROM node:18-alpine
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "index.js" ]`,
        codeLang: 'dockerfile'
      }
    ],
    verification: [
      'Ensure CI/CD build scripts fail if vulnerability results contain critical alerts.',
      'Confirm the containerized service processes are executed with low-privileged OS IDs.',
      'Attempt filesystem modifications within running read-only nodes and confirm write permissions are denied.'
    ]
  },
  'vulnerability-scanning': {
    slug: 'vulnerability-scanning',
    title: 'Vulnerability Scanning & Remediation Pipeline',
    category: 'SecOps',
    description: 'Scan systems for vulnerabilities, remediate findings, and validate fixes through rescanning.',
    tech: ['Nessus', 'OpenVAS', 'Vulnerability Assessment', 'Remediation tracking'],
    objectives: [
      'Deploy vulnerability scanning appliances (Nessus/OpenVAS).',
      'Design targeted scanning schedules for public and internal targets.',
      'Parse reporting results to identify high risk patches required.',
      'Establish validation rescanning pipelines to certify remediation.'
    ],
    topology: `
+--------------------+
| Nessus Controller  | === [ Network Scan Probe ] ===> [ Subnet targets ]
+---------+----------+
          |
    (Scan Report)
          v
+--------------------+
| Remediation Engine | ---> Automates patching -> Rescans & Verifies
+--------------------+
`,
    steps: [
      {
        title: 'Configure Scan Scope Configurations',
        description: 'Set target scope IP lists and active credential properties for secure compliance scans.',
        commands: [
          '# Example of executing OpenVAS audit scans via shell commands:',
          'omp -u admin -w adminPassword -C -n "Monthly Internal Audit" -T "Full and fast"'
        ]
      },
      {
        title: 'Establish Remediation Pipelines',
        description: 'Review findings and schedule automation plays to resolve vulnerabilities on identified server hosts.',
        codeSnippet: `# Sample Ansible remediation playbook configuration
- name: Resolve Nessus detection CVE-2021-34473 (Exchange RCE)
  hosts: exchange_nodes
  tasks:
    - name: Apply Microsoft Security Update cumulative patch package
      win_hotfix:
        hotfix_id: KB5004778
        state: present`,
        codeLang: 'yaml'
      }
    ],
    verification: [
      'Confirm system scanning records show 100% completion metrics.',
      'Ensure vulnerability scores drop following update cycles.',
      'Verify that new issues discovered are immediately logged for patch scheduling.'
    ]
  },
  'siem-implementation': {
    slug: 'siem-implementation',
    title: 'SIEM Implementation & Log Management',
    category: 'SecOps',
    description: 'Centralize logs and configure security alerts using a SIEM platform.',
    tech: ['ELK Stack', 'Wazuh SIEM', 'Syslog', 'Log Parsing', 'Security Alerting'],
    objectives: [
      'Build a centralized Logstash parser and Elasticsearch pipeline.',
      'Configure log shippers (filebeat, syslog) on target nodes.',
      'Create custom dashboard panels to visualize logins and events.',
      'Enforce alert triggers to notify security engineers of unauthorized login configurations.'
    ],
    topology: `
  [ Clients & Nodes ]  --- (Filebeat Logs) ---> [ Logstash Parser ]
                                                       |
                                                       v
  [ Kibana UI Console ] <--- (Alert Triggers) --- [ Elasticsearch ]
`,
    steps: [
      {
        title: 'Establish Log Parsing Rules',
        description: 'Configure Logstash pipeline configs to parse log entries for user identity metrics.',
        codeSnippet: `# Logstash filter layout (/etc/logstash/conf.d/ssh-parsing.conf)
filter {
  if [fileset][module] == "system" {
    grok {
      match => { "message" => "%{SYSLOGTIMESTAMP:timestamp} %{SYSLOGHOST:hostname} sshd\\[%{POSINT:pid}\\]: %{WORD:action} password for %{USER:username} from %{IP:src_ip} port %{POSINT:port} ssh2" }
    }
  }
}`,
        codeLang: 'text'
      },
      {
        title: 'Configure Real-time Kibana Alerters',
        description: 'Define alerts inside Elasticsearch to track excessive login failures.',
        codeSnippet: `# Kibana alert settings trigger rules:
# Track field: action == "Failed"
# Group by: src_ip
# Trigger condition: count > 5 | within: 1 minute
# Action: Send webhook message payload to SecOps console`,
        codeLang: 'text'
      }
    ],
    verification: [
      'Ensure logs from remote client devices populate indices in the SIEM database.',
      'Simulate brute force SSH attacks on test nodes and verify dashboard widgets flag the testing IP.',
      'Confirm email alerts successfully dispatch to administrators.'
    ]
  }
};
