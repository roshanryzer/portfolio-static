/** UI copy for static site (no API) */

export const siteContent = {
  home: {
    introText: 'Hi, my name is',
    primaryCta: 'View my work',
    secondaryCta: 'About me',
    stats: {
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      certifications: 'Certifications',
    },
    profileGlance: {
      kicker: 'Profile at a glance',
      subtitle: 'A quick snapshot of my core portfolio highlights.',
      helpers: {
        skills: 'Technologies and tools in my stack',
        experience: "Companies and roles I've worked in",
        education: 'Degrees and formal studies',
        certifications: 'Professional credentials earned',
      },
    },
    experienceTitle: 'Experience',
    featuredProjectsTitle: 'Featured Projects',
    viewDetailsLabel: 'View details',
    closeLabel: 'Close',
  },
  about: {
    title: 'About Me',
    stats: {
      yearsExperience: 'Years Experience',
      projectsDelivered: 'Projects Delivered',
      certifications: 'Certifications',
    },
    viewSkillsLabel: 'View Skills',
    viewProjectsLabel: 'View Projects',
  },
  skills: {
    title: 'Skills',
    subtitle: 'Technologies and tools I use across frontend, backend, cloud, and delivery.',
  },
  education: {
    title: 'Education',
    presentLabel: 'Present',
  },
  certifications: {
    title: 'Certifications',
  },
  projects: {
    title: 'Work',
    subtitle: 'Click any project to view full details.',
    viewDetailsLabel: 'View details',
    closeLabel: 'Close',
    stackLabel: 'Tech Stack',
    visitProjectLabel: 'Visit project',
    noLinkLabel: 'No public link available',
  },
  resume: {
    title: 'Resume',
    subtitle: 'Print-friendly view of my experience, education, and skills.',
    experienceTitle: 'Experience',
    educationTitle: 'Education',
    coreSkillsTitle: 'Core Skills',
    presentLabel: 'Present',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Send a message below — it goes straight to my Gmail inbox.',
    formSubject: 'Portfolio contact message',
    formLabels: {
      name: 'Name',
      email: 'Email',
      phone: 'Mobile number',
      subject: 'Subject',
      message: 'Message',
    },
    buttons: {
      send: 'Send message',
      sending: 'Sending...',
      sendViaEmail: 'Open in email app',
    },
    messages: {
      mailtoOpening: 'Opening your email app…',
      success: 'Thanks! Your message has been sent.',
      error: 'Could not send right now. Please email me directly.',
    },
    links: {
      email: 'Email',
      github: 'GitHub',
      linkedIn: 'LinkedIn',
    },
  },
} as const;

export type SiteContent = typeof siteContent;
