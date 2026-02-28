export const SUPPORTED_LANGS = ["en", "pl"];
export const DEFAULT_LANG = "en";
export const DEFAULT_THEME = "dark";

export function localize(value, lang = DEFAULT_LANG) {
  if (value && typeof value === "object" && ("en" in value || "pl" in value)) {
    return value[lang] ?? value.en ?? value.pl ?? "";
  }
  return value ?? "";
}

export const UI_TEXT = {
  appTitle: {
    en: "Continuous Security Navigator",
    pl: "Continuous Security Navigator"
  },
  kicker: {
    en: "DevSecOps Process Intelligence",
    pl: "Inteligencja procesu DevSecOps"
  },
  lead: {
    en: "Assess engineering process maturity, identify security delivery gaps, and get a practical, tool-backed improvement roadmap.",
    pl: "Oceń dojrzałość procesu inżynierskiego, wykryj luki bezpieczeństwa w dostarczaniu i wygeneruj praktyczną roadmapę usprawnień z narzędziami."
  },
  save: { en: "Save locally", pl: "Zapisz lokalnie" },
  saved: { en: "Saved", pl: "Zapisano" },
  export: { en: "Export report (.md)", pl: "Eksport raportu (.md)" },
  reset: { en: "Reset", pl: "Reset" },
  projectProfile: { en: "Project profile", pl: "Profil projektu" },
  starterPresets: { en: "Starter presets:", pl: "Szablony startowe:" },
  presetStartup: { en: "Startup / chaotic", pl: "Startup / chaos" },
  presetScaleup: { en: "Scale-up / growing", pl: "Scale-up / rosnący" },
  presetMature: { en: "Mature engineering", pl: "Dojrzały engineering" },
  frameworkTitle: {
    en: "8-stage process assessment",
    pl: "Ocena procesu w 8 etapach"
  },
  frameworkScale: {
    en: "Scale: 0=Missing, 1=Ad hoc, 2=Repeatable, 3=Integrated",
    pl: "Skala: 0=Brak, 1=Ad hoc, 2=Powtarzalne, 3=Zintegrowane"
  },
  results: { en: "Results and recommendations", pl: "Wyniki i rekomendacje" },
  findingsAndRoadmap: {
    en: "Top gaps and execution roadmap",
    pl: "Najważniejsze luki i roadmapa wdrożenia"
  },
  topGaps: { en: "Top gaps", pl: "Top luki" },
  roadmap: {
    en: "Roadmap (12 highest-impact actions)",
    pl: "Roadmapa (12 działań o najwyższym wpływie)"
  },
  toolsTitle: {
    en: "Recommended tools (official links)",
    pl: "Rekomendowane narzędzia (oficjalne linki)"
  },
  toolsLead: {
    en: "Tool suggestions are generated from your weakest controls and linked to official documentation.",
    pl: "Sugestie narzędzi są generowane na podstawie najsłabszych kontroli i prowadzą do oficjalnych dokumentacji."
  },
  approachTitle: { en: "How this works", pl: "Jak to działa" },
  approachBullet1: {
    en: "Scores your end-to-end software delivery process across 8 stages.",
    pl: "Ocenia cały proces dostarczania oprogramowania w 8 etapach."
  },
  approachBullet2: {
    en: "Transforms low-maturity controls into prioritized actions and owners.",
    pl: "Przekształca słabe kontrole w priorytetyzowane działania i ownerów."
  },
  approachBullet3: {
    en: "Builds a clear cause-and-effect path to make execution intuitive.",
    pl: "Buduje klarowny ciąg przyczynowo-skutkowy, aby wdrożenie było intuicyjne."
  },
  summaryScore: { en: "Overall score", pl: "Wynik łączny" },
  summaryRisk: { en: "Risk level", pl: "Poziom ryzyka" },
  summaryGaps: { en: "Detected gaps", pl: "Wykryte luki" },
  summaryTools: { en: "Suggested tools", pl: "Sugestie narzędzi" },
  noGaps: {
    en: "No major gaps detected. Process maturity is high.",
    pl: "Nie wykryto istotnych luk. Dojrzałość procesu jest wysoka."
  },
  noRoadmap: {
    en: "No roadmap items yet.",
    pl: "Brak elementów roadmapy."
  },
  noTools: {
    en: "No additional tools required for the current maturity level.",
    pl: "Brak dodatkowych narzędzi dla obecnego poziomu dojrzałości."
  },
  savedStateError: {
    en: "Could not load saved state",
    pl: "Nie udało się wczytać zapisanego stanu"
  },
  detailTitleFallback: {
    en: "Gap details",
    pl: "Szczegóły luki"
  },
  detailClose: { en: "Close details", pl: "Zamknij szczegóły" },
  detailOpenHint: {
    en: "Click any gap card to open full cause-effect details.",
    pl: "Kliknij kartę luki, aby otworzyć pełne szczegóły przyczynowo-skutkowe."
  },
  detailCause: { en: "Cause", pl: "Przyczyna" },
  detailEffect: { en: "Likely impact", pl: "Prawdopodobny skutek" },
  detailAction: { en: "Recommended action", pl: "Rekomendowane działanie" },
  detailOutcome: { en: "Expected outcome", pl: "Oczekiwany rezultat" },
  detailLinks: { en: "Useful links", pl: "Przydatne linki" },
  detailCurrent: { en: "Current maturity", pl: "Bieżąca dojrzałość" },
  detailStageLinks: { en: "Stage guidance", pl: "Wskazówki dla etapu" },
  language: { en: "Language", pl: "Język" },
  theme: { en: "Theme", pl: "Motyw" },
  themeDark: { en: "Dark", pl: "Ciemny" },
  themeLight: { en: "Light", pl: "Jasny" },
  actionLabel: { en: "Action", pl: "Działanie" },
  kpiLabel: { en: "KPI", pl: "KPI" },
  ownerLabel: { en: "Owner", pl: "Owner" },
  categoryLabel: { en: "Category", pl: "Kategoria" },
  stagesLabel: { en: "Used for stages", pl: "Dla etapów" },
  clickForDetails: { en: "Click for details", pl: "Kliknij po szczegóły" },
  reportTitle: { en: "Continuous Security Report", pl: "Raport Continuous Security" },
  generated: { en: "Generated", pl: "Wygenerowano" },
  stageResultsTitle: { en: "Stage results", pl: "Wyniki etapów" },
  topGapsTitle: { en: "Top gaps", pl: "Top luki" },
  improvementPlanTitle: { en: "Improvement plan", pl: "Plan usprawnień" },
  toolsSectionTitle: { en: "Recommended tools", pl: "Rekomendowane narzędzia" }
};

