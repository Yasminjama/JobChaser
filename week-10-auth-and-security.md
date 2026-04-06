# Vecka 10 – Autentisering, säkerhet och JWT

## User stories
- Som användare vill jag kunna skapa ett konto (signup) och logga in (signin).
- Som inloggad användare vill jag bara kunna se och manipulera mina egna jobb.
- Som utvecklare vill jag skydda känsliga routes i API:et med autentisering.

## Teknikfokus
- Autentisering med JWT
- Lösenordshantering (hashning)
- Middleware i Express
- Grundläggande säkerhetstänk (tokens, skyddade routes)

## Uppgift
1. Skapa auth-endpoints:
   - `POST /auth/signup` – skapa en ny användare:
     - Hasha lösenordet innan det sparas i databasen.
   - `POST /auth/signin` – logga in användare:
     - Verifiera lösenord.
     - Generera och returnera en JWT.
2. Skapa middleware för auth:
   - Läser `Authorization`-header med bearer token.
   - Verifierar JWT.
   - Lägger användarinfo på `req.user` om token är giltig.
3. Skydda relevanta routes:
   - T.ex. `POST/PUT/DELETE /jobs` får bara användas av inloggade användare.
8  - Koppla skapade jobb till `req.user.id` automatiskt.
   - Filtrera `GET /jobs` så att användare endast ser sina egna jobb.
4. Koppla frontend-formulären från `/signup` och `/signin`:
   - Skicka data till backend-auth-endpoints.
   - Spara JWT i frontend (t.ex. `localStorage` eller `http-only cookie`).
   - Skicka token i `Authorization`-header vid skyddade anrop.

## Teori / reflektionsfrågor
- Hur fungerar Middleware och vad används den till?
Middleware är kod som körs på servern mellan det att en förfrågan (request) tas emot och det att det slutgiltiga svaret (response) skickas tillbaka.
   - Funktion: Den fungerar som ett filter eller en kontrollstation. En middleware kan titta på förfrågan, ändra den, eller stoppa den helt om något inte stämmer.

   - Användningsområden: * Autentisering: Kontrollera om användaren är inloggad.

      - Logging: Spara information om vem som anropar API:et.

      - Parsing: Omvandla inkommande JSON-data till JavaScript-objekt.

      - Felhantering: Fånga upp buggar innan servern kraschar.

- Vad är skillnaden mellan autentisering och auktorisering?
   - Autentisering (Vem är du?): Processen att bekräfta en användares identitet (t.ex. via användarnamn och lösenord). "Ja, detta är faktiskt Anna."

   - Auktorisering (Vad får du göra?): Processen att kontrollera vilka rättigheter en identifierad användare har. "Anna är inloggad, men har hon rättighet att radera den här databasen?"

- Vad är en JWT och vilka för- och nackdelar finns?
En JWT är ett kompakt, URL-säkert sätt att representera information som ska skickas mellan två parter. Den består av tre delar: Header, Payload (datan) och Signature. 
 - Fördelar:
   - Stateless: Servern behöver inte spara sessionen i sin databas. All info finns i token.
   - Snabb: Eftersom servern bara behöver validera signaturen går det snabbt att kontrollera inloggningen.
- Nackdelar:
   - Går inte att återkalla enkelt: Om en token stjäls är den giltig tills den går ut (expire), såvida man inte bygger komplexa svartlistningssystem.
   - Storlek: Om du sparar för mycket data i payloaden blir token stor, vilket segar ner varje HTTP-anrop.

- Vilka risker finns kring hantering av tokens i frontend?
Att spara tokens i webbläsaren innebär säkerhetsutmaningar:

1. LocalStorage: Enkelt att använda, men sårbar för XSS-attacker (Cross-Site Scripting). Om en hackare lyckas köra ett skript på din sida kan de läsa ut din token direkt.

2. Cookies: Säkrare om de sätts som HttpOnly, men då blir de istället sårbara för CSRF-attacker (Cross-Site Request Forgery).

- Varför ska lösenord aldrig sparas i klartext?
Att spara ett lösenord som "Lösenord123" direkt i databasen är en enorm säkerhetsrisk.

   - Dataintrång: Om databasen läcks får hackaren direkt tillgång till alla användares konton.

   - Återanvändning: Många använder samma lösenord på flera sidor. En läcka på din sida kan leda till att användarens e-post eller bank blir kapad.

   - Lösning: Man använder Hashing (t.ex. med bcrypt). Ett hash-algoritm gör om lösenordet till en oläslig teckensträng som inte går att vända tillbaka till det ursprungliga lösenordet. Man lägger även till "Salt" (slumpmässig data) för att göra det ännu svårare att knäcka.

## Extrauppgifter
- Implementera "refresh tokens" för att förnya utgångna access tokens.
- Lägg till lösenordsvalidering (minst 8 tecken, specialtecken, etc.).
- Implementera "glömt lösenord"-funktionalitet.
- Lägg till rate limiting på auth-endpoints för att förhindra brute force-attacker.
- Använd HttpOnly cookies istället för localStorage för säkrare tokenlagring.