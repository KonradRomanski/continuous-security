export const RESPONSE_SCALE = [
  { value: 0, label: "Nie istnieje", hint: "Brak praktyki lub procesu" },
  { value: 1, label: "Ad hoc", hint: "Dziala nieregularnie i bez standardu" },
  { value: 2, label: "Powtarzalne", hint: "Jest standard, ale nie wszedzie" },
  { value: 3, label: "Zintegrowane", hint: "Praktyka jest mierzona i stale ulepszana" }
];

export const TOOL_CATALOG = {
  jira: {
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    category: "Planowanie",
    note: "Backlog, workflow i SLA dla zadan"
  },
  githubProjects: {
    name: "GitHub Projects",
    url: "https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects",
    category: "Planowanie",
    note: "Lekki board dla zespolow developerskich"
  },
  threatModeling: {
    name: "OWASP Threat Modeling",
    url: "https://owasp.org/www-community/Threat_Modeling",
    category: "Projektowanie",
    note: "Wspolny jezyk do analizy zagrozen"
  },
  owaspAsvs: {
    name: "OWASP ASVS",
    url: "https://owasp.org/www-project-application-security-verification-standard/",
    category: "Wymagania",
    note: "Gotowa lista wymagan bezpieczenstwa aplikacji"
  },
  owaspCheatSheets: {
    name: "OWASP Cheat Sheet Series",
    url: "https://cheatsheetseries.owasp.org/",
    category: "Implementacja",
    note: "Praktyczne wzorce secure coding"
  },
  nistRmf: {
    name: "NIST Risk Management Framework",
    url: "https://csrc.nist.gov/projects/risk-management/about-rmf",
    category: "Ryzyko",
    note: "Model Prepare-Categorize-Select-Implement-Assess-Authorize-Monitor"
  },
  semgrep: {
    name: "Semgrep",
    url: "https://semgrep.dev/docs/",
    category: "Testing",
    note: "SAST i policy-as-code"
  },
  codeql: {
    name: "GitHub CodeQL",
    url: "https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql",
    category: "Testing",
    note: "Skanowanie podatnosci w kodzie"
  },
  zap: {
    name: "OWASP ZAP",
    url: "https://www.zaproxy.org/docs/",
    category: "Testing",
    note: "DAST i automatyczne skany aplikacji web"
  },
  cypress: {
    name: "Cypress",
    url: "https://docs.cypress.io/",
    category: "Testing",
    note: "Testy E2E i regression"
  },
  playwright: {
    name: "Playwright",
    url: "https://playwright.dev/docs/intro",
    category: "Testing",
    note: "Testy cross-browser i smoke tests"
  },
  githubActions: {
    name: "GitHub Actions",
    url: "https://docs.github.com/en/actions",
    category: "CI/CD",
    note: "Budowanie pipeline CI/CD"
  },
  gitlabCI: {
    name: "GitLab CI/CD",
    url: "https://docs.gitlab.com/ee/ci/",
    category: "CI/CD",
    note: "Automatyzacja build-test-deploy"
  },
  trivy: {
    name: "Trivy",
    url: "https://aquasecurity.github.io/trivy/latest/",
    category: "Deployment",
    note: "Skanowanie obrazow i IaC"
  },
  docker: {
    name: "Docker",
    url: "https://docs.docker.com/",
    category: "Deployment",
    note: "Standaryzacja srodowisk"
  },
  vault: {
    name: "HashiCorp Vault",
    url: "https://developer.hashicorp.com/vault/docs",
    category: "Deployment",
    note: "Bezpieczne zarzadzanie sekretami"
  },
  sentry: {
    name: "Sentry",
    url: "https://docs.sentry.io/",
    category: "Monitoring",
    note: "Monitoring bledow aplikacji"
  },
  prometheus: {
    name: "Prometheus",
    url: "https://prometheus.io/docs/introduction/overview/",
    category: "Monitoring",
    note: "Metryki i alerting"
  },
  grafana: {
    name: "Grafana",
    url: "https://grafana.com/docs/",
    category: "Monitoring",
    note: "Dashboard operacyjny i SLO"
  },
  runbooks: {
    name: "Google SRE Workbook - Incident Response",
    url: "https://sre.google/workbook/incident-response/",
    category: "Incydenty",
    note: "Runbooki i praktyki reakcji na incydenty"
  }
};

