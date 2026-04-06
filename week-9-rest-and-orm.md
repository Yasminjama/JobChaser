# Vecka 9 – REST API och Drizzle ORM

## User stories
- Som klient (frontend) vill jag kunna hämta en lista av jobb från ett REST API, så att jag kan visa tillgängliga jobbansökningar i användargränssnittet.
- Som klient vill jag kunna skapa, uppdatera och ta bort jobb via API:et, så att användare kan hantera sina jobbansökningar.
- Som klient vill jag kunna hantera användare (`users`) som är kopplade till jobb, så att varje jobbansökning kan spåras till rätt användare.

## Teknikfokus
- **REST-arkitektur** – Standard för att designa API:er
- **CRUD-endpoints i Express** – Implementera Create, Read, Update, Delete
- **Drizzle ORM** – Typesäker databashantering för TypeScript
- **Felhantering i API** – Returnera korrekta statuskoder och felmeddelanden

## Uppgift

### 1. Sätt upp Drizzle ORM i projektet
   - Installera Drizzle med `npm install drizzle-orm pg` och `npm install -D drizzle-kit @types/pg`.
   - Skapa en `db`-mapp med:
     - `schema.ts` – definiera dina tabeller (users, jobs) med Drizzle-syntax.
     - `index.ts` – exportera databasanslutningen.
   - Konfigurera `drizzle.config.ts` för migrationer.
   - Kör `npx drizzle-kit generate` för att generera migrationer.
   - Kör `npx drizzle-kit migrate` för att applicera dem på databasen.

### 2. Implementera REST-endpoints för jobs
   - Skapa en `routes/jobs.ts`-fil för att organisera dina routes.
   - Implementera alla CRUD-endpoints:
     - `GET /jobs` – Hämta alla jobb från databasen.
     - `GET /jobs/:id` – Hämta ett specifikt jobb baserat på ID.
     - `POST /jobs` – Skapa ett nytt jobb (validera inkommande data).
     - `PUT /jobs/:id` – Uppdatera alla fält på ett jobb.
     - `PATCH /jobs/:id` – Uppdatera enskilda fält på ett jobb.
     - `DELETE /jobs/:id` – Ta bort ett jobb.
   - Använd Drizzle ORM för alla databasoperationer.

### 3. Implementera endpoints för users
   - Skapa en `routes/users.ts`-fil.
   - Implementera grundläggande endpoints:
     - `GET /users` – Hämta alla användare.
     - `GET /users/:id` – Hämta en specifik användare med tillhörande jobb (via relation).
     - `POST /users` – Skapa en ny användare.
     - `DELETE /users/:id` – Ta bort en användare.
   - Använd Drizzles relationer för att hämta kopplade jobb.

### 4. Lägg till felhantering
   - Returnera korrekta HTTP-statuskoder:
     - `200 OK` – Lyckad hämtning.
     - `201 Created` – Resurs skapad.
     - `400 Bad Request` – Ogiltig indata.
     - `404 Not Found` – Resursen finns inte.
     - `500 Internal Server Error` – Serverfel.
   - Skapa tydliga felmeddelanden i JSON-format, t.ex. `{ "error": "Job not found" }`.
   - Hantera edge cases (t.ex. försök att ta bort en användare som inte finns).

### 5. Testa alla endpoints
   - Använd Thunder Client eller Postman.
   - Testa varje endpoint med olika scenarion:
     - Lyckade anrop 
     - Felaktiga ID:n (bör returnera 404).
     - Ogiltig indata (bör returnera 400).
   - Spara gärna en request-collection i repot för enkel delning.

## Teori och reflektionsfrågor

### REST-arkitektur
- Vad står REST för (Representational State Transfer) och vilka principer är viktiga?
  - **Stateless** – Varje request innehåller all nödvändig information.
  - **Uniform interface** – Konsekvent användning av HTTP-metoder och URL-struktur.
  - **Resource-based** – URL:er representerar resurser (t.ex. `/jobs`, `/users`).
- Hur bör URL-strukturen se ut i ett RESTful API?

REST (Representational State Transfer) är en arkitekturstil för att designa nätverksapplikationer.

Viktiga principer
- Stateless (Tillståndslöst): Servern sparar ingen information om tidigare förfrågningar. Varje enskilt anrop från klienten måste innehålla all data som behövs för att servern ska förstå och utföra begäran (t.ex. autentiseringstoken).

- Uniform Interface: Ett enhetligt gränssnitt. Det innebär att man använder HTTP-metoder på ett standardiserat sätt och att URL-strukturen är förutsägbar.