export const PROFILE_FIELDS = [
  {
    key: "projectName",
    type: "text",
    label: { en: "Project name", pl: "Nazwa projektu" },
    placeholder: { en: "e.g. Checkout Platform", pl: "np. Platforma płatności" }
  },
  {
    key: "teamSize",
    type: "select",
    label: { en: "Team size", pl: "Wielkość zespołu" },
    options: [
      { value: "1-5", label: { en: "1-5", pl: "1-5" } },
      { value: "6-10", label: { en: "6-10", pl: "6-10" } },
      { value: "11-25", label: { en: "11-25", pl: "11-25" } },
      { value: "26+", label: { en: "26+", pl: "26+" } }
    ]
  },
  {
    key: "deliveryModel",
    type: "select",
    label: { en: "Delivery model", pl: "Model pracy" },
    options: [
      { value: "agile", label: { en: "Agile", pl: "Agile" } },
      { value: "kanban", label: { en: "Kanban", pl: "Kanban" } },
      { value: "scrum", label: { en: "Scrum", pl: "Scrum" } },
      { value: "hybrid", label: { en: "Hybrid", pl: "Hybrid" } }
    ]
  },
  {
    key: "releaseCadence",
    type: "select",
    label: { en: "Release cadence", pl: "Cadence release" },
    options: [
      { value: "daily", label: { en: "Daily", pl: "Codziennie" } },
      { value: "weekly", label: { en: "Weekly", pl: "Co tydzień" } },
      { value: "biweekly", label: { en: "Bi-weekly", pl: "Co 2 tygodnie" } },
      { value: "monthly", label: { en: "Monthly", pl: "Co miesiąc" } }
    ]
  }
];

export const RESPONSE_SCALE = [
  {
    value: 0,
    label: { en: "Missing", pl: "Brak" },
    hint: { en: "No formal practice", pl: "Brak formalnej praktyki" }
  },
  {
    value: 1,
    label: { en: "Ad hoc", pl: "Ad hoc" },
    hint: { en: "Inconsistent and person-dependent", pl: "Nieregularne i zależne od osób" }
  },
  {
    value: 2,
    label: { en: "Repeatable", pl: "Powtarzalne" },
    hint: { en: "Documented but not fully enforced", pl: "Udokumentowane, ale niespójnie egzekwowane" }
  },
  {
    value: 3,
    label: { en: "Integrated", pl: "Zintegrowane" },
    hint: { en: "Measured and continuously improved", pl: "Mierzone i stale ulepszane" }
  }
];

export const TOOL_CATALOG = {
  jira: {
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    category: { en: "Planning", pl: "Planowanie" },
    note: {
      en: "Backlog, workflow and SLA for engineering tasks",
      pl: "Backlog, workflow i SLA dla zadań inżynierskich"
    }
  },
  githubProjects: {
    name: "GitHub Projects",
    url: "https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects",
    category: { en: "Planning", pl: "Planowanie" },
    note: {
      en: "Lightweight planning board for development teams",
      pl: "Lekki board planistyczny dla zespołów developerskich"
    }
  },
  threatModeling: {
    name: "OWASP Threat Modeling",
    url: "https://owasp.org/www-community/Threat_Modeling",
    category: { en: "Design", pl: "Projektowanie" },
    note: {
      en: "Structured method to identify and prioritize threats",
      pl: "Ustrukturyzowana metoda identyfikacji i priorytetyzacji zagrożeń"
    }
  },
  owaspAsvs: {
    name: "OWASP ASVS",
    url: "https://owasp.org/www-project-application-security-verification-standard/",
    category: { en: "Requirements", pl: "Wymagania" },
    note: {
      en: "Security requirements baseline for applications",
      pl: "Bazowy standard wymagań bezpieczeństwa aplikacji"
    }
  },
  owaspCheatSheets: {
    name: "OWASP Cheat Sheet Series",
    url: "https://cheatsheetseries.owasp.org/",
    category: { en: "Implementation", pl: "Implementacja" },
    note: {
      en: "Actionable secure coding patterns",
      pl: "Praktyczne wzorce bezpiecznego kodowania"
    }
  },
  nistRmf: {
    name: "NIST Risk Management Framework",
    url: "https://csrc.nist.gov/projects/risk-management/about-rmf",
    category: { en: "Risk", pl: "Ryzyko" },
    note: {
      en: "End-to-end model: Prepare-Categorize-Select-Implement-Assess-Authorize-Monitor",
      pl: "Model end-to-end: Prepare-Categorize-Select-Implement-Assess-Authorize-Monitor"
    }
  },
  semgrep: {
    name: "Semgrep",
    url: "https://semgrep.dev/docs/",
    category: { en: "Testing", pl: "Testowanie" },
    note: {
      en: "SAST and policy-as-code checks",
      pl: "SAST i policy-as-code"
    }
  },
  codeql: {
    name: "GitHub CodeQL",
    url: "https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql",
    category: { en: "Testing", pl: "Testowanie" },
    note: {
      en: "Code scanning and vulnerability detection",
      pl: "Skanowanie kodu i wykrywanie podatności"
    }
  },
  zap: {
    name: "OWASP ZAP",
    url: "https://www.zaproxy.org/docs/",
    category: { en: "Testing", pl: "Testowanie" },
    note: {
      en: "DAST for web applications",
      pl: "DAST dla aplikacji webowych"
    }
  },
  cypress: {
    name: "Cypress",
    url: "https://docs.cypress.io/",
    category: { en: "Testing", pl: "Testowanie" },
    note: {
      en: "End-to-end regression tests",
      pl: "Testy end-to-end i regresja"
    }
  },
  playwright: {
    name: "Playwright",
    url: "https://playwright.dev/docs/intro",
    category: { en: "Testing", pl: "Testowanie" },
    note: {
      en: "Cross-browser and smoke tests",
      pl: "Testy cross-browser i smoke testy"
    }
  },
  githubActions: {
    name: "GitHub Actions",
    url: "https://docs.github.com/en/actions",
    category: { en: "CI/CD", pl: "CI/CD" },
    note: {
      en: "Pipeline automation for build, test, and release",
      pl: "Automatyzacja pipeline build-test-release"
    }
  },
  gitlabCI: {
    name: "GitLab CI/CD",
    url: "https://docs.gitlab.com/ee/ci/",
    category: { en: "CI/CD", pl: "CI/CD" },
    note: {
      en: "Pipeline orchestration for delivery",
      pl: "Orkiestracja pipeline'ów dostarczania"
    }
  },
  trivy: {
    name: "Trivy",
    url: "https://aquasecurity.github.io/trivy/latest/",
    category: { en: "Deployment", pl: "Wdrożenie" },
    note: {
      en: "Container and IaC scanning",
      pl: "Skanowanie kontenerów i IaC"
    }
  },
  docker: {
    name: "Docker",
    url: "https://docs.docker.com/",
    category: { en: "Deployment", pl: "Wdrożenie" },
    note: {
      en: "Reproducible runtime environments",
      pl: "Powtarzalne środowiska uruchomieniowe"
    }
  },
  vault: {
    name: "HashiCorp Vault",
    url: "https://developer.hashicorp.com/vault/docs",
    category: { en: "Deployment", pl: "Wdrożenie" },
    note: {
      en: "Secrets lifecycle management",
      pl: "Zarządzanie cyklem życia sekretów"
    }
  },
  sentry: {
    name: "Sentry",
    url: "https://docs.sentry.io/",
    category: { en: "Monitoring", pl: "Monitoring" },
    note: {
      en: "Application error monitoring and triage",
      pl: "Monitoring błędów aplikacji i triage"
    }
  },
  prometheus: {
    name: "Prometheus",
    url: "https://prometheus.io/docs/introduction/overview/",
    category: { en: "Monitoring", pl: "Monitoring" },
    note: {
      en: "Metrics and alerting engine",
      pl: "Silnik metryk i alertingu"
    }
  },
  grafana: {
    name: "Grafana",
    url: "https://grafana.com/docs/",
    category: { en: "Monitoring", pl: "Monitoring" },
    note: {
      en: "Operational dashboards and SLO visibility",
      pl: "Dashboardy operacyjne i widoczność SLO"
    }
  },
  runbooks: {
    name: "Google SRE Workbook - Incident Response",
    url: "https://sre.google/workbook/incident-response/",
    category: { en: "Incident response", pl: "Obsługa incydentów" },
    note: {
      en: "Runbook patterns for effective incident handling",
      pl: "Wzorce runbooków dla skutecznej obsługi incydentów"
    }
  }
};

