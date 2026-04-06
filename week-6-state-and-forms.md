# Vecka 6 – State, datahämtning och formulär

## User stories
- Som användare ska jag kunna filtrera jobb i listan baserat på en sökterm
- Som användare vill jag kunna se när jobben laddas in.
- Som användare ska jag kunna lägga till ett jobb via ett formulär (lagras i local state).

## Teknikfokus
- `useState`
- `useEffect` för datahämtning
- Formulär
- Kontrollerade komponenter
- Enkel loading-state

## Uppgift
1. Lägg till ett sökfält ovanför jobblistan:
   - Använd `useState` för att lagra söktermen.
   - Filtrera jobblistan baserat på söktermen (t.ex. på jobbtitel eller företag).
2. Gör sökfältet till en kontrollerad komponent:
   - Värdet styrs av state, `onChange` uppdaterar state.
3. Flytta jobbdatan till en separat JSON-fil eller en utforska ett externt API som tillhandahåller jobannsonser.
4. Använd `useEffect` för att hämta jobben:
   - Visa en loader eller texten "Laddar jobb…" medan data hämtas.
   - Hantera ev. fel (t.ex. visa ett felmeddelande).

## Teori / reflektionsfrågor
- Vad är lokalt state i React? Vad är syftet med Hook:en `useState`?
Lokalt state är data som en komponent själv äger och håller koll på. Till skillnad från vanliga variabler, kommer React att "komma ihåg" dessa värden mellan renderingar.

Syftet med useState: Det är en Hook som låter en lägga till state i en funktionell komponent. När statet uppdateras (via den medföljande setter-funktionen), tvingar det komponenten att rendera om så att användargränssnittet matchar den nya datan.

- Vad är skillnaden mellan state och props?
Props: Skickas till komponenten (som argument). De är "read-only" och komponenten kan inte ändra dem själv.

State: Hanteras inom komponenten. Komponenten kan ändra sitt eget state, vilket triggar en omrendering.

- Vad menas med en kontrollerad komponent?
En kontrollerad komponent är oftast ett formulärelement (som en <input>) där React har full kontroll över värdet.
Istället för att input-fältet själv håller koll på vad användaren skriver, läser den sitt värde från React-state och uppdaterar statet varje gång användaren skriver något (via onChange).

- Vad är en callback handler i React-sammanhang?
En callback handler är en funktion som skickas som en prop från en förälder till ett barn.

Syfte: Eftersom data bara flyter nedåt (props), används callbacks för att barnet ska kunna "prata" med föräldern, till exempel för att berätta att en knapp har klickats på så att föräldern kan uppdatera sitt state.

- Skissa och förklara komponentträdet och hur data går genom komponenterna.

- Vad menas med "lifting state up"?
När två eller flera komponenter behöver dela samma data, flyttar man statet till deras närmaste gemensamma förälder.

Varför: För att säkerställa att det bara finns en "single source of truth". Föräldern håller statet och skickar ner det som props till barnen.

- Vad är en side-effect (sidoeffekt) och vad är syftet med `useEffect`?
En side-effect är något som händer utanför Reacts normala renderingscykel. Det är saker som komponenten behöver göra som inte handlar om att bara rita upp UI:t.

Exempel: Hämta data från ett API (fetch), starta en timer eller prenumerera på en chatt-tjänst.

Syftet med useEffect: Det är en Hook som talar om för React: "Kör den här koden efter att komponenten har renderats".

- Vad är syftet med dependency-arrayen i `useEffect`?
Dependency-arrayen (den lista med variabler som skickas som andra argument till useEffect) styr när effekten ska köras igen.

[] (Tom array): Effekten körs bara en gång (vid mount/när komponenten föds).

[data] (Med variabel): Effekten körs varje gång variabeln data ändras.

Ingen array: Effekten körs vid varje omrendering (vilket man oftast vill undvika).

## Extrauppgifter
   1. Skapa ett formulär för att lägga till ett nytt jobb:
   * Kontrollerade inputs (titel, företag, ort, etc.).
   * Vid submit: lägg till jobbet i jobblistan (local state).
   * Töm formuläret efter lyckad submit.
   2. Skapa en s.k. debounce i sökrutan (fördröjning av användarens input) med biblioteket Lodash eller React `useDeferredValue` (React 19). Implementera funktionaliteten som en s.k. custom hook.
   3. Implementera autocomplete i sökrutan. Egen funktion utan extra bibliotek. Använd Hook:en `useRef`.
   4. Visa en animerad loader när jobben laddas in. Använd en fördröjning med `setTimeout` om det behövs för att den ska visas. Tips: Använd `Promise.all` som väntar på både fetch och en 1 sekunds timeout.
   5. Utforska andra alternativ för datahämtning istället för useEffect. 
   * React Query / TanStack Query 
   * SWR (Vercel)
   * use() hook (React 19)
   