- Resource-based: Allt i API:et betraktas som resurser. Istället för att anropa funktioner (t.ex. /getUsers), pekar man på resurser (t.ex. /users).

URL-struktur i ett RESTful API
URL:er ska representera substantiv (resurser) i plural, inte verb (handlingar).

- Bra: GET /jobs (Hämta alla jobb), GET /jobs/123 (Hämta ett specifikt jobb).

- Dåligt: GET /getAllJobs, POST /createNewJob.

### HTTP-metoder
- Vad är skillnaden mellan de olika HTTP-metoderna?
  - **GET** – Hämta data (idempotent, ingen sidoeffekt).
  - **POST** – Skapa ny resurs.
  - **PUT** – Ersätt hela resursen.
  - **PATCH** – Uppdatera delar av resursen.
  - **DELETE** – Ta bort resurs.

Metoderna (verben) talar om för servern vad som ska göras med resursen.

GET: Hämtar data. Ska inte förändra något på servern.

POST: Skapar en helt ny resurs.

PUT: Ersätter en befintlig resurs helt. Om du missar ett fält i din request kan det fältet raderas i databasen.

PATCH: Uppdaterar endast delar av en resurs (t.ex. ändrar bara en användares e-post).

DELETE: Tar bort en resurs.
- Vad betyder "idempotent" och vilka metoder är idempotenta?
Att en metod är idempotent betyder att om du gör samma anrop flera gånger efter varandra, blir slutresultatet på servern detsamma som om du bara gjort det en gång.

Idempotenta metoder: GET, PUT, DELETE, HEAD.

Inte idempotent: POST. (Om du trycker på "Skicka" fem gånger på ett formulär som använder POST, skapas sannolikt fem kopior i databasen).

### ORM och Drizzle
- Vad är en ORM (Object-Relational Mapping) och varför används det?
En ORM fungerar som en översättare mellan JavaScript-objekt och tabellerna i en SQL-databas.
- Vilka fördelar ger Drizzle jämfört med att skriva rå SQL?
  - Typsäkerhet med TypeScript.
  Tack vare TypeScript får man hjälp av editorn att skriva rätt fältnamn och datatyper.
  - Enklare att underhålla och refaktorera.
  Man definierar sitt schema i kod. Om en ändrar ett fältnamn hittar TypeScript alla ställen där koden går sönder.
  - Skydd mot SQL-injection.
  Drizzle hanterar parameterized queries automatiskt, vilket gör det svårt för hackare att injicera skadlig SQL-kod. 
  - Automatisk hantering av relationer.
  "Automatisk hantering" betyder att en kan tänka i objekt och egenskaper (som man gör i JavaScript/TypeScript) istället för att tänka i rader och tabellkopplingar (SQL). Det minskar mängden kod man behöver skriva och minskar risken för att en glömmer bort att uppdatera en koppling någonstans.

- Vad är nackdelarna med att använda en ORM?
Abstraktionslager: Man tappar lite kontroll över den exakta SQL-koden som körs, vilket kan leda till mindre optimala frågor i sällsynta fall.

Inlärningskurva: Man måste lära dig ORM-verktygets specifika syntax utöver vanlig SQL.

### Felhantering
- Varför är korrekt felhantering viktigt i ett API?
Korrekt felhantering är avgörande för att den som bygger frontend (klienten) ska veta vad som gick fel.

- Hur bör felmeddelanden struktureras för att vara användbara för klienten?
Ett bra felmeddelande bör inte bara ge en siffra, utan ett tydligt JSON-objekt:
{ "error": "Invalid input", "message": "Email address is missing a '@' symbol." }

- Vad är skillnaden mellan klientfel (4xx) och serverfel (5xx)?
- 4xx (Klientfel): Felet ligger hos användaren eller koden som skickade förfrågan.

  - 400 Bad Request: Felaktigt formaterad data.

  - 401 Unauthorized: Du saknar behörighet/inloggning.

  - 404 Not Found: Resursen finns inte.

- 5xx (Serverfel): Klienten gjorde allt rätt, men servern kraschade eller stötte på ett oväntat problem.

  - 500 Internal Server Error: Ett generellt fel på serverns sida.

## Extrauppgifter
- Lägg till paginering på `GET /jobs` (t.ex. `?page=1&limit=10`).
- Implementera filtrering (t.ex. `GET /jobs?status=applied`).
- Lägg till validering av inkommande data med ett bibliotek som Zod.
