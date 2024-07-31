# Documentație StarQA

StarQA este o aplicație de quiz cu suport pentru markdown, construită folosind o varietate de tehnologii moderne de dezvoltare web pentru a asigura o soluție robustă, scalabilă și ușor de întreținut. Mai jos este o listă a principalelor tehnologii și biblioteci utilizate în proiect:

- **SvelteKit**: Un framework pentru construirea aplicațiilor web de înaltă performanță prin eliminarea virtual DOM. Precum creatorul Svelte, Rich Harris, a spus "[Virtual DOM is pure overhead"](https://svelte.dev/blog/virtual-dom-is-pure-overhead)

  - `@sveltejs/kit`: Pachetul principal SvelteKit. Acest pachet oferă SSR (server side rendering) pentru un UX îmbunătățit.
  - `@sveltejs/adapter-netlify`: Adaptor pentru a implementa aplicația pe Netlify.
  - `svelte`: Framework-ul Svelte.

- **TypeScript**: Un limbaj de programare puternic tipizat care se bazează pe JavaScript. TypeScript mă ajută să evit erorile de runtime și să îmi creez 'modele' ale datelor ce sunt foarte folositoare pentru IntelliSense.

- **Vite**: Un instrument de construire rapid pentru proiecte web moderne.

- **Tailwind CSS**: Un framework CSS bazat pe utilități.

  - `tailwindcss`: Pachetul principal Tailwind CSS.
  - `shadcn-svelte`: O 'anti-bibliotecă' UI, toate componentele fiind ușor accesibile și modificabile de către utilizator. În proiectul meu, `shadcn-svelte` se află în `$lib/components/ui/*`.

- **Markdown Support**:

  - `carta-md`: Un parser și renderer pentru markdown.
  - `@cartamd/plugin-math`, `@cartamd/plugin-slash`, `@cartamd/plugin-tikz`: Pluginuri pentru extinderea capabilităților markdown.

- **Alte Biblioteci**:

  - `@iconify/svelte`: Bibliotecă de iconițe pentru Svelte. Pentru acest proiect am folosit pachetul de iconițe `mdi (material-design-icons)`.
  - `@inlang/paraglide-js` și `@inlang/paraglide-sveltekit`: Suport pentru internaționalizare, care nu este implementat complet la momentul actual.
  - `@supabase/ssr` și `@supabase/supabase-js`: Integrare Supabase pentru servicii backend.
  - `zod`: Bibliotecă pentru validarea schemelor. Schema de configurare se află în locația `$lib/config/zod-schema.ts`.

- **Instrumente de Dezvoltare**:
  - `eslint`, `eslint-config-prettier`, `eslint-plugin-svelte`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`: Instrumente pentru linting și formatarea codului.
  - `prettier`, `prettier-plugin-svelte`: Instrumente pentru formatarea codului.
  - `autoprefixer`, `postcss`: Instrumente pentru procesarea CSS.
  - `vitest`: Framework de testare.

---

# Secțiunea I.2. – Proiectarea arhitecturală

## Utilizarea corectă a paradigmelor și tehnicilor de programare

Designul arhitectural al StarQA urmează paradigmele și practicile moderne de dezvoltare web:

- **Arhitectură bazată pe componente**: Utilizarea arhitecturii bazate pe componente a Svelte pentru a construi componente UI reutilizabile și ușor de întreținut.
- **Siguranța tipurilor**: Folosirea TypeScript, cu mici excepții, pentru a asigura siguranța tipurilor și a reduce erorile la runtime.
- **Managementul stării**: Management eficient al stării folosind API-ul de context încorporat în Svelte.
- **Design Responsiv**: Asigurarea că aplicația este responsivă și funcționează bine pe diverse dispozitive folosind Tailwind CSS.
- **Internaționalizare**: Primii pași de suport pentru mai multe limbi folosind `@inlang/paraglide-js` și `@inlang/paraglide-sveltekit`.
- **Redare Markdown și LaTeX**: Oferirea suportului pentru text îmbogățit cu redare markdown folosind `carta-md` și diverse pluginuri.

---

# Secțiunea I.3. – Portabilitate

## Posibilitatea de a rula programul pe mai multe dispozitive

StarQA este proiectată să fie portabilă și poate rula pe mai multe dispozitive și platforme:

- **Compatibilitate Cross-Platform**: Aplicația poate fi implementată pe diverse platforme, inclusiv browsere web, dispozitive mobile și desktopuri prin intermediul unui browser modern.
- **Flexibilitate în Implementare**: Folosind adaptoare SvelteKit precum `@sveltejs/adapter-netlify`, aplicația poate fi ușor implementată la diferiți furnizori de hosting.
- **UI Responsiv**: Utilizarea Tailwind CSS asigură că UI-ul se adaptează la diferite dimensiuni și rezoluții ale ecranului, oferind o experiență consistentă utilizatorilor pe diverse dispozitive.

---

# Capitolul II. Implementarea aplicației

## Secțiunea II.1. – Eleganța implementării

- **Extensibilitate și reutilizabilitate**: Funcții și componente reutilizabile cu scopul de a reduce volumul de cod redundant și pentru a minimiza reimplementarea codului deja scris. De exemplu, avem fișierele `$lib/questionQueryUtils.ts`, `/home/queryUtils.ts` și `$lib/handleToast` pentru a abstractiza funcții ce necesită o implementare mai puțin elegantă din punct de vedere sintactic.
- **Încapsulare**: Ascunderea detaliilor de implementare. Un exemplu de încapsulare este în `/home/[QuizId]/+page.svelte`, unde componentele de tip media player au fost abstractizate de două ori: o dată în `+page.svelte`, și altă dată în `QuestionRenderer.svelte`. Componentele sunt stocate elegant în folderul `_components`, un folder cu denumire standard recunoscută de majoritatea programatorilor Svelte.

## Secțiunea II.2. – Testarea aplicației

- **Debugging și revizuirea codului**: Pentru acest proiect s-a utilizat extensiv testarea manuală și semi-automată, principalul scop al debuggingului fiind izolarea problemei într-un timp foarte limitat (fie problemă de frontend, backend, API și CORS). Testarea a fost bazată pe implementarea unei extensii custom pentru a decomenta anumite flaguri de debug.
- `$:` este 'eticheta' pentru interactivitate în Svelte, așa că odată ce valoarea din codul cuprins în `$:` se schimbă, toată expresia va fi rerulată. Acest lucru s-a dovedit a fi extraordinar de util în debugging.

## Secțiunea II.3. – Folosirea unui sistem de gestionare a codului

- **Versionare și colaborare**: Utilizarea Git pentru urmărirea modificărilor și colaborare. Avem două branch-uri: `master` și `beta`. Branch-ul beta a fost folosit drept un punct de întoarcere înainte de o schimbare mare în cod.

## Secțiunea II.4. – Maturitatea aplicației

- Eu consider că aplicația este în stadiu de `prerelease candidate`, ea având un sistem robust de logare și error handling, anunțare către utilizator prin notificări de tip `toast`.

## Secțiunea II.5. – Securitatea aplicației

- **Validarea intrărilor și actualizări de securitate**: Folosesc `zod` pentru a valida câmpuri, parolele sunt hash-uite by default de către `Supabase`. Pentru o posibilă vulnerabilitate există nevoia de implementare a unui sistem de sanitizare HTML dacă doresc să folosesc SSR pentru randarea de Markdown. Sistemul de server-side rendering se găsește la endpointul `api/convertMarkdown/`. Cât timp acesta nu este folosit fără sanitizare HTML, consider că aplicația este imună atacurilor XSS.

---

# Capitolul III. Interfață

## Secțiunea III.1. – Impresia generală

- **Aspect plăcut**: Aspectul este subiectiv, un lucru ce ține de gusturile fiecărei persoane. Eu consider că aplicația are un design modern, minimalist și consistent, o mare parte datorându-se `tailwind-css` și `shadcn-svelte`, și a fișierului `app.css` ce conține atât tema întunecată, cât și cea luminoasă (cu toate că proiectul nu a fost conceput cu light mode în minte).
- **Posibilitatea de a se adapta la mai multe rezoluții**: Designul este mobile first, clasă bazată pe abordare. Proiectul a fost gândit cu dimensiunile unui telefon, apoi modificat pentru desktop

.

- **Internaționalizare**: Implementare incompletă a librăriei `paraglide.js` pentru a oferi un UX mai bun, însă nu a fost implementat switch-ul de limbă, proiectul fiind tradus în proporție de ~30%, cele mai importante elemente de login și validare sunt traduse.
- **Corectitudine gramaticală**: Toate textele din interfață trebuie să fie corecte din punct de vedere gramatical și ortografic.

## Secțiunea III.2. – Ușurința în folosire

- **Interfață intuitivă**: Utilizatorii trebuie să poată naviga și utiliza aplicația fără dificultăți, chiar și fără o pregătire prealabilă.
- **Ușor de parcurs**: Interfața este foarte ușoară și intuitivă, fiecare locație fiind la aproximativ un click distanță.

---

# Capitolul IV. Conținut

## Secțiunea IV.1. – Funcționalitate, utilitate și interactivitate

- **Utilitatea funcționalităților**
- **Implicarea utilizatorului ca factor activ în procesul de învățare**: Utilizatorul este încurajat să participe la cât mai multe quizuri pentru a-și mări scorul și a face parte din leaderboard.

## Secțiunea IV.2. – Evaluare și feedback

- **Permite utilizatorului să își verifice cunoștințele**: Da, odată ce utilizatorul a terminat quizul va fi redirecționat într-o pagină unde poate să-și corecteze greșelile, el primind titlul întrebării, răspunsul său și răspunsul corect.

## Secțiunea IV.3. – Posibilitatea de a gestiona conținutul

- **Conținutul poate fi actualizat/gestionat din program**: Orice quiz creat poate fi șters de creatorul său. Funcția de actualizare lipsește din cauza unor probleme tehnice. Deci aplicația este CRuD, update-ul fiind funcțional pentru username-ul și numele de utilizator (`User icon navbar > Profile (shift+p)`). Majoritatea aplicației respectă normele W3C și a11y.

---

# Capitolul V. Originalitate

## Secțiunea V.1. – Originalitate

**Conceptul de quizuri markdown nu l-am întâlnit până acum**, iar proiectul având și funcții mai puțin originale precum conceptul de export în format `xlsx` a răspunsurilor (doar pentru creatorul quizului).

---

# Ghid de instalare pentru proiectul starQA

Acest ghid vă va ajuta să instalați și să configurați proiectul **starQA** dezvoltat în Svelte și Node.js.

### Prerequisite

- Node.js (v14 sau mai recent)
- npm (v6 sau mai recent) sau yarn
- Git

### 1. Clonarea proiectului

1. Deschideți terminalul.
2. Clonați repository-ul proiectului:

   ```sh
   git clone https://github.com/nume-utilizator/starQA.git
   ```

3. Navigați în directorul proiectului:

   ```sh
   cd starQA
   ```

### 2. Instalarea dependențelor

Puteți folosi npm sau yarn pentru a instala dependențele. Mai jos sunt pașii pentru ambele metode.

#### Cu npm

```sh
npm install
```

#### Cu yarn

```sh
yarn install
```

### 3. Configurarea variabilelor de mediu

Creați un fișier `.env` în directorul rădăcină al proiectului și adăugați următoarele variabile de mediu:

```env
VITE_PUBLIC_UNSPLASH_API_KEY=
PUBLIC_SUPABASE_URL=https://censored.supabase.co
PUBLIC_SUPABASE_ANON_KEY=
PUBLIC_UPLOAD_BUCKET=public_quiz_uploads
PUBLIC_PROFILE_PICTURES_BUCKET=profile_pictures
PUBLIC_BUCKET_PATH=https://censored.supabase.co/storage/v1/object/public/public_quiz_uploads/
```

### 4. Rularea aplicației

#### Mod dezvoltare

Pentru a rula aplicația în modul de dezvoltare, folosiți următoarea comandă:

```sh
npm run dev
```

sau

```sh
yarn dev
```

Aplicația va fi disponibilă la `http://localhost:3000`.

#### Mod producție

Pentru a rula aplicația în modul de producție, urmați acești pași:

1. Construiți aplicația:

   ```sh
   npm run build
   ```

   sau

   ```sh
   yarn build
   ```

2. Rulați aplicația:

   ```sh
   npm run start
   ```

   sau

   ```sh
   yarn start
   ```

Aplicația va fi disponibilă la `http://localhost:5000`.

### 5. Obținerea cheilor pentru variabilele de mediu

Pentru a obține cheile necesare pentru variabilele de mediu, urmați pașii specifici fiecărui serviciu:

- **VITE_PUBLIC_UNSPLASH_API_KEY**: Vizitați [Unsplash Developer API](https://unsplash.com/developers) pentru a crea o aplicație și a obține cheia API.
- **PUBLIC_SUPABASE_URL și PUBLIC_SUPABASE_ANON_KEY**: Vizitați [Supabase](https://supabase.io/), creați un proiect nou și copiați URL-ul public și cheia anonimă din setările proiectului.
- **PUBLIC_UPLOAD_BUCKET și PUBLIC_PROFILE_PICTURES_BUCKET**: Asigurați-vă că aceste bucket-uri sunt create și configurate corespunzător în proiectul Supabase.

### 6. Finalizare

După ce ați configurat toate variabilele de mediu și ați rulat aplicația, ar trebui să aveți starQA funcționând pe mașina dvs. locală. Dacă întâmpinați probleme, verificați logurile pentru erori și asigurați-vă că toate variabilele de mediu sunt setate corect.
