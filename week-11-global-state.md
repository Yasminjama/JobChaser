# Vecka 11 – Global state-hantering med useReducer och Zustand

## User stories
- Som användare vill jag kunna filtrera jobb efter flera villkor (t.ex. kategori, ort, fritext), så att jag snabbt hittar relevanta jobbansökningar.
- Som användare vill jag att mina filterinställningar och inloggningsstatus ska gälla oavsett vilken sida jag är på, så att jag slipper ställa in samma saker flera gånger.
- Som användare vill jag bli omdirigerad till inloggningssidan om jag försöker nå en skyddad sida utan att vara inloggad.
- Som utvecklare vill jag strukturera komplex state-hantering på ett tydligt och underhållbart sätt.

## Teknikfokus
- **useReducer** – Hantera komplex state-logik med actions och reducer
- **Zustand** – Lättviktigt bibliotek för globalt state
- **Auth-state** – Hantera inloggningsstatus i hela applikationen
- **Jämförelse med Context API** – Förstå skillnader och användningsområden

## Uppgift

### 1. Hantera auth-state i frontend
   - Skapa en auth-store med Zustand för att hålla koll på inloggningsstatus:
     - `user` – Den inloggade användarens information.
     - `token` – JWT-token för autentiserade API-anrop.
     - `isAuthenticated` – Boolean för att enkelt kolla inloggningsstatus.
   - Skapa actions i storen:
     - `login(user, token)` – Spara användare och token vid inloggning.
     - `logout()` – Rensa användare och token vid utloggning.
   - Persistera token i `localStorage` så att användaren förblir inloggad vid sidomladdning.
   - Visa/dölj UI-element baserat på om användaren är inloggad (t.ex. visa "Logga ut" istället för "Logga in").

### 2. Skydda routes i frontend
   - Skapa en `ProtectedRoute`-komponent som:
     - Kontrollerar om användaren är inloggad via auth-storen.
     - Redirectar till `/signin` om användaren inte är inloggad.
     - Renderar barn-komponenten om användaren är inloggad.
   - Använd `ProtectedRoute` för sidor som kräver inloggning (t.ex. skapa jobb, mina jobb).

### 3. Implementera avancerad filtrering med useReducer
   - Skapa en reducer för filter-state med actions:
     - `SET_TEXT_FILTER` – Uppdatera fritextsökning.
     - `SET_LOCATION` – Filtrera på ort.
     - `SET_CATEGORY` – Filtrera på kategori.
     - `SET_EMPLOYMENT_TYPE` – Filtrera på anställningsform.
     - `CLEAR_FILTERS` – Återställ alla filter.
   - Skapa en `FilterPanel`-komponent med inputfält för varje filter.
   - Applicera filtren på jobblistan och visa filtrerade resultat.

### 4. Skapa en Zustand-store för filtreringsinställningar
   - Flytta filter-state till en Zustand-store för global åtkomst.
   - Konsumera storen i olika komponenter:
     - `FilterPanel` – Uppdaterar filter.
     - `JobList` – Läser filter och visar filtrerade jobb.
     - `Header` – Visar antal aktiva filter (valfritt).

### 5. Behåll Theme Context
   - Låt tidigare Theme Context (dark/light mode) ligga kvar.
   - Detta visar skillnaden mellan Context API och Zustand i samma app.

## Teori och reflektionsfrågor

### Lokal vs global state
- När räcker lokal state (komponent-nivå) i React?
Lokal state (useState) räcker när datan bara behövs inom en specifik komponent eller dess närmaste barn. Exempel är om ett inputfält är ifyllt, om en meny är öppen eller om en specifik knapp har klickats på.

- Vilka problem uppstår när man behöver dela state mellan många komponenter?
När många komponenter på olika platser i trädet behöver samma data (t.ex. användarens profilbild eller valuta-inställningar) blir det svårt att synkronisera dem om de har varsin lokal state. Om man ändrar datan på ett ställe uppdateras den inte på de andra.

