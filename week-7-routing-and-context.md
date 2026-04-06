# Vecka 7 – Routing och Context

## User stories
- Som användare vill jag kunna besöka sidan `/jobs` där jag ser listan av jobb.
- Som användare vill jag kunna besöka `/signup` där det finns ett formulär för att registrera konto.
- Som användare vill jag kunna besöka `/signin` där det finns ett formulär för inloggning.
- Som användare vill jag kunna växla mellan dark mode och light mode, och se valet slå igenom på alla sidor.

## Teknikfokus
- Routing med React Router (kodbaserad routing)
- Intro till filbaserad routing (konceptuellt/TanStack Router)
- Context API
- Globalt tema (dark/light)
- React Hook Form 

## Uppgift
1. Installera och konfigurera React Router ELLER Tanstack Router i frontend-projektet.
2. Skapa följande routes:
   - `/jobs` – visar jobblistan från tidigare veckor.
   - `/signup` – visar ett registreringsformulär (ingen riktig backend-koppling ännu).
   - `/signin` – visar ett login-formulär.
3. Skapa en `Header`/`Nav`-komponent:
   - Länkar till `/jobs`, `/signup`, `/signin`.
   - Visas på alla sidor.
4. Använd React Hook Form för att hantera registrerings- och login-formuläret
4. Skapa ett Theme Context:
   - Global state för `theme` (`"light"`/`"dark"`).
   - En knapp i headern/nav som växlar tema.
   - Tillämpa tema på hela appen (val av metod beroende hur du använder CSS)


## Teori / reflektionsfrågor
- Vad menas med routing i en webapp?
Routing i en Single Page Application (SPA) innebär att man simulerar navigering mellan olika "sidor" utan att webbläsaren faktiskt laddar om hela HTML-dokumentet från servern.

Hur det fungerar: Applikationen lyssnar på ändringar i URL:en (t.ex. /about eller /contact) och renderar olika komponenter beroende på vilken sökväg som är aktiv.

Syfte: Att ge användaren känslan av en vanlig webbplats med unika URL:er som går att bokmärka eller dela, samtidigt som man behåller snabbheten hos en SPA.

- Vad är fördelar / nackdelar med kodbaserad routing vs. filbaserad?
Kodbaserad routing (t.ex. React Router):

- Fördel: Ger full kontroll och flexibilitet. Du definierar dina rutter som komponenter direkt i koden (t.ex. <Route path="/home" element={<Home />} />).

- Nackdel: Kan bli svåröverskådligt i mycket stora projekt om alla rutter samlas i en och samma fil.

Filbaserad routing (t.ex. Next.js):

- Fördel: Strukturen på dina filer i mappen pages eller app avgör automatiskt URL:en. Det är intuitivt och kräver mindre manuell konfiguration ("Convention over Configuration").

- Nackdel: Mindre flexibilitet i hur man strukturerar filer om man inte vill att de ska bli publika rutter.

- Vad är fördelarna med att använda React Hook Form?
Fördelar med React Hook Form:
Prestanda: Den minskar antalet omrenderingar eftersom den inte behöver uppdatera hela komponentens state vid varje knapptryck (uncontrolled components-principen).

Mindre kod: Man slipper skriva manuella "change handlers" för varje inputfält.

Enkel validering: Inbyggt stöd för att hantera felmeddelanden och valideringsregler direkt i register-funktionen.

- Vad är syftet med Context API?
Syftet med context API är att skapa ett sätt att dela data (ett globalt state) med flera komponenter samtidigt utan att behöva skicka ner datan manuellt genom varje nivå i komponentträdet.

- Vilket problem med props löser Context?
Context API löser problem med "Prop drilling" exempelvis. Prop drilling är när en komponent högt upp i trädet har data som en komponent långt ner behöver, måste datan skickas som props genom alla mellanliggande komponenter, även om dessa inte själva behöver datan. Detta gör koden svårunderhållen och rörig.

Lösning: Man skapar en "Provider" som wrappar komponentträdet. Valfria komponenter inuti trädet kan sedan "prenumerera" på datan direkt via en Hook (useContext), vilket gör att man "hoppar över" de mellanliggande stegen. 
Exempel: Istället för att skicka user-data från App -> Main -> Sidebar -> Profile, kan Profile hämta user direkt från en UserContext.


## Extrauppgifter
1. Implentera formulärvalidering med biblioteket Zod
2. Implementera både filbaserad routing och kodbaserad och utvärdera produktivitet och andra fördelar / nackdelar
3. Nested Routes – Skapa /jobs/:id för att visa detaljer om ett specifikt jobb
4. Använd Framer Motion eller CSS transitions för att animera sidbyten
5. Skapa ett User Context som håller koll på "inloggad" användare (simulera med localStorage)
6. Skapa en route /profile som bara är tillgänglig om användaren är "inloggad" (simulera med Context/localStorage)
7. History Navigation – Lägg till "Tillbaka"-knapp som använder browser history API
8. Skapa ett Context för toast-meddelanden (t.ex. "Jobb tillagt!" när man lägger till ett jobb)

## Bra att veta: Authentisering kommer att göras i vecka 10 med JWT. 