const stageGuideLinks = {
  prep: [
    { label: { en: "NIST RMF: Prepare", pl: "NIST RMF: Prepare" }, url: "https://csrc.nist.gov/projects/risk-management/about-rmf" },
    { label: { en: "OWASP SAMM", pl: "OWASP SAMM" }, url: "https://owaspsamm.org/model/" }
  ],
  requirements: [
    { label: { en: "OWASP ASVS", pl: "OWASP ASVS" }, url: "https://owasp.org/www-project-application-security-verification-standard/" },
    { label: { en: "NIST RMF: Categorize", pl: "NIST RMF: Categorize" }, url: "https://csrc.nist.gov/projects/risk-management/about-rmf" }
  ],
  design: [
    { label: { en: "OWASP Threat Modeling", pl: "OWASP Threat Modeling" }, url: "https://owasp.org/www-community/Threat_Modeling" },
    { label: { en: "Zero Trust Architecture", pl: "Zero Trust Architecture" }, url: "https://csrc.nist.gov/publications/detail/sp/800-207/final" }
  ],
  implementation: [
    { label: { en: "OWASP Cheat Sheet Series", pl: "OWASP Cheat Sheet Series" }, url: "https://cheatsheetseries.owasp.org/" },
    { label: { en: "GitHub Code Review Docs", pl: "GitHub Code Review Docs" }, url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests" }
  ],
  testing: [
    { label: { en: "OWASP Web Security Testing Guide", pl: "OWASP Web Security Testing Guide" }, url: "https://owasp.org/www-project-web-security-testing-guide/" },
    { label: { en: "Semgrep Docs", pl: "Semgrep Docs" }, url: "https://semgrep.dev/docs/" }
  ],
  deployment: [
    { label: { en: "GitHub Actions Environments", pl: "GitHub Actions Environments" }, url: "https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment" },
    { label: { en: "HashiCorp Vault Docs", pl: "HashiCorp Vault Docs" }, url: "https://developer.hashicorp.com/vault/docs" }
  ],
  authorise: [
    { label: { en: "NIST RMF: Authorize", pl: "NIST RMF: Authorize" }, url: "https://csrc.nist.gov/projects/risk-management/about-rmf" },
    { label: { en: "NIST Governance Overview", pl: "NIST Governance Overview" }, url: "https://www.nist.gov/cyberframework" }
  ],
  monitoring: [
    { label: { en: "Google SRE Incident Response", pl: "Google SRE Incident Response" }, url: "https://sre.google/workbook/incident-response/" },
    { label: { en: "Prometheus Best Practices", pl: "Prometheus Best Practices" }, url: "https://prometheus.io/docs/practices/naming/" }
  ]
};

export const FRAMEWORK_STAGES = [
  {
    id: "prep",
    title: { en: "1. Preparation and Planning", pl: "1. Przygotowanie i planowanie" },
    objective: {
      en: "Secure ownership, accountability and resources before delivery starts.",
      pl: "Zabezpiecz role, odpowiedzialność i zasoby zanim zacznie się dostarczanie."
    },
    links: stageGuideLinks.prep,
    questions: [
      {
        id: "prep_security_owner",
        text: {
          en: "Is there a formal security owner (e.g., Security Lead/CISO) with decision authority?",
          pl: "Czy istnieje formalny owner bezpieczeństwa (np. Security Lead/CISO) z realnym mandatem decyzyjnym?"
        },
        weight: 5,
        cause: {
          en: "Security accountability is fragmented or implicit.",
          pl: "Odpowiedzialność za bezpieczeństwo jest rozproszona lub niejawna."
        },
        effect: {
          en: "High-risk issues remain unresolved because nobody owns the final call.",
          pl: "Krytyczne ryzyka pozostają nierozwiązane, bo nikt nie ma finalnej decyzyjności."
        },
        action: {
          en: "Assign a formal security owner and define escalation rights.",
          pl: "Wyznacz formalnego ownera bezpieczeństwa i zdefiniuj prawa eskalacji."
        },
        kpi: {
          en: "100% projects have explicit security ownership.",
          pl: "100% projektów ma jawnie przypisany ownership bezpieczeństwa."
        },
        tools: ["jira", "githubProjects"]
      },
      {
        id: "prep_budget",
        text: {
          en: "Is security capacity and budget explicitly allocated in planning cycles?",
          pl: "Czy capacity i budżet bezpieczeństwa są jawnie planowane w cyklach planistycznych?"
        },
        weight: 4,
        cause: {
          en: "Security work competes with feature delivery without protected capacity.",
          pl: "Prace security konkurują z feature delivery bez chronionego capacity."
        },
        effect: {
          en: "Security debt accumulates and is postponed until incidents occur.",
          pl: "Dług bezpieczeństwa narasta i jest odkładany do momentu incydentów."
        },
        action: {
          en: "Reserve recurring sprint capacity for security engineering tasks.",
          pl: "Zarezerwuj stałe capacity sprintu na zadania security engineering."
        },
        kpi: {
          en: "At least 15% engineering capacity for quality/security work.",
          pl: "Minimum 15% capacity zespołu na quality/security."
        },
        tools: ["jira"]
      },
      {
        id: "prep_threat_reporting",
        text: {
          en: "Is there a clear threat and incident reporting workflow with SLA?",
          pl: "Czy zespół ma jasny workflow raportowania zagrożeń i incydentów wraz z SLA?"
        },
        weight: 4,
        cause: {
          en: "Reporting paths are unclear and rely on personal communication.",
          pl: "Ścieżki raportowania są niejasne i oparte na komunikacji ad hoc."
        },
        effect: {
          en: "Threat triage is delayed and blast radius increases.",
          pl: "Triage zagrożeń się opóźnia, a skala skutków rośnie."
        },
        action: {
          en: "Define one incident intake channel, triage flow, and escalation SLA.",
          pl: "Zdefiniuj jeden kanał zgłoszeń, flow triage i SLA eskalacji."
        },
        kpi: {
          en: "Average threat triage time below 48 hours.",
          pl: "Średni czas triage zgłoszenia poniżej 48h."
        },
        tools: ["runbooks", "jira"]
      },
      {
        id: "prep_privacy",
        text: {
          en: "Are privacy and regulatory controls included from kickoff?",
          pl: "Czy wymagania prywatności i regulacyjne są uwzględniane od kickoffu?"
        },
        weight: 3,
        cause: {
          en: "Privacy impact is reviewed too late in the lifecycle.",
          pl: "Wpływ na prywatność jest oceniany zbyt późno w cyklu życia."
        },
        effect: {
          en: "Release delays and compliance risk increase close to go-live.",
          pl: "Rośnie ryzyko compliance i opóźnień release blisko go-live."
        },
        action: {
          en: "Add privacy-by-design checks to project kickoff and scope review.",
          pl: "Dodaj privacy-by-design checklist do kickoffu i przeglądu zakresu."
        },
        kpi: {
          en: "No release without privacy impact review.",
          pl: "0 release bez przeglądu privacy impact."
        },
        tools: ["owaspAsvs", "nistRmf"]
      }
    ]
  },
  {
    id: "requirements",
    title: { en: "2. Requirements, Business and Security", pl: "2. Wymagania, biznes i bezpieczeństwo" },
    objective: {
      en: "Define verifiable functional and security requirements linked to risk impact.",
      pl: "Zdefiniuj weryfikowalne wymagania funkcjonalne i bezpieczeństwa powiązane z wpływem ryzyka."
    },
    links: stageGuideLinks.requirements,
    questions: [
      {
        id: "req_documented",
        text: {
          en: "Are requirements documented with measurable acceptance criteria?",
          pl: "Czy wymagania są udokumentowane i mają mierzalne kryteria akceptacji?"
        },
        weight: 5,
        cause: {
          en: "Requirements are interpreted differently across roles.",
          pl: "Wymagania są różnie interpretowane przez role w zespole."
        },
        effect: {
          en: "Implementation drift and rework increase.",
          pl: "Rośnie rozjazd implementacji i koszt poprawek."
        },
        action: {
          en: "Enforce a user-story template with explicit acceptance criteria.",
          pl: "Wymuś szablon user story z jawnymi kryteriami akceptacji."
        },
        kpi: { en: "100% stories include acceptance criteria.", pl: "100% stories ma Acceptance Criteria." },
        tools: ["jira", "githubProjects"]
      },
      {
        id: "req_security_nonfunctional",
        text: {
          en: "Are non-functional security requirements treated as mandatory?",
          pl: "Czy niefunkcjonalne wymagania security są traktowane jako obowiązkowe?"
        },
        weight: 4,
        cause: {
          en: "Security requirements are optional in refinement and planning.",
          pl: "Wymagania bezpieczeństwa są opcjonalne w refinement i planowaniu."
        },
        effect: {
          en: "Critical controls are skipped under delivery pressure.",
          pl: "Pod presją dostarczania pomijane są krytyczne kontrole."
        },
        action: {
          en: "Add security criteria to DoR and DoD.",
          pl: "Dodaj kryteria bezpieczeństwa do DoR i DoD."
        },
        kpi: {
          en: "0 stories without explicit non-functional requirements.",
          pl: "0 story bez jawnych wymagań niefunkcjonalnych."
        },
        tools: ["owaspAsvs"]
      },
      {
        id: "req_risk_consequences",
        text: {
          en: "Do requirements map risks to CIA impact (confidentiality, integrity, availability)?",
          pl: "Czy wymagania mapują ryzyka na wpływ CIA (confidentiality, integrity, availability)?"
        },
        weight: 4,
        cause: {
          en: "Business and technical impact is not quantified during scoping.",
          pl: "Wpływ biznesowy i techniczny nie jest kwantyfikowany podczas scope."
        },
        effect: {
          en: "Risk-based prioritization is weak and reactive.",
          pl: "Priorytetyzacja ryzyka jest słaba i reaktywna."
        },
        action: {
          en: "Add CIA impact analysis to major features and architecture changes.",
          pl: "Dodaj analizę CIA impact do kluczowych funkcji i zmian architektury."
        },
        kpi: { en: "100% epics include CIA impact section.", pl: "100% epik ma sekcję CIA impact." },
        tools: ["nistRmf", "threatModeling"]
      },
      {
        id: "req_aaa",
        text: {
          en: "Are AAA controls (authentication, authorization, accounting) explicitly defined?",
          pl: "Czy wymagania AAA (authentication, authorization, accounting) są jawnie zdefiniowane?"
        },
        weight: 4,
        cause: {
          en: "Identity and access assumptions are left implicit.",
          pl: "Założenia dot. tożsamości i dostępu pozostają niejawne."
        },
        effect: {
          en: "Authorization gaps appear late and are costly to fix.",
          pl: "Luki autoryzacji pojawiają się późno i są kosztowne w naprawie."
        },
        action: {
          en: "Define AAA requirements for all critical endpoints and actions.",
          pl: "Zdefiniuj wymagania AAA dla endpointów i operacji krytycznych."
        },
        kpi: {
          en: "100% critical endpoints have AAA requirement coverage.",
          pl: "100% krytycznych endpointów ma pokrycie wymagań AAA."
        },
        tools: ["owaspAsvs"]
      }
    ]
  },
  {
    id: "design",
    title: { en: "3. Design and Prioritize", pl: "3. Projektowanie i priorytetyzacja" },
    objective: {
      en: "Align architecture, defense selection and delivery priorities around risk.",
      pl: "Połącz architekturę, wybór zabezpieczeń i priorytety dostarczania wokół ryzyka."
    },
    links: stageGuideLinks.design,
    questions: [
      {
        id: "design_docs",
        text: {
          en: "Are architecture and security decisions documented and versioned?",
          pl: "Czy decyzje architektoniczne i security są dokumentowane i wersjonowane?"
        },
        weight: 4,
        cause: { en: "Key design decisions remain tribal knowledge.", pl: "Kluczowe decyzje projektowe pozostają wiedzą nieformalną." },
        effect: { en: "Teams reintroduce known risks and inconsistency.", pl: "Zespoły odtwarzają znane ryzyka i niespójności." },
        action: { en: "Adopt ADRs and update architecture diagrams on change.", pl: "Wprowadź ADR i aktualizuj diagramy przy zmianach." },
        kpi: { en: "100% critical decisions have ADR records.", pl: "100% kluczowych decyzji ma ADR." },
        tools: ["githubProjects"]
      },
      {
        id: "design_threat_model",
        text: {
          en: "Do you run threat modeling for major features and integrations?",
          pl: "Czy uruchamiacie threat modeling dla kluczowych funkcji i integracji?"
        },
        weight: 5,
        cause: { en: "Threat scenarios are discovered only during testing/incidents.", pl: "Scenariusze zagrożeń są odkrywane dopiero w testach lub incydentach." },
        effect: { en: "Mitigation costs increase as delivery progresses.", pl: "Koszty mitigacji rosną wraz z postępem dostarczania." },
        action: { en: "Run lightweight threat modeling in refinement/design review.", pl: "Uruchom lekki threat modeling w refinement/design review." },
        kpi: { en: "At least one threat-model session per epic.", pl: "Minimum 1 sesja threat modeling na epik." },
        tools: ["threatModeling", "owaspAsvs"]
      },
      {
        id: "design_priority",
        text: {
          en: "Is prioritization based on both business value and security risk?",
          pl: "Czy priorytetyzacja bierze pod uwagę wartość biznesową i ryzyko bezpieczeństwa?"
        },
        weight: 3,
        cause: { en: "Backlog ranking ignores risk exposure.", pl: "Ranking backlogu pomija ekspozycję na ryzyko." },
        effect: { en: "High-risk controls are delayed by low-risk features.", pl: "Kontrole high-risk są opóźniane przez funkcje low-risk." },
        action: { en: "Use a shared impact-vs-risk scoring model.", pl: "Stosuj wspólny model scoringu impact-vs-risk." },
        kpi: { en: "Every initiative includes impact/risk score.", pl: "Każda inicjatywa ma score impact/risk." },
        tools: ["jira"]
      },
      {
        id: "design_change_management",
        text: {
          en: "Do design changes trigger risk and documentation updates?",
          pl: "Czy zmiany projektowe uruchamiają aktualizację ryzyk i dokumentacji?"
        },
        weight: 4,
        cause: { en: "Change impact is not consistently evaluated.", pl: "Wpływ zmian nie jest oceniany konsekwentnie." },
        effect: { en: "Undocumented changes create hidden failure points.", pl: "Nieudokumentowane zmiany tworzą ukryte punkty awarii." },
        action: { en: "Add mandatory change-impact checks in PR/review workflow.", pl: "Dodaj obowiązkowy check change-impact w PR/review." },
        kpi: { en: "0 high-impact changes without updated docs.", pl: "0 zmian high-impact bez aktualizacji dokumentacji." },
        tools: ["githubProjects", "nistRmf"]
      }
    ]
  },
  {
    id: "implementation",
    title: { en: "4. Implementation", pl: "4. Implementacja" },
    objective: {
      en: "Implement features securely and consistently using standards and peer review.",
      pl: "Implementuj funkcje bezpiecznie i spójnie, opierając się o standardy i peer review."
    },
    links: stageGuideLinks.implementation,
    questions: [
      {
        id: "impl_coding_standard",
        text: {
          en: "Are secure coding standards defined and enforced?",
          pl: "Czy standardy secure coding są zdefiniowane i egzekwowane?"
        },
        weight: 4,
        cause: { en: "Code quality and security expectations vary by developer.", pl: "Oczekiwania jakościowe i security różnią się między developerami." },
        effect: { en: "Defects and vulnerabilities escape into later stages.", pl: "Defekty i podatności przechodzą do późniejszych etapów." },
        action: { en: "Use secure coding checklist and quality gate on PRs.", pl: "Użyj checklisty secure coding i quality gate na PR." },
        kpi: { en: "100% PRs pass quality gate.", pl: "100% PR przechodzi quality gate." },
        tools: ["owaspCheatSheets", "semgrep"]
      },
      {
        id: "impl_code_review",
        text: {
          en: "Is every PR reviewed by at least one additional engineer?",
          pl: "Czy każdy PR jest reviewowany przez co najmniej jedną dodatkową osobę?"
        },
        weight: 4,
        cause: { en: "Single-person merges bypass shared quality control.", pl: "Merge wykonywany przez jedną osobę omija wspólną kontrolę jakości." },
        effect: { en: "Critical mistakes reach main branch faster.", pl: "Krytyczne błędy szybciej trafiają do głównej gałęzi." },
        action: { en: "Enforce branch protection and required reviews.", pl: "Wymuś branch protection i wymagane review." },
        kpi: { en: "0 merges to main without review.", pl: "0 merge do main bez review." },
        tools: ["githubActions"]
      },
      {
        id: "impl_secrets",
        text: {
          en: "Are secrets managed safely outside source control?",
          pl: "Czy sekrety są zarządzane bezpiecznie poza repozytorium kodu?"
        },
        weight: 5,
        cause: { en: "Secrets handling is manual and inconsistent.", pl: "Obsługa sekretów jest manualna i niespójna." },
        effect: { en: "Credential leaks and incident response load increase.", pl: "Rośnie ryzyko wycieku poświadczeń i obciążenie incydentami." },
        action: { en: "Adopt secret manager and secret scanning controls.", pl: "Wdroż manager sekretów oraz secret scanning." },
        kpi: { en: "0 secret leakage incidents.", pl: "0 incydentów wycieku sekretów." },
        tools: ["vault", "codeql"]
      },
      {
        id: "impl_reproducible",
        text: {
          en: "Are development environments reproducible across the team?",
          pl: "Czy środowiska developerskie są odtwarzalne i spójne dla zespołu?"
        },
        weight: 3,
        cause: { en: "Environment drift introduces hidden behavior differences.", pl: "Drift środowisk powoduje ukryte różnice zachowania." },
        effect: { en: "Bug reproduction and onboarding become slow.", pl: "Reprodukcja błędów i onboarding są wolniejsze." },
        action: { en: "Standardize local environments using containerized setup.", pl: "Ustandaryzuj lokalne środowiska przez konteneryzację." },
        kpi: { en: "New engineer onboarding under one day.", pl: "Onboarding nowej osoby < 1 dzień." },
        tools: ["docker"]
      }
    ]
  },
  {
    id: "testing",
    title: { en: "5. Testing", pl: "5. Testowanie" },
    objective: {
      en: "Validate functionality and security continuously through automation and security checks.",
      pl: "Weryfikuj funkcjonalność i bezpieczeństwo ciągle przez automatyzację i testy security."
    },
    links: stageGuideLinks.testing,
    questions: [
      {
        id: "test_automation",
        text: {
          en: "Do automated unit/integration/e2e tests run in CI?",
          pl: "Czy automatyczne testy unit/integration/e2e uruchamiają się w CI?"
        },
        weight: 4,
        cause: { en: "Regression checks depend on manual execution.", pl: "Kontrola regresji zależy od manualnego wykonania." },
        effect: { en: "Release confidence drops and defects escape.", pl: "Spada pewność release, a defekty przechodzą dalej." },
        action: { en: "Build a minimal automated test pyramid and CI quality gates.", pl: "Zbuduj minimalną piramidę testów i quality gate w CI." },
        kpi: { en: "At least 90% builds pass automated tests.", pl: "Min. 90% buildów przechodzi testy automatyczne." },
        tools: ["githubActions", "cypress", "playwright"]
      },
      {
        id: "test_sast",
        text: {
          en: "Is SAST executed automatically for every pull request?",
          pl: "Czy SAST jest uruchamiany automatycznie dla każdego pull requesta?"
        },
        weight: 5,
        cause: { en: "Code-level vulnerabilities are found too late.", pl: "Podatności w kodzie wykrywane są zbyt późno." },
        effect: { en: "Fix cost and deployment risk increase.", pl: "Rośnie koszt poprawek i ryzyko wdrożenia." },
        action: { en: "Add required SAST jobs (Semgrep/CodeQL) in PR workflow.", pl: "Dodaj wymagane joby SAST (Semgrep/CodeQL) w workflow PR." },
        kpi: { en: "100% PRs scanned by SAST.", pl: "100% PR skanowanych SAST." },
        tools: ["semgrep", "codeql"]
      },
      {
        id: "test_dast",
        text: {
          en: "Are DAST and malicious input scenarios tested regularly?",
          pl: "Czy DAST i scenariusze złośliwych danych są regularnie testowane?"
        },
        weight: 4,
        cause: { en: "Runtime attack vectors are not validated before release.", pl: "Wektory ataku runtime nie są walidowane przed release." },
        effect: { en: "Production exposure to known attack paths grows.", pl: "Rośnie ekspozycja produkcji na znane ścieżki ataku." },
        action: { en: "Schedule DAST scans and include input-abuse test suites.", pl: "Uruchom cykliczne skany DAST i zestawy testów input-abuse." },
        kpi: { en: "At least one DAST scan per release.", pl: "Co najmniej 1 skan DAST na release." },
        tools: ["zap"]
      },
      {
        id: "test_environment",
        text: {
          en: "Do you test in an environment close to production?",
          pl: "Czy testujecie na środowisku zbliżonym do produkcji?"
        },
        weight: 3,
        cause: { en: "Test and production environments drift over time.", pl: "Środowiska test i produkcja rozjeżdżają się w czasie." },
        effect: { en: "Late-stage failures appear after deployment.", pl: "Błędy pojawiają się dopiero po wdrożeniu." },
        action: { en: "Standardize test environments with containers and IaC checks.", pl: "Ustandaryzuj test env przez kontenery i kontrole IaC." },
        kpi: { en: "0 critical prod-vs-test mismatches.", pl: "0 krytycznych rozjazdów prod-vs-test." },
        tools: ["docker", "trivy"]
      }
    ]
  },
  {
    id: "deployment",
    title: { en: "6. Deployment", pl: "6. Wdrożenie" },
    objective: {
      en: "Release only tested artifacts with protected access and secure configuration.",
      pl: "Wdrażaj wyłącznie przetestowane artefakty z kontrolą dostępu i bezpieczną konfiguracją."
    },
    links: stageGuideLinks.deployment,
    questions: [
      {
        id: "dep_only_tested",
        text: {
          en: "Is deployment blocked when tests or security gates fail?",
          pl: "Czy deployment jest blokowany, gdy testy lub security gate nie przejdą?"
        },
        weight: 5,
        cause: { en: "Release process allows bypassing quality controls.", pl: "Proces release dopuszcza omijanie kontroli jakości." },
        effect: { en: "Unverified changes reach production.", pl: "Nieweryfikowane zmiany trafiają na produkcję." },
        action: { en: "Enforce hard quality gates in release pipelines.", pl: "Wymuś twarde quality gate w pipeline'ach release." },
        kpi: { en: "0 deployments with failed quality gates.", pl: "0 deploymentów z czerwonym quality gate." },
        tools: ["githubActions", "gitlabCI"]
      },
      {
        id: "dep_branch_strategy",
        text: {
          en: "Is there a clear branch strategy with tested rollback paths?",
          pl: "Czy istnieje jasna strategia branch/release oraz przetestowany rollback?"
        },
        weight: 3,
        cause: { en: "Release ownership and rollback logic are ambiguous.", pl: "Ownership release i logika rollbacku są niejednoznaczne." },
        effect: { en: "Incident recovery takes too long.", pl: "Odzyskiwanie po incydencie trwa zbyt długo." },
        action: { en: "Define release train and automate rollback workflow.", pl: "Zdefiniuj release train i automatyzuj rollback workflow." },
        kpi: { en: "MTTR after failed deploy below 30 minutes.", pl: "MTTR po nieudanym deployu < 30 min." },
        tools: ["githubActions"]
      },
      {
        id: "dep_secrets_config",
        text: {
          en: "Are production secrets and configuration managed securely?",
          pl: "Czy sekrety i konfiguracja produkcyjna są zarządzane bezpiecznie?"
        },
        weight: 5,
        cause: { en: "Secrets are embedded in runtime configs or scripts.", pl: "Sekrety są osadzane w konfiguracji runtime lub skryptach." },
        effect: { en: "Credential exposure and unauthorized access risk grow.", pl: "Rośnie ryzyko ekspozycji poświadczeń i nieautoryzowanego dostępu." },
        action: { en: "Move all secrets to a dedicated secret manager and audit access.", pl: "Przenieś sekrety do dedykowanego managera i audytuj dostępy." },
        kpi: { en: "100% secrets managed outside source repositories.", pl: "100% sekretów poza repozytorium kodu." },
        tools: ["vault"]
      },
      {
        id: "dep_least_privilege",
        text: {
          en: "Are deployment and environment permissions aligned with least privilege?",
          pl: "Czy uprawnienia deployment i środowisk są zgodne z least privilege?"
        },
        weight: 4,
        cause: { en: "Permissions are broad and rarely reviewed.", pl: "Uprawnienia są szerokie i rzadko przeglądane." },
        effect: { en: "Compromised accounts can cause larger damage.", pl: "Przejęte konta mogą spowodować większe szkody." },
        action: { en: "Run periodic permission review and enforce role-based access.", pl: "Wprowadź cykliczny przegląd uprawnień i role-based access." },
        kpi: { en: "0 stale over-privileged accounts older than 90 days.", pl: "0 kont z nadmiarowymi uprawnieniami > 90 dni." },
        tools: ["nistRmf"]
      }
    ]
  },
  {
    id: "authorise",
    title: { en: "7. Authorize", pl: "7. Autoryzacja decyzji" },
    objective: {
      en: "Make risk acceptance decisions at the right accountability level.",
      pl: "Podejmuj decyzje akceptacji ryzyka na właściwym poziomie odpowiedzialności."
    },
    links: stageGuideLinks.authorise,
    questions: [
      {
        id: "auth_risk_owner",
        text: {
          en: "Are high-risk acceptance decisions formally signed by accountable leaders?",
          pl: "Czy decyzje akceptacji ryzyka high-risk są formalnie podpisywane przez odpowiedzialnych liderów?"
        },
        weight: 5,
        cause: { en: "Risk acceptance happens informally in delivery channels.", pl: "Akceptacja ryzyka odbywa się nieformalnie w kanałach delivery." },
        effect: { en: "Governance quality drops and accountability is blurred.", pl: "Spada jakość governance i rozmywa się odpowiedzialność." },
        action: { en: "Maintain formal risk register with signed acceptance records.", pl: "Prowadź formalny rejestr ryzyk z podpisanymi decyzjami." },
        kpi: { en: "100% high risks have signed owner decision.", pl: "100% ryzyk wysokich ma podpisaną decyzję ownera." },
        tools: ["nistRmf", "jira"]
      },
      {
        id: "auth_expert_board",
        text: {
          en: "Do technical and security experts participate in authorization reviews?",
          pl: "Czy eksperci techniczni i security biorą udział w review autoryzacyjnym?"
        },
        weight: 4,
        cause: { en: "Authorization decisions are made without full technical context.", pl: "Decyzje autoryzacyjne zapadają bez pełnego kontekstu technicznego." },
        effect: { en: "Accepted risk profile is disconnected from system reality.", pl: "Akceptowany profil ryzyka nie odzwierciedla realiów systemu." },
        action: { en: "Create a lightweight review board (tech lead + security + product).", pl: "Stwórz lekki review board (tech lead + security + product)." },
        kpi: { en: "100% high-risk changes pass review board.", pl: "100% zmian high-risk przechodzi review board." },
        tools: ["jira", "githubProjects"]
      },
      {
        id: "auth_dev_escalation",
        text: {
          en: "Can engineers formally escalate security concerns with response SLA?",
          pl: "Czy engineerowie mogą formalnie eskalować obawy security z ustalonym SLA odpowiedzi?"
        },
        weight: 3,
        cause: { en: "Escalation depends on hierarchy and informal influence.", pl: "Eskalacja zależy od hierarchii i nieformalnego wpływu." },
        effect: { en: "Critical concerns remain unresolved or delayed.", pl: "Krytyczne obawy pozostają bez rozwiązania lub są opóźniane." },
        action: { en: "Add formal escalation path with decision-response SLA.", pl: "Dodaj formalną ścieżkę eskalacji z SLA odpowiedzi decyzyjnej." },
        kpi: { en: "All escalations answered within 3 business days.", pl: "Każda eskalacja ma odpowiedź <= 3 dni robocze." },
        tools: ["runbooks"]
      },
      {
        id: "auth_risk_tolerance",
        text: {
          en: "Are authorization decisions aligned with declared risk appetite?",
          pl: "Czy decyzje autoryzacyjne są zgodne z deklarowanym apetytem na ryzyko?"
        },
        weight: 4,
        cause: { en: "Risk appetite thresholds are undefined or not communicated.", pl: "Progi apetytu na ryzyko są niezdefiniowane lub niekomunikowane." },
        effect: { en: "Risk decisions become inconsistent between teams.", pl: "Decyzje ryzyka stają się niespójne między zespołami." },
        action: { en: "Define and publish risk appetite thresholds by system type.", pl: "Zdefiniuj i opublikuj progi risk appetite per typ systemu." },
        kpi: { en: "0 out-of-policy risk acceptances without exception record.", pl: "0 decyzji poza policy bez exception record." },
        tools: ["nistRmf"]
      }
    ]
  },
  {
    id: "monitoring",
    title: { en: "8. Monitoring and Maintenance", pl: "8. Monitoring i utrzymanie" },
    objective: {
      en: "Sustain security posture with continuous monitoring, feedback loops and adaptation.",
      pl: "Utrzymuj poziom bezpieczeństwa przez ciągły monitoring, pętle feedbacku i adaptację."
    },
    links: stageGuideLinks.monitoring,
    questions: [
      {
        id: "mon_observability",
        text: {
          en: "Does observability cover critical business and security flows?",
          pl: "Czy observability obejmuje krytyczne flow biznesowe i bezpieczeństwa?"
        },
        weight: 5,
        cause: { en: "Key service signals are missing or not actionable.", pl: "Brakuje kluczowych sygnałów usług lub nie są one akcyjne." },
        effect: { en: "Incidents are detected too late and remediation slows down.", pl: "Incydenty wykrywane są zbyt późno, a remediacja spowalnia." },
        action: { en: "Define SLI/SLO and alerting for critical user journeys.", pl: "Zdefiniuj SLI/SLO i alerting dla krytycznych ścieżek użytkownika." },
        kpi: { en: "100% critical flows monitored with actionable alerts.", pl: "100% krytycznych flow ma monitoring i alerty." },
        tools: ["prometheus", "grafana", "sentry"]
      },
      {
        id: "mon_feedback_loop",
        text: {
          en: "Is user and team feedback converted into prioritized improvements?",
          pl: "Czy feedback użytkowników i zespołu jest zamieniany na priorytetyzowane usprawnienia?"
        },
        weight: 3,
        cause: { en: "Feedback is collected but not closed with delivery actions.", pl: "Feedback jest zbierany, ale nie zamykany działaniami delivery." },
        effect: { en: "Recurring issues persist across releases.", pl: "Powtarzające się problemy przechodzą między release'ami." },
        action: { en: "Run recurring backlog triage for incidents and defects.", pl: "Uruchom cykliczny triage backlogu incydentów i defektów." },
        kpi: { en: "Action items from each review completed in sprint cycle.", pl: "Co sprint zamykane są action items z przeglądu." },
        tools: ["jira"]
      },
      {
        id: "mon_external_threats",
        text: {
          en: "Do you monitor external threat intelligence and adapt controls?",
          pl: "Czy monitorujesz zewnętrzne threat intelligence i dostosowujesz kontrole?"
        },
        weight: 4,
        cause: { en: "External threat changes are not integrated into operations.", pl: "Zmiany zagrożeń zewnętrznych nie są integrowane z operacjami." },
        effect: { en: "Existing controls become outdated against emerging attacks.", pl: "Istniejące kontrole stają się nieaktualne wobec nowych ataków." },
        action: { en: "Schedule threat-intel review and update controls on cadence.", pl: "Wprowadź cykliczny threat-intel review i aktualizacje kontroli." },
        kpi: { en: "Control updates after critical threat in <=14 days.", pl: "Aktualizacja kontroli po nowym zagrożeniu <=14 dni." },
        tools: ["owaspCheatSheets", "nistRmf"]
      },
      {
        id: "mon_continuous_improvement",
        text: {
          en: "Is maintenance planned proactively, not only incident-driven?",
          pl: "Czy maintenance jest planowany proaktywnie, a nie tylko po incydentach?"
        },
        weight: 4,
        cause: { en: "Maintenance is handled only when something breaks.", pl: "Maintenance jest realizowany tylko, gdy coś się zepsuje." },
        effect: { en: "System reliability and security posture degrade over time.", pl: "Niezawodność systemu i poziom bezpieczeństwa spadają z czasem." },
        action: { en: "Reserve recurring sprint capacity for maintenance and hardening.", pl: "Zarezerwuj stałe capacity sprintu na maintenance i hardening." },
        kpi: { en: "At least 20% sprint capacity for maintenance/security backlog.", pl: "Min. 20% sprintu na maintenance/security backlog." },
        tools: ["jira", "githubProjects"]
      }
    ]
  }
];

export const DEFAULT_TEAM_PROFILE = {
  projectName: "New project",
  teamSize: "6-10",
  deliveryModel: "agile",
  releaseCadence: "weekly"
};
