# Vecka 8 – Introduktion till backend: Node.js, Express och SQL

## User stories
- Som utvecklare vill jag skapa ett backend-API för JobChaser som lagrar användare och jobbansökningar i en SQL-databas, så att data kan sparas permanent och hanteras via ett strukturerat gränssnitt.
- Som utvecklare vill jag kunna ansluta till en PostgreSQL-databas och skriva SQL-frågor direkt i min kod, så att jag får full kontroll över databasoperationerna.

## Teknikfokus
- Node.j
- Express.js
- SQL som frågespråk (SELECT, INSERT, etc.)
- SQL-databaser med fokus på PostgreSQL i Node.js-projekt
- Enklare databasmodellering

## Uppgift

### 1. Skapa ett nytt backend-projekt
   - Skapa en ny mapp för ditt backend-projekt (t.ex. `jobchaser-api` eller `server`).
   - Installera Express med `npm install express`.
   - Skapa en `index.ts`-fil som startpunkt för din server.

### 2. Designa databasmodellen för JobChaser
   - Skapa minst två tabeller: `users` och `jobs`.
   - Definiera en **one-to-many-relation**: en användare kan ha flera jobbansökningar.
   - Planera vilka kolumner varje tabell behöver (t.ex. `id`, `name`, `email` för users).
   - Skissa gärna ett enkelt ER-diagram för att visualisera relationerna.

### 3. Sätt upp en PostgreSQL-databas
   - Installera PostgreSQL lokalt 
   - Skapa en ny databas för projektet.
   - Notera anslutningsuppgifterna (host, port, användarnamn, lösenord, databasnamn).

### 4. Anslut till databasen och skriv SQL i koden
   - Installera PostgreSQL-klienten med `npm install pg`.
   - Skapa en databasanslutning i din kod med hjälp av `pg`-paketet.
   - Skapa tabellerna med `CREATE TABLE`-satser.
   - Testa grundläggande CRUD-operationer:
     - **C**reate: `INSERT INTO`
     - **R**ead: `SELECT`
     - **U**pdate: `UPDATE`
     - **D**elete: `DELETE`

### 5. Skapa en Express-server med health-check
   - Konfigurera en Express-server som lyssnar på en port (t.ex. 3000).
   - Skapa en health-check-route (`GET /health`) som returnerar `{ status: "ok" }`.
   - Verifiera att servern startar korrekt genom att besöka `http://localhost:3000/health`.

### 6. Implementera CRUD-routes för users och jobs
   - Skapa routes för alla CRUD-operationer:
     - `GET /users` – Hämta alla användare
     - `GET /users/:id` – Hämta en specifik användare
     - `POST /users` – Skapa en ny användare
     - `PUT /users/:id` – Uppdatera en användare
     - `DELETE /users/:id` – Ta bort en användare
   - Implementera motsvarande routes för `jobs`.
   - Koppla varje route till rätt SQL-fråga mot databasen.

### 7. Testa alla routes med Thunder Client eller Postman
   - Installera Thunder Client som ett tillägg i VS Code, eller använd Postman.
   - Testa varje endpoint och verifiera att rätt data returneras.
   - Kontrollera att HTTP-statuskoderna är korrekta (t.ex. 200 för OK, 201 för skapad, 404 för ej hittad).

## Teori och reflektionsfrågor

### Node.js och Express
- Vad är Node.js och hur skiljer det sig från att köra JavaScript i webbläsaren?
Node.js är en runtime-miljö som gör det möjligt att köra JavaScript på en server istället för bara i en webbläsare.
Skillnaden: I webbläsaren används JS främst för att manipulera DOM:en (utseendet). I Node.js har JS tillgång till operativsystemet, vilket innebär att det kan läsa/skriva filer, kommunicera med databaser och hantera nätverkstrafik.

- Vad är en **route** i backend-sammanhang och hur fungerar den?
En route är en specifik URL-adress (sökväg) som servern lyssnar på för att veta vilken kod som ska köras.

Hur det fungerar: När en klient (t.ex. en webbläsare) skickar en förfrågan till GET /users, letar Express upp den route-handler som matchar den adressen och skickar tillbaka rätt data.

- Vilka problem löser Express.js och varför används det istället för att bygga allt från grunden?
Att bygga en webbserver med enbart Node.js (modulen http) kräver mycket manuell kod för att tolka URL:er och paketera svar.

Express löser: Det förenklar hantering av rutter, middleware (kod som körs mellan förfrågan och svar) och serverkonfiguration. Det är ett "minimalistiskt ramverk" som sparar tid och gör koden mer organiserad.

