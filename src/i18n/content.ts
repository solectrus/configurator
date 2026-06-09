export type Locale = 'de' | 'en';

// Language-neutral shell commands — single source of truth.
// The "existing" command lives in the per-locale content instead, because its
// path is an illustrative placeholder ("/path/to/…") that gets translated.
export const commands = {
  fresh: 'mkdir -p /opt/solectrus && cd /opt/solectrus',
  run: 'curl -fsSL https://raw.githubusercontent.com/solectrus/helios/main/bootstrap/install.sh | bash',
} as const;

export const links = {
  github: 'https://github.com/solectrus',
  issues: 'https://github.com/solectrus/helios/issues',
  solectrus: 'https://solectrus.de',
  imprint: 'https://solectrus.de/impressum/',
  privacy: 'https://solectrus.de/datenschutz/',
  installScript:
    'https://github.com/solectrus/helios/blob/main/bootstrap/install.sh',
  legacy: '/legacy/',
} as const;

export interface Feature {
  title: string;
  body: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Shot {
  alt: string;
  caption: string;
}

export interface DataSource {
  name: string;
  note: string;
}

export interface Content {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    backToSite: string;
    github: string;
  };
  hero: {
    title: string;
    lead: string;
  };
  features: {
    heading: string;
    items: Feature[];
  };
  screenshots: {
    heading: string;
    lead: string;
    items: Shot[];
  };
  serverUrl: string;
  install: {
    scenarioLegend: string;
    scenarios: {
      fresh: { label: string; desc: string; hint: string };
      existing: { label: string; desc: string; hint: string; command: string };
    };
    step2Lead: string;
    securityLink: string;
  };
  requirements: {
    heading: string;
    lead: string;
    devicesLead: string;
    devices: string[];
    specs: { label: string; min: string; recommended: string }[];
    dataHeading: string;
    dataLead: string;
    dataSources: DataSource[];
  };
  firstRun: {
    heading: string;
    lead: string;
    steps: Step[];
  };
  help: {
    heading: string;
    body: string;
    cta: string;
  };
  legacy: {
    heading: string;
    body: string[];
    link: string;
  };
  footer: {
    product: string;
    imprint: string;
    privacy: string;
  };
  ui: {
    copy: string;
    copied: string;
    enlarge: string;
  };
}