export const FRAMEWORK_STAGES = [
  {
    id: "prep",
    title: "1. Preparation and Planning",
    articleAnchor: "05-ending.tex:18",
    objective:
      "Zabezpiecz role, odpowiedzialnosci i zasoby na start projektu. Ten etap odpowiada za to, czy bezpieczenstwo jest traktowane jako element planu, a nie koszt na koniec.",
    questions: [
      {
        id: "prep_security_owner",
        text: "Czy istnieje formalny owner bezpieczenstwa (np. security lead/CISO) z realnym mandatem decyzyjnym?",
        weight: 5,
        action:
          "Wyznacz ownera bezpieczenstwa, opisz jego zakres decyzji i kanal eskalacji ryzyk.",
        kpi: "100% projektow ma jawnie przypisana role ownershipu bezpieczenstwa.",
        tools: ["jira", "githubProjects"]
      },
      {
        id: "prep_budget",
        text: "Czy security ma wydzielony budzet i czas w planie sprintow?",
        weight: 4,
        action:
          "Wprowadz stala pozycje security engineering do backlogu i planowania kwartalnego.",
        kpi: "Minimum 15% capacity zespolu na zadania quality/security.",
        tools: ["jira"]
      },
      {
        id: "prep_threat_reporting",
        text: "Czy zespol ma zdefiniowany proces raportowania zagrozen i incydentow?",
        weight: 4,
        action: "Stworz prosty proces reportingu zagrozen (formularz, SLA, triage).",
        kpi: "Sredni czas triage zgloszenia < 48h.",
        tools: ["runbooks", "jira"]
      },
      {
        id: "prep_privacy",
        text: "Czy wymagania prywatnosci i regulacyjne (np. GDPR) sa uwzglednione od startu?",
        weight: 3,
        action:
          "Dodaj privacy-by-design checklist do kickoffu i review wymagan.",
        kpi: "0 release bez przegladu privacy impact.",
        tools: ["owaspAsvs", "nistRmf"]
      }
    ]
  },
  {
    id: "requirements",
    title: "2. Requirements, Business and Security",
    articleAnchor: "05-ending.tex:92",
    objective:
      "Zbierz i waliduj wymagania funkcjonalne oraz niefunkcjonalne (security, wydajnosc, compliance).",
    questions: [
      {
        id: "req_documented",
        text: "Czy wymagania sa spisane i mierzalne (z kryteriami akceptacji)?",
        weight: 5,
        action:
          "Ujednolic format user story: cel, kryteria akceptacji, wymagania security.",
        kpi: "100% stories ma Acceptance Criteria.",
        tools: ["jira", "githubProjects"]
      },
      {
        id: "req_security_nonfunctional",
        text: "Czy wymagania security/non-functional sa traktowane jako MUST, a nie opcja?",
        weight: 4,
        action: "Wprowadz definicje DoR/DoD zawierajaca kryteria security i privacy.",
        kpi: "0 story bez jawnych wymagan niefunkcjonalnych.",
        tools: ["owaspAsvs"]
      },
      {
        id: "req_risk_consequences",
        text: "Czy zespol mapuje ryzyka do konsekwencji utraty CIA (confidentiality, integrity, availability)?",
        weight: 4,
        action: "Dodaj analize CIA impact przy nowych funkcjach i zmianach architektury.",
        kpi: "100% epik ma sekcje CIA impact.",
        tools: ["nistRmf", "threatModeling"]
      },
      {
        id: "req_aaa",
        text: "Czy wymagania AAA (authentication, authorization, accounting) sa jawnie zdefiniowane?",
        weight: 4,
        action:
          "Dodaj standard wymagania AAA dla endpointow i operacji uprzywilejowanych.",
        kpi: "100% endpointow krytycznych ma wymagania AAA.",
        tools: ["owaspAsvs"]
      }
    ]
  },
  {
    id: "design",
    title: "3. Design and Prioritise",
    articleAnchor: "05-ending.tex:135",
    objective:
      "Lacz projektowanie architektury z wyborem zabezpieczen i priorytetyzacja biznes+security.",
    questions: [
      {
        id: "design_docs",
        text: "Czy architektura i decyzje security sa dokumentowane i wersjonowane?",
        weight: 4,
        action: "Wprowadz ADR oraz diagramy aktualizowane przy kazdej istotnej zmianie.",
        kpi: "100% kluczowych decyzji ma ADR.",
        tools: ["githubProjects"]
      },
      {
        id: "design_threat_model",
        text: "Czy robicie threat modeling dla nowych funkcji i integracji?",
        weight: 5,
        action: "Uruchom lekki threat modeling w refinement i design review.",
        kpi: "Minimum 1 sesja threat modeling / epik.",
        tools: ["threatModeling", "owaspAsvs"]
      },
      {
        id: "design_priority",
        text: "Czy priorytetyzacja laczy wymagania biznesowe i security (np. MoSCoW)?",
        weight: 3,
        action: "Dodaj wspolny scoring wartosc-biznesowa x ryzyko-security.",
        kpi: "Kazda inicjatywa ma score impact/risk.",
        tools: ["jira"]
      },
      {
        id: "design_change_management",
        text: "Czy zmiany projektu maja formalny proces aktualizacji dokumentacji i ryzyk?",
        weight: 4,
        action: "Wprowadz checkpoint " +
          "\"change impact\" w PR i review architektury.",
        kpi: "0 zmian high-impact bez update dokumentacji.",
        tools: ["githubProjects", "nistRmf"]
      }
    ]
  },
  {
    id: "implementation",
    title: "4. Implementation",
    articleAnchor: "05-ending.tex:173",
    objective:
      "Przekladaj projekt na kod i infrastrukturze zgodnie z planem, standardami i review.",
    questions: [
      {
        id: "impl_coding_standard",
        text: "Czy macie i egzekwujecie standardy kodowania i secure coding?",
        weight: 4,
        action: "Wprowadz secure coding checklist + quality gate w PR.",
        kpi: "100% PR przechodzi quality gate.",
        tools: ["owaspCheatSheets", "semgrep"]
      },
      {
        id: "impl_code_review",
        text: "Czy kazdy PR jest recenzowany przez co najmniej jedna dodatkowa osobe?",
        weight: 4,
        action: "Ustaw branch protection i wymagane review przed merge.",
        kpi: "0 merge do main bez review.",
        tools: ["githubActions"]
      },
      {
        id: "impl_secrets",
        text: "Czy sekrety sa zarzadzane bezpiecznie (brak sekretow w repo i .env w git)?",
        weight: 5,
        action: "Wdrozenie secret management oraz secret scanning.",
        kpi: "0 incydentow wycieku sekretow.",
        tools: ["vault", "codeql"]
      },
      {
        id: "impl_reproducible",
        text: "Czy srodowiska developerskie sa reprodukowalne i spojne?",
        weight: 3,
        action: "Konteneryzuj serwisy i standaryzuj lokalny setup deweloperski.",
        kpi: "Onboarding nowej osoby < 1 dzien.",
        tools: ["docker"]
      }
    ]
  },
  {
    id: "testing",
    title: "5. Testing",
    articleAnchor: "05-ending.tex:207",
    objective:
      "Testuj funkcjonalnosc i bezpieczenstwo na kazdym poziomie, wlaczajac testy automatyczne.",
    questions: [
      {
        id: "test_automation",
        text: "Czy macie automatyczne testy (unit/integration/e2e) uruchamiane w CI?",
        weight: 4,
        action: "Utworz minimalny zestaw smoke + regresja + testy krytycznych sciezek.",
        kpi: "Min. 90% buildow przechodzi automatyczne testy.",
        tools: ["githubActions", "cypress", "playwright"]
      },
      {
        id: "test_sast",
        text: "Czy SAST jest uruchamiany automatycznie dla kazdego PR?",
        weight: 5,
        action: "Dodaj Semgrep/CodeQL jako wymagany job przed merge.",
        kpi: "100% PR skanowanych SAST.",
        tools: ["semgrep", "codeql"]
      },
      {
        id: "test_dast",
        text: "Czy DAST i testy input validation sa regularnie wykonywane?",
        weight: 4,
        action: "Dodaj zaplanowane skany OWASP ZAP i testy przypadkow zlosliwych danych.",
        kpi: "Co najmniej 1 skan DAST na release.",
        tools: ["zap"]
      },
      {
        id: "test_environment",
        text: "Czy testujecie na srodowisku zblizonym do produkcji?",
        weight: 3,
        action: "Standaryzuj test env przez kontenery i IaC.",
        kpi: "0 krytycznych rozjazdow prod-vs-test.",
        tools: ["docker", "trivy"]
      }
    ]
  },
  {
    id: "deployment",
    title: "6. Deployment",
    articleAnchor: "05-ending.tex:241",
    objective:
      "Wypuszczaj tylko przetestowane artefakty, z kontrola dostepu i bezpieczna konfiguracja.",
    questions: [
      {
        id: "dep_only_tested",
        text: "Czy deployment jest blokowany, gdy testy lub skany security nie przeszly?",
        weight: 5,
        action: "Wymus quality gate w pipeline release.",
        kpi: "0 deploymentow z czerwonym quality gate.",
        tools: ["githubActions", "gitlabCI"]
      },
      {
        id: "dep_branch_strategy",
        text: "Czy istnieje jasna strategia branch/release i rollback?",
        weight: 3,
        action: "Wprowadz release train + automatyczny rollback plan.",
        kpi: "MTTR po nieudanym deploy < 30 min.",
        tools: ["githubActions"]
      },
      {
        id: "dep_secrets_config",
        text: "Czy konfiguracja i sekrety produkcyjne sa przechowywane bezpiecznie?",
        weight: 5,
        action: "Przenies sekrety do dedykowanego managera i audytuj dostepy.",
        kpi: "100% sekretow poza repozytorium kodu.",
        tools: ["vault"]
      },
      {
        id: "dep_least_privilege",
        text: "Czy dostepy do srodowisk i pipeline sa zgodne z zasada least privilege?",
        weight: 4,
        action: "Przeglad uprawnien + role-based access co kwartal.",
        kpi: "0 kont z nadmiarowymi uprawnieniami > 90 dni.",
        tools: ["nistRmf"]
      }
    ]
  },
  {
    id: "authorise",
    title: "7. Authorise",
    articleAnchor: "05-ending.tex:273",
    objective:
      "Podejmuj decyzje ryzyka na odpowiednim poziomie i dokumentuj akceptacje ryzyka.",
    questions: [
      {
        id: "auth_risk_owner",
        text: "Czy decyzje akceptacji ryzyka sa podpisywane przez osobe na odpowiednim poziomie?",
        weight: 5,
        action: "Wprowadz formalny rejestr ryzyk i podpisy decyzyjne.",
        kpi: "100% ryzyk wysokich ma decyzje ownera.",
        tools: ["nistRmf", "jira"]
      },
      {
        id: "auth_expert_board",
        text: "Czy w procesie autoryzacji biora udzial osoby techniczne i security?",
        weight: 4,
        action: "Stworz mini review board (tech lead + security + product).",
        kpi: "100% zmian high-risk ma review board.",
        tools: ["jira", "githubProjects"]
      },
      {
        id: "auth_dev_escalation",
        text: "Czy developerzy moga formalnie eskalowac obawy security?",
        weight: 3,
        action: "Dodaj kanal eskalacji z SLA i brakiem konsekwencji personalnych.",
        kpi: "Kazda eskalacja ma odpowiedz <= 3 dni robocze.",
        tools: ["runbooks"]
      },
      {
        id: "auth_risk_tolerance",
        text: "Czy decyzje sa spójne z deklarowanym poziomem apetytu na ryzyko?",
        weight: 4,
        action: "Ustal i opublikuj progi risk appetite per typ systemu.",
        kpi: "0 decyzji poza zdefiniowanym tolerance bez exception record.",
        tools: ["nistRmf"]
      }
    ]
  },
  {
    id: "monitoring",
    title: "8. Monitoring and Maintenance",
    articleAnchor: "05-ending.tex:304",
    objective:
      "Utrzymuj stale monitorowanie, petle feedbacku i adaptacje procesu po incydentach.",
    questions: [
      {
        id: "mon_observability",
        text: "Czy monitoring metryk, logow i alertow obejmuje krytyczne sciezki biznesowe?",
        weight: 5,
        action: "Zdefiniuj SLI/SLO i alerty dla krytycznych flow.",
        kpi: "100% krytycznych flow ma metryki i alerty.",
        tools: ["prometheus", "grafana", "sentry"]
      },
      {
        id: "mon_feedback_loop",
        text: "Czy feedback od userow i zespolu jest zamieniany w backlog usprawnien?",
        weight: 3,
        action: "Wprowadz regularny przeglad incydentow i bugow z planem remediacji.",
        kpi: "Co sprint zamkniete action items po przegladzie.",
        tools: ["jira"]
      },
      {
        id: "mon_external_threats",
        text: "Czy zespol monitoruje zewnetrzne informacje o zagrozeniach i reaguje na nie?",
        weight: 4,
        action: "Dodaj cykliczny threat intel review i update kontroli.",
        kpi: "SLA aktualizacji kontroli po nowym zagrozeniu <= 14 dni.",
        tools: ["owaspCheatSheets", "nistRmf"]
      },
      {
        id: "mon_continuous_improvement",
        text: "Czy proces maintenance jest planowany (proaktywny), a nie tylko reaktywny?",
        weight: 4,
        action: "Zarezerwuj stale capacity na maintenance debt i security hardening.",
        kpi: "Min. 20% sprintu na maintenance/security backlog.",
        tools: ["jira", "githubProjects"]
      }
    ]
  }
];

export const DEFAULT_TEAM_PROFILE = {
  projectName: "Nowy projekt",
  teamSize: "6-10",
  deliveryModel: "Agile",
  releaseCadence: "Co tydzien"
};