- Vad är "prop drilling" och varför är det problematiskt?
Detta uppstår när en tvingas skicka ner props genom flera nivåer av komponenter som själva inte använder datan, bara för att nå ett barn långt ner i trädet.

  - Varför det är problematiskt: Det gör koden svårläst, svår att underhålla och skapar ett hårt beroende mellan komponenterna. Om en ändrar datastrukturen högst upp måste en ändra i alla mellanliggande komponenter.

### useReducer
- Vad är skillnaden mellan `useState` och `useReducer`?
Skillnaden mellan useState och useReducer
  - useState: Enklare, bra för enstaka värden (strängar, siffror, enkla booleans).

  - useReducer: Mer strukturerat, används för komplex state-logik där nästa tillstånd beror på det föregående eller där flera värden hänger ihop.

- När är `useReducer` ett bättre val än `useState`?
Det är ett bättre val när en har många olika sätt att uppdatera en state (t.ex. en varukorg där en kan lägga till, ta bort, ändra antal och tömma). Istället för fem olika set-funktioner har man en central logik.
- Vad är en "action" och en "reducer" i React-sammanhang?
  - Action: Ett objekt som beskriver vad som ska hända, t.ex. { type: 'ADD_ITEM', payload: item }.

  - Reducer: En funktion som tar emot nuvarande state och en action, och returnerar ett nytt state baserat på instruktionen.

- Hur relaterar useReducer till Redux-mönstret?
useReducer använder exakt samma mönster som Redux (Actions -> Dispatcher -> Reducer -> Store). Skillnaden är att useReducer är inbyggt i React och oftast används för lokal men komplex state, medan Redux är ett externt bibliotek för hela appens globala state.

### Context API vs Zustand
- Vilka fördelar och nackdelar har Context API?
  - Fördelar: Inbyggt i React (inga extra paket), perfekt för statisk data som sällan ändras (t.ex. "Dark Mode" eller språk).

  - Nackdelar: Prestandaproblem. Om värdet i en Context ändras, renderas alla komponenter som konsumerar den om, även om de bara använder en liten del av datan.

- Vilka fördelar har ett dedikerat state management-bibliotek som Zustand?
  - Fördelar: Enklare syntax än Context (ingen "Provider-hell"), mycket snabbare prestanda eftersom komponenter bara renderas om när den specifika del av statet de "prenumererar" på ändras.

  - Struktur: Allt sparas i en "Store" utanför komponentträdet.

- När är det motiverat att införa globalt state i ett projekt?
Det är motiverat när data delas av komponenter som inte har en direkt förälder-barn-relation, eller när "prop drilling" gör koden orimligt komplex.

### Auth-state i frontend
- Varför är det viktigt att hantera auth-state globalt?
Inloggningsstatus (user, isAuthenticated) behövs nästan överallt: i headern (för att visa namn), i sidofältet (för att visa profil), och av routern (för att neka åtkomst). Genom att ha det globalt har hela appen en och samma "källa till sanning".

- Hur säkerställer man att skyddade routes verkligen är skyddade?
Man skapar ofta en ProtectedRoute-komponent som omsluter de sidor som kräver inloggning.

  - Komponenten kollar det globala auth-statet.

  - Om användaren inte är inloggad körs en Maps (redirect) till inloggningssidan.

  - Viktigt: Frontend-skydd är bara för användarvänlighet. Det riktiga skyddet sker alltid i backend genom att validera JWT-tokens vid varje API-anrop.

- Vad händer om en token går ut medan användaren är aktiv i appen?
Om en token (JWT) går ut medan användaren är aktiv, kommer nästa API-anrop att returnera 401 Unauthorized.

  - Hantering: Appen bör ha en interceptor (i t.ex. Axios) som fångar upp 401-fel, rensar det globala auth-statet och skickar användaren till inloggningen, eller försöker förnya token automatiskt med en "refresh token".

## Extrauppgifter
- Lägg till "favoritjobb" eller "sparade jobb" i Zustand-storen.
- Implementera automatisk utloggning när JWT-token går ut.
- Lägg till en "loading"-state för asynkrona operationer.
- Använd Zustand middleware för att logga state-ändringar (devtools).