### SQL och databaser
- Vad är SQL och vad står förkortningen för?
SQL står för Structured Query Language. SQL är standardspråket som används för att kommunicera med och hantera data i relationsdatabaser.

- Vilka är de vanligaste SQL-databaserna (PostgreSQL, MySQL, SQLite, SQL Server) och vad skiljer dem åt?
PostgreSQL: Kraftfull open-source, känd för att vara robust.

MySQL: Mycket populär, används ofta i webbutveckling (t.ex. WordPress).

SQLite: En lättviktig databas som lagras i en enda fil (bra för mobilappar eller enkla tester).

SQL Server: Microsofts egna företagsanpassade databas.

- Förstå följande databasbegrepp:
  - **Tabell** – en strukturerad samling av relaterade data.
  Ex: En samling data (t.ex. "Användare").
  - **Rad (record)** – en enskild post i tabellen
  Ex: En specifik post (t.ex. "Användaren Anna, 25 år").
  - **Kolumn (field)** – en specifik egenskap/attribut
  Ex: En kategori (t.ex. "Namn", "Ålder").
  - **Primärnyckel (primary key)** – unikt identifierande värde för varje rad
  Ex: Ett unikt ID (ofta en siffra) som ser till att vi kan skilja på två rader.
  - **Främmande nyckel (foreign key)** – referens till en primärnyckel i en annan tabell.
  Ex: En PK från en tabell som placeras i en annan tabell för att skapa en länk.
  - **Relation** – koppling mellan tabeller
  Varför: Istället för att spara all information i en enda gigantisk och rörig tabell, delar man upp informationen i mindre, logiska tabeller (t.ex. en för Kunder och en för Ordrar). Relationen ser till att databasen vet exakt vilken kund som hör till vilken order.

### Databasmodellering
- Vad är ett ER-diagram (Entity-Relationship) och varför är det användbart?
Ett ER-diagram är en ritning över databasen. Det används för att visualisera hur olika entiteter (tabeller) hänger ihop innan man börjar koda, vilket minskar risken för logiska fel.

- Förklara de tre typerna av relationer och hur de används för att skapa kopplingar mellan tabeller:
  - **One-to-one** – en post relaterar till exakt en annan post
  Ex: En person har ett pass. (Ovanligt, ofta lägger man allt i samma tabell).
  - **One-to-many** – en post kan relatera till flera andra poster
  Ex: En kund kan göra många beställningar, men varje beställning tillhör bara en kund.
  - **Many-to-many** – flera poster kan relatera till flera andra poster
  Ex: En student kan gå många kurser, och en kurs kan ha många studenter. Detta kräver en kopplingstabell (junction table) för att fungera i SQL.

### API-testning och HTTP
- Vad är syftet med verktyg som Thunder Client och Postman?
Dessa är verktyg för att testa API:er utan att behöva bygga en frontend. Du kan skicka "fejkade" förfrågningar till din server för att se att den returnerar rätt data.

- Vilka är de vanligaste HTTP-metoderna (GET, POST, PUT, DELETE) och när används de?
GET: Hämta data (t.ex. läsa ett blogginlägg).

POST: Skapa ny data (t.ex. registrera ett nytt konto).

PUT: Uppdatera befintlig data (t.ex. ändra sin profilbild).

DELETE: Ta bort data.

- Lär dig de viktigaste HTTP-statuskoderna:
  - **2xx** – Lyckade förfrågningar (200 OK, 201 Created, 204 No Content)
  Ex: Allt gick bra! 201 Created betyder att något nytt skapats.
  - **4xx** – Klientfel (400 Bad Request, 401 Unauthorized, 404 Not Found)
  Ex: Du gjorde fel. 404 Not Found betyder att sidan/datan inte finns.
  - **5xx** – Serverfel (500 Internal Server Error)
  Ex: Servern kraschade eller mår dåligt.

### SQL vs NoSQL
- Vad är skillnaden mellan en SQL-databas (relationsdatabas) och en NoSQL-databas (t.ex. MongoDB)?
SQL
Struktur: Tabeller med rader/kolumner (Strikt schema)
Relationer: Mycket bra på komplexa kopplingar
Exempel: PostgreSQL, MySQL

NoSQL
Struktur: JSON-liknande dokument (Flexibelt)
Relationer: Dålig på kopplingar, föredrar att bädda in data
Exempel:MongoDB


- I vilka situationer passar respektive databastyp bäst?
SQL passar bäst: När datan är strukturerad och relationer (kopplingar) är viktiga (t.ex. ett bank- eller bokföringssystem).

NoSQL passar bäst: När datan ändras ofta, saknar fast struktur eller vid extremt stora mängder ostrukturerad data (t.ex. realtids-analys eller innehållshantering för sociala medier).

