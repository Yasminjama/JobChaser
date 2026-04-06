# Vecka 5 – React-grunder 

## User stories
- Som användare vill jag kunna se en lista av jobb.
- Som användare vill jag se tydlig information om varje jobb (titel, företag, ort, typ av tjänst etc.).

## Teknikfokus
- Intro till React
- JSX
- Komponenter
- Props
- Listor


## Uppgift
1. Skapa ett nytt React-projekt (Typescript) för JobChaser med Vite.
2. Lägg till en statisk lista med jobb. Använd arrayen med objektdata i ```data.ts```. SVG-ikoner finns under ```/assets```
3. Skapa komponenter:
   - `JobList` som tar emot en lista av jobb via props och renderar dem.
   - `JobItem` som visar information om ett jobb.
4. Rendera listan av jobb i UI:
   - Använd `map` för att skapa en lista med `JobItem`-komponenter.
   - Använd semantiska HTML-element. För styling använder antingen global CSS (vanlig), CSS moduler eller Tailwind CSS
5. Implementera konditionell rendering:
   - Om listan är tom ska texten "Inga jobb" visas.


## Teori / reflektionsfrågor
Besvara kortfattat i denna fil eller i en separat `theory-week-5.md`:
- Hur och varför uppstod React?
Det skapades av utvecklare på Facebook för att lösa problem med att uppdatera användargränssnittet (dvs UI) mot data i stora applikationer där vanlig JavaScript inte räckte till. Lösningen blev att React som introducerade ett sätt att bygga gränsnitt genom att bryta ner i små, oberoende delar (komponenter) och använda en virtual DOM för att optimera prestandan. 
- Vad är JSX?
JSX står för JavaScript XML och är en syntaxutökning som gör att HTML kan hantera JavaScript. I JSX ändras vissa namn exempelvis class blir till className och for blir till htmlFor.

- Vad är en komponent i React?
Det är en återanvändbar och självständig del av användargränssnittet. I praktiken är det en funktion som returnerar JSX eller TSX. Kan vara en funktionell eller klassbaserad komponent
Funktionell: Idag skriver man oftast komponenter som vanliga JavaScript-funktioner som returnerar JSX.

Klassbaserat: Den kapslar in sin egen logik (metoder), sitt eget tillstånd (state) och sitt utseende (render-metoden).

Modularitet: Man kan bygga en button-komponent en gång och använda den överallt på ens hemsida. 

- Vad är props och hur används de?
Det är en förkortning för properties och motsvarar en funktions parametrar (indata). De fungerar som en "kommunikationskanal" från parent till child. Den gör komponenterna mer dynamiska. Props är också read-only det vill säga immutable. En komponent får aldrig ändra på sina egna props.

- Vad menas med "one-way data flow" i React? 
I React rör sig data bara i en riktning: från förälder till barn.

Detta kallas för enkelriktat dataflöde. Det gör det mycket lättare att felsöka, eftersom en alltid vet varifrån datan kommer. Om ett barn behöver skicka data uppåt, görs det oftast genom att föräldern skickar med en funktion som en prop, vilken barnet sedan "ropar på". Detta görs för att få bättre koll på datan och minska buggar

- Vad är ett komponentträd? Rita ett och hur datan går genom komponenterna.
En komponentträd är den hiearkiska strukturen av hur ens komponenter sitter ihop. Överst finns ofta en App komponent som i sin tur håller andra komponentera.

Ex: App -> CommentForm & CommentList -> Comment.

- Hur kan man använda konditionell rendering i React?
Används för att visa element om ett visst villkor är sant eller falskt. Det görs ofta med && (short circuit) eller en ternary operator (? :).

- Vad menas med en återanvändbar komponent?
En återanvändbar komponent är designad för att fungera i många olika sammanhang utan att behöva skrivas om. Kännetecknen är att den är generisk och styrs av props. Istället för att skapa en LoginButton och en SignupButton så skapar man en Button som tar emot färg och text som props. 

- Vad är React Fragment (</>)?
En React-komponent måste alltid returnera ett enskilt rotelement. Om en vill returnera två <div>-taggar bredvid varandra utan att lägga till en extra, onödig <div> i den faktiska HTML-koden, använder man ett Fragment.

Ex: <> ... </> eller <React.Fragment> ... </React.Fragment>.

