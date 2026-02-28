# Continuous Security Navigator

Web app do analizy dojrzalosci procesu DevSecOps i planowania usprawnien zespolowych.
Aplikacja jest oparta bezposrednio o 8-etapowy framework z materialow w katalogu `article`.

## Co dostajesz

- Ocene procesu w 8 etapach (`Preparation -> Monitoring`) na skali 0-3.
- Wynik laczny i wynik per etap (ryzyko + dojrzalosc).
- Automatyczna lista luk i roadmapa usprawnien (`MUST/SHOULD/COULD`).
- Rekomendacje narzedzi z **dzialajacymi linkami** do oficjalnych dokumentacji.
- Eksport raportu `.md` do udostepnienia w zespole lub managementowi.
- Zapis stanu w `localStorage` (mozna wracac do oceny).

## Jak to odwzorowuje artykul

Aplikacja mapuje 8 krokow frameworku z:

- `article/03-knowledge-base.tex` (Theoretical Framework)
- `article/05-ending.tex` (Practical Framework + Conclusion)

Kazdy etap zawiera:

- pytania kontrolne,
- akcje naprawcze,
- KPI,
- propozycje narzedzi,

co odpowiada strukturze `discussion + checklist + problems/solutions` z rozdzialow koncowych.

## Szybki start

Wymagania:

- Node.js 18+

Uruchomienie lokalne:

```bash
npm run dev
```

Aplikacja bedzie pod adresem:

- `http://localhost:4173`

## Testowanie (dokladna procedura)

1. Walidacja modelu danych i linkow (format + spojnosc odwolan):

```bash
npm run validate
```

2. Testy logiki analizy:

```bash
npm test
```

3. Test manualny UI:

- uruchom `npm run dev`
- wejdz na `http://localhost:4173`
- ustaw profil projektu
- wypelnij ocene 8 etapow
- sprawdz sekcje:
  - `Wyniki i rekomendacje`
  - `Top luki`
  - `Roadmapa`
  - `Rekomendowane narzedzia`
- kliknij `Eksport raportu (.md)` i zweryfikuj wygenerowany plik
- kliknij `Zapisz lokalnie`, odswiez strone, sprawdz czy dane sie utrzymuja

4. Test presetow:

- kliknij po kolei `Startup / chaos`, `Scale-up / rosnacy`, `Mature engineering`
- zweryfikuj, ze wyniki i roadmapa zmieniaja sie sensownie

## Jak uzywac, zeby aplikacja byla realnie uzyteczna

1. Zrob pierwsza ocene z 3 osobami: Tech Lead, Product, Security/DevOps.
2. Nie oceniaj "jak powinno byc", tylko "jak jest teraz".
3. Wybierz 3-5 pozycji `MUST` z roadmapy na najblizszy sprint.
4. Dla kazdej pozycji przypisz ownera i KPI.
5. Powtarzaj ocene co 2-4 tygodnie i porownuj trend wyniku lacznego.
6. Uzyj raportu `.md` jako zalacznika do retrospektywy / planowania kwartalnego.

To jest zgodne z duchem artykulu: proces ma byc **ciagly**, a nie jednorazowy.

## Deployment na GitHub Pages

W repo sa gotowe workflow:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-pages.yml`

Kroki:

1. Wypchnij repo na GitHub i ustaw domyslna galez `main`.
2. Wejdz w `Settings -> Pages`.
3. W `Build and deployment` ustaw `Source: GitHub Actions`.
4. Wykonaj push na `main`.
5. Workflow `Deploy to GitHub Pages` opublikuje strone.

Uwaga: workflow publikuje statyczna zawartosc repo, wiec aplikacja nadaje sie idealnie pod Pages.

## Deployment na Vercel

Jesli wolisz Vercel:

1. Importuj repo do Vercel.
2. Framework preset: `Other` (to statyczna strona).
3. Build command: puste.
4. Output directory: `.`
5. Deploy.

## Struktura projektu

- `index.html` - UI
- `styles.css` - styl i responsywnosc
- `app.js` - logika UI i interakcje
- `lib/framework-data.mjs` - pytania, KPI, narzedzia, mapowanie 8 etapow
- `lib/engine.mjs` - scoring, ryzyko, findings, roadmapa, raport
- `tests/engine.test.mjs` - testy logiki
- `scripts/dev-server.mjs` - lokalny serwer bez zaleznosci
- `scripts/validate-data.mjs` - walidacja danych i linkow

## Co dalej (polecane rozszerzenia)

- Integracja z Jira API i automatyczne tworzenie ticketow z roadmapy.
- Integracja z GitHub/GitLab (metryki PR, code scanning, deployment frequency).
- Historia ocen w pliku JSON/DB i trend line w czasie.
- Export do PDF oraz dashboard dla managementu.