export const content: Record<Locale, Content> = {
  de: {
    meta: {
      title: 'SOLECTRUS installieren und konfigurieren: einfach im Browser',
      description:
        'SOLECTRUS installieren und konfigurieren, ohne Docker- und Linux-Kenntnisse. HELIOS richtet alles ein und führt dich im Browser durch die Konfiguration.',
    },
    nav: {
      backToSite: 'solectrus.de',
      github: 'HELIOS auf GitHub',
    },
    hero: {
      title: 'Installation und Konfiguration',
      lead: 'Inbetriebnahme von SOLECTRUS – (fast) ohne Docker- oder Linux-Kenntnisse.',
    },
    features: {
      heading: 'Was HELIOS macht',
      items: [
        {
          title: 'Sensoren einrichten',
          body: 'Wechselrichter, Speicher, Wärmepumpe und Wallbox werden über Formulare konfiguriert.',
        },
        {
          title: 'Dienste steuern',
          body: 'Dienste starten, stoppen und aktualisieren, im Browser statt per Kommandozeile.',
        },
        {
          title: 'Bestehendes übernehmen',
          body: 'Eine vorhandene SOLECTRUS-Installation wird eingelesen und weiterverwendet.',
        },
        {
          title: 'Ohne Docker-Kenntnisse',
          body: 'HELIOS verwaltet die Docker-Konfiguration, sie muss nicht von Hand bearbeitet werden.',
        },
        {
          title: 'Backups',
          body: 'Die Sicherung von Konfiguration und Messwerten lässt sich im Browser einrichten.',
        },
        {
          title: 'Updates',
          body: 'Neue Versionen aller Dienste werden eingespielt, Datenbank-Migrationen inklusive.',
        },
        {
          title: 'Datenbanken inklusive',
          body: 'PostgreSQL, Redis und InfluxDB werden mitinstalliert und zusammen verwaltet.',
        },
        {
          title: 'Protokolldateien',
          body: 'Die Protokolle aller Dienste sind im Browser einsehbar.',
        },
      ],
    },
    screenshots: {
      heading: 'So sieht es aus',
      lead: 'Alles im Browser, ohne Kommandozeile.',
      items: [
        {
          alt: 'Konfiguration im Browser',
          caption: 'Konfiguration',
        },
        {
          alt: 'Übersicht der laufenden Dienste',
          caption: 'Dienste im Blick',
        },
        {
          alt: 'Backup-Einstellungen im Browser',
          caption: 'Datensicherung',
        },
      ],
    },
    serverUrl: 'http://<ip>:3999',
    install: {
      scenarioLegend: 'Installationsart wählen',
      scenarios: {
        fresh: {
          label: 'SOLECTRUS neu installieren',
          desc: 'Eine neue SOLECTRUS-Installation von Grund auf einrichten.',
          hint: 'Gewünschten Ordner für SOLECTRUS anlegen und hineinwechseln, z.B. so:',
        },
        existing: {
          label: 'Bestehende Installation modernisieren',
          desc: 'Vorhandene Konfiguration und Messwerte übernehmen.',
          hint: 'In den Ordner deiner bestehenden Installation wechseln. Deine Daten bleiben erhalten:',
          command: 'cd /pfad/zu/solectrus',
        },
      },
      step2Lead: 'Installations-Script ausführen:',
      securityLink: 'Script vorher ansehen',
    },
    requirements: {
      heading: 'Was benötigt wird',
      lead: 'Ein Linux-Gerät, das rund um die Uhr läuft und Docker-fähig ist.',
      devicesLead: 'Zum Beispiel eines davon:',
      devices: [
        'Heim-Server',
        'NAS',
        'Mini-PC',
        'Raspberry Pi',
        'Cloud-Server',
      ],
      specs: [
        {
          label: 'Freier Arbeitsspeicher',
          min: 'mind. 1 GB',
          recommended: 'empfohlen 2 GB',
        },
        {
          label: 'Freier Festplattenspeicher',
          min: 'mind. 1 GB',
          recommended: 'empfohlen 5 GB',
        },
      ],
      dataHeading: 'Woher die Messwerte kommen',
      dataLead:
        'SOLECTRUS braucht Zugriff auf die Messwerte. Dafür gibt es verschiedene Wege:',
      dataSources: [
        {
          name: 'SENEC & Shelly',
          note: 'Nativ unterstützt, ohne weitere Software.',
        },
        { name: 'Home Assistant', note: 'Integration verfügbar.' },
        { name: 'ioBroker', note: 'Adapter verfügbar.' },
        {
          name: 'MQTT',
          note: 'Viele weitere Geräte lassen sich per MQTT einbinden.',
        },
      ],
    },
    firstRun: {
      heading: 'Beim ersten Aufruf',
      lead: 'Im Browser öffnen: {url}',
      steps: [
        {
          title: 'Anmelden',
          body: 'Mit dem Passwort aus der Installation.',
        },
        {
          title: 'Einrichten',
          body: 'Sensoren über Formulare konfigurieren.',
        },
        {
          title: 'Starten',
          body: 'Dienste starten, das Dashboard ist bereit.',
        },
      ],
    },
    help: {
      heading: 'Etwas funktioniert nicht?',
      body: 'Erstelle ein Issue auf GitHub – am besten mit einem Support-Bundle, das HELIOS auf Knopfdruck erzeugt. Jede Rückmeldung ist willkommen.',
      cta: 'Problem melden ❯',
    },
    legacy: {
      heading: 'Wo ist der alte Konfigurator hin?',
      body: [
        'Auf dieser Seite stand früher ein älteres Konfigurator-Werkzeug zur Verfügung, das nach Durchlauf eines Fragebogens die für SOLECTRUS notwendigen Docker-Dateien erzeugt hat – gedacht für die einmalige Ersteinrichtung und auch nur für die häufigsten Anwendungsfälle.',
        'HELIOS macht es anders: Es läuft direkt auf dem eigenen Gerät und verwaltet die Installation dauerhaft. So kann eine Konfiguration jederzeit angepasst oder erweitert werden. Außerdem unterstützt HELIOS wirklich alles, was mit SOLECTRUS möglich ist, und kann auch eine bestehende Installation übernehmen.',
        'Alles viel besser als vorher, probier’s einfach aus!',
      ],
      link: 'Der alte Konfigurator ist vorübergehend noch verfügbar',
    },
    footer: {
      product: 'SOLECTRUS Photovoltaik Dashboard',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
    ui: {
      copy: 'Kopieren',
      copied: 'Kopiert!',
      enlarge: 'vergrößern',
    },
  },

  en: {
    meta: {
      title: 'Install and configure SOLECTRUS: easy, in the browser',
      description:
        'Install and configure SOLECTRUS without Docker or Linux knowledge. HELIOS sets everything up and guides you through the configuration in your browser.',
    },
    nav: {
      backToSite: 'solectrus.de',
      github: 'HELIOS on GitHub',
    },
    hero: {
      title: 'Installation and configuration',
      lead: 'Getting SOLECTRUS up and running – (almost) no Docker or Linux knowledge needed.',
    },
    features: {
      heading: 'What HELIOS does',
      items: [
        {
          title: 'Set up sensors',
          body: 'Inverter, battery, heat pump and wallbox are configured through forms.',
        },
        {
          title: 'Control services',
          body: 'Start, stop and update services in the browser instead of the command line.',
        },
        {
          title: 'Reuse what exists',
          body: 'An existing SOLECTRUS installation is read in and reused.',
        },
        {
          title: 'No Docker knowledge',
          body: 'HELIOS manages the Docker configuration; it doesn’t need to be edited by hand.',
        },
        {
          title: 'Backups',
          body: 'Backups of configuration and readings can be set up in the browser.',
        },
        {
          title: 'Updates',
          body: 'New versions of all services are installed, database migrations included.',
        },
        {
          title: 'Databases included',
          body: 'PostgreSQL, Redis and InfluxDB are installed and managed together.',
        },
        {
          title: 'Log files',
          body: 'The log files of all services can be viewed in the browser.',
        },
      ],
    },
    screenshots: {
      heading: 'Here’s how it looks',
      lead: 'Everything in the browser, no command line.',
      items: [
        {
          alt: 'Configuration in the browser',
          caption: 'Configuration',
        },
        {
          alt: 'Overview of the running services',
          caption: 'Services at a glance',
        },
        {
          alt: 'Backup settings in the browser',
          caption: 'Backup',
        },
      ],
    },
    serverUrl: 'http://<ip>:3999',
    install: {
      scenarioLegend: 'Choose installation type',
      scenarios: {
        fresh: {
          label: 'Install SOLECTRUS fresh',
          desc: 'Set up a new SOLECTRUS installation from scratch.',
          hint: 'Create a folder of your choice for SOLECTRUS and switch into it, for example:',
        },
        existing: {
          label: 'Modernize existing installation',
          desc: 'Keep your existing config and readings.',
          hint: 'Switch into your existing installation’s folder. Your data stays intact:',
          command: 'cd /path/to/solectrus',
        },
      },
      step2Lead: 'Run the install script:',
      securityLink: 'Review the script first',
    },
    requirements: {
      heading: 'What you need',
      lead: 'A Linux device that runs around the clock and is Docker-capable.',
      devicesLead: 'For example, any one of these:',
      devices: [
        'Home server',
        'NAS',
        'Mini PC',
        'Raspberry Pi',
        'Cloud server',
      ],
      specs: [
        {
          label: 'Free memory',
          min: '1 GB min',
          recommended: '2 GB recommended',
        },
        {
          label: 'Free disk space',
          min: '1 GB min',
          recommended: '5 GB recommended',
        },
      ],
      dataHeading: 'Where the readings come from',
      dataLead:
        'SOLECTRUS needs access to the readings. There are several ways to get them:',
      dataSources: [
        {
          name: 'SENEC & Shelly',
          note: 'Natively supported, no extra software.',
        },
        { name: 'Home Assistant', note: 'Integration available.' },
        { name: 'ioBroker', note: 'Adapter available.' },
        {
          name: 'MQTT',
          note: 'Many other devices connect via MQTT.',
        },
      ],
    },
    firstRun: {
      heading: 'On the first visit',
      lead: 'Open in your browser: {url}',
      steps: [
        {
          title: 'Log in',
          body: 'With the password from the installation.',
        },
        {
          title: 'Set up',
          body: 'Configure your sensors in forms.',
        },
        {
          title: 'Start',
          body: 'Start the services, the dashboard is ready.',
        },
      ],
    },
    help: {
      heading: 'Something not working?',
      body: 'Open an issue on GitHub – ideally with a support bundle that HELIOS creates at the push of a button. Every report is welcome.',
      cta: 'Report a problem ❯',
    },
    legacy: {
      heading: 'Where did the old configurator go?',
      body: [
        'This page used to host an older configurator tool that generated the Docker files needed for SOLECTRUS after you worked through a questionnaire – meant for a one-time initial setup, and only for the most common use cases.',
        'HELIOS does it differently: it runs directly on your own device and manages the installation permanently. That way the configuration can be adjusted or extended at any time. On top of that, HELIOS supports truly everything that’s possible with SOLECTRUS, and it can also take over an existing installation.',
        'All in all so much better than before – just give it a try!',
      ],
      link: 'The old configurator is still available for now',
    },
    footer: {
      product: 'SOLECTRUS Photovoltaic Dashboard',
      imprint: 'Imprint',
      privacy: 'Privacy',
    },
    ui: {
      copy: 'Copy',
      copied: 'Copied!',
      enlarge: 'enlarge',
    },
  },
};
