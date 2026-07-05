import { Project, Experience, SkillCategory, Testimonial, Certification } from './types';
import ejptImage from './assets/images/ejpt.png';
import comptiaImage from './assets/images/CompTIA.png';
import googleImage from './assets/images/Google.png';
import awsImage from './assets/images/AWS.png';
import advenImage from './assets/images/ADVEN.png';
import elevatexImage from './assets/images/ElevateX.png';
import unccImage from './assets/images/UNCC.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'keylog-monitor',
    title: 'Empowering Digital Parenting with Key Log Monitor',
    category: 'Endpoint Security',
    description: 'Python-based keylogger security solution delivering real-time detection and blocking of unauthorized access.',
    fullDescription: 'Developed a Python based keylogger security solution that delivers real-time detection and proactive blocking of unauthorized access attempts, significantly strengthening endpoint security posture. Integrated automated email alerting and optimized file system operations using Python OS and email libraries to enable continuous monitoring, rapid notification, and streamlined security event reporting.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Python', 'Email Library', 'OS Library', 'Security Monitoring'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    color: 'from-cyan-400 via-teal-300 to-indigo-400',
    metrics: [
      { label: 'Detection', value: 'Real-time' },
      { label: 'Language', value: 'Python' }
    ]
  },
  {
    id: 'triple-layer-security',
    title: 'Triple Layer Data Security',
    category: 'Data Protection & Cryptography',
    description: 'Three-layer encryption framework in Java to protect sensitive data from unauthorized access.',
    fullDescription: 'Designed a three layer encryption framework in Java to protect sensitive data from unauthorized access and reduce the risk of compromise across storage and transmission channels. Applied advanced cryptographic algorithms to maximize data integrity, confidentiality, and secure transmission, strengthening the overall security posture of the application.',
    image: 'https://images.unsplash.com/photo-1614064641913-6b7162ffffa4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Java', 'Cryptographic Techniques', 'Data Security'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    color: 'from-pink-400 via-purple-400 to-indigo-500',
    metrics: [
      { label: 'Encryption', value: '3-Layer' },
      { label: 'Integrity', value: 'Maximized' }
    ]
  },
  {
    id: 'malware-analysis',
    title: 'Malware Analysis',
    category: 'Threat Intelligence',
    description: 'In-depth static and dynamic malware analysis to identify system modifications and reveal advanced anti-debugging techniques.',
    fullDescription: 'Performed in-depth static and dynamic malware analysis to identify system modifications and reveal advanced anti debugging techniques used by malicious code to evade detection. Investigated network behavior and anti debugging mechanisms to map malware communication flows and data exfiltration paths, strengthening threat intelligence and improving incident response effectiveness.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    tags: ['CFF Explorer', 'Process Explorer', 'Ghidra', 'OllyDbg'],
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    color: 'from-amber-400 via-orange-400 to-rose-500',
    metrics: [
      { label: 'Analysis', value: 'Static & Dynamic' },
      { label: 'Focus', value: 'Anti-debugging' }
    ]
  },
  {
    id: 'forensic-investigation',
    title: 'Forensic Evidence Investigation',
    category: 'Digital Forensics',
    description: 'Advanced digital forensic investigations extracting critical evidence from file systems and volatile memory.',
    fullDescription: 'Conducted advanced digital forensic investigations utilizing tools such as FTK Imager and Autopsy, extracting critical evidence from file systems and volatile memory to support comprehensive incident analysis. Compiled meticulous forensic reports, documenting findings with precision to aid in incident response efforts and inform threat mitigation strategies, ensuring effective resolution and risk reduction.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
    tags: ['FTK Imager', 'Autopsy', 'Belkasoft'],
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    color: 'from-stone-600 via-zinc-700 to-neutral-900',
    metrics: [
      { label: 'Memory', value: 'Volatile' },
      { label: 'Reporting', value: 'Meticulous' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'advanced-energy',
    role: 'SOC Administrator',
    company: 'Advanced Energy',
    logo: advenImage,
    period: 'May 2026 — Present',
    description: [
      'Tuned SIEM alerting use cases inside Splunk correlation searches, reducing false positive volume 35% and improving threat detection visibility.',
      'Investigated endpoint incidents using CrowdStrike Falcon real time response, performing containment and eradication on compromised hosts.',
      'Supported vulnerability scanning processes with Tenable Nessus credentialed assessments, tracking remediation across 120 servers.',
      'Validated Secure Email Gateway policies through Proofpoint targeted attack protection, blocking 200 phishing attempts monthly.',
      'Automated log enrichment workflows with Python parsing scripts, integrating Threat Intel indicators into Splunk scheduled searches.',
      'Produced incident response metrics using Splunk dashboard studio aligned with NIST 800-61 standards.'
    ],
    tags: ['SIEM', 'EDR', 'MDR', 'Threat Hunting', 'MITRE ATT&CK']
  },
  {
    id: 'elevatex',
    role: 'Cybersecurity Engineer',
    company: 'ElevateX',
    logo: elevatexImage,
    period: 'Mar 2025 — May 2026',
    description: [
      'Operated EDR alert triage workflows using CrowdStrike Falcon detection dashboard, processing 30 events daily.',
      'Examined IDS alert patterns through Suricata rule management console, correlating network analyzer findings with Threat Intel advisories.',
      'Captured forensic artifacts using CrowdStrike Falcon host investigation, supporting senior engineers during security incidents.',
      'Contributed PCI compliance evidence by extracting audit logs from Splunk saved searches to support annual PCI audit.',
      'Tested endpoint product configurations within CrowdStrike Falcon prevention policies, verifying detection efficacy.',
      'Facilitated analyst onboarding by demonstrating SIEM alerting workflows inside Splunk enterprise console, improving team triage accuracy 20%.'
    ],
    tags: ['DLP', 'Incident Response', 'SOC', 'Data Exfiltration']
  },
  {
    id: 'unc',
    role: 'Graduate Assistant',
    company: 'University of North Carolina',
    logo: unccImage,
    period: 'Jan 2024 — Dec 2024',
    description: [
      'Monitored SIEM platform health across Splunk enterprise console, triaging alerts by severity.',
      'Analyzed IPS alert data through Snort signature management, identifying suspicious network activity and escalating validated threats.',
      'Executed vulnerability assessments with Qualys asset inventory, prioritizing findings against risk severity and tracking remediation.',
      'Assisted use case creation by refining Microsoft Sentinel analytics rules, developing alerting automation for authentication anomalies.',
      'Reviewed firewall and proxy logs using Wireshark display filters, verifying network segmentation policies.',
      'Drafted operational runbooks covering alert triage procedures inside Splunk report builder.'
    ],
    tags: ['DLP', 'Networking', 'Incident Resolution', 'Security Reporting']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Security Tools & Technologies',
    description: 'Tools used for monitoring, analysis, and vulnerability assessment.',
    items: [
      { name: 'Splunk & Sentinel', level: 95, icon: 'ShieldAlert' },
      { name: 'CrowdStrike & Defender', level: 90, icon: 'ShieldCheck' },
      { name: 'Nmap & Rapid7', level: 88, icon: 'Radar' },
      { name: 'Tenable & Qualys', level: 85, icon: 'Search' },
      { name: 'Burp Suite & OWASP Zap', level: 92, icon: 'Bug' },
      { name: 'Proofpoint', level: 85, icon: 'FileSearch' }
    ]
  },
  {
    category: 'Programming & Web Development',
    description: 'Languages and frameworks for scripting and web development.',
    items: [
      { name: 'Python', level: 90, icon: 'Code' },
      { name: 'Java & C', level: 85, icon: 'Cpu' },
      { name: 'Bash Scripting', level: 88, icon: 'Terminal' },
      { name: 'HTML & CSS', level: 90, icon: 'Globe' },
      { name: 'JavaScript', level: 85, icon: 'Code2' }
    ]
  },
  {
    category: 'Networking, Cloud & Standards',
    description: 'Network protocols, cloud platforms, and compliance frameworks.',
    items: [
      { name: 'TCP/IP & OSI', level: 95, icon: 'Network' },
      { name: 'HTTP/S, SSH, RDP', level: 90, icon: 'Lock' },
      { name: 'AWS & Azure', level: 85, icon: 'Cloud' },
      { name: 'NIST & ISO27001', level: 90, icon: 'CheckSquare' },
      { name: 'PCI DSS, HIPAA, MITRE ATT&CK', level: 88, icon: 'FileText' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert1',
    name: 'Google Cybersecurity Professional',
    issuer: 'Google',
    color: 'from-blue-600 via-indigo-600 to-blue-800',
    image: googleImage,
    documentUrl: `${import.meta.env.BASE_URL}GoogleCybersecurityProfessionalCertificateV2_Badge20250427-25-ue55x5.pdf`
  },
  {
    id: 'cert2',
    name: 'Certified Solutions Architect - Associate',
    issuer: 'AWS',
    color: 'from-orange-500 via-amber-600 to-orange-700',
    image: awsImage,
    documentUrl: `${import.meta.env.BASE_URL}AWS Certified Solutions Architect - Associate certificate.pdf`
  },
  {
    id: 'cert3',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    color: 'from-red-500 via-rose-600 to-red-700',
    image: comptiaImage,
    documentUrl: `${import.meta.env.BASE_URL}CompTIA Security+ certificate.pdf`
  },
  {
    id: 'cert4',
    name: 'Junior Penetration Tester (eJPT)',
    issuer: 'eLearnSecurity',
    color: 'from-zinc-700 via-neutral-800 to-zinc-900',
    image: ejptImage,
    documentUrl: `${import.meta.env.BASE_URL}eJPT.pdf`
  },
];

