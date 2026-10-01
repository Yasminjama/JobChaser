[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/TbqMr0NN)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/TbqMr0NN)
# JobChaser 🎯

En fullstack webbapplikation för jobbsökning och ansökningshantering, byggd med React, TypeScript och Express.

| Ljust läge | Mörkt läge |
|------------|------------|
|<img width="1900" height="860" alt="image" src="https://github.com/user-attachments/assets/599e6518-2881-422b-8dc4-8624fa06d990" /> | <img width="1896" height="869" alt="image" src="https://github.com/user-attachments/assets/3546e3af-1233-4173-a531-b543664c702e" /> |

 



---

## Projektsammanfattning

JobChaser låter användare söka och filtrera jobbannonser från Jobtech Dev API, spara ansökningar till en databas och hantera sin profil med säker inloggning. Projektet är uppdelat i två delar:

- `client/` — React + TypeScript frontend
- `server/` — Express + TypeScript backend

---

## Arkitektur

Frontend och backend kommunicerar över HTTP mot Express-API:t på `http://localhost:3000`. Autentisering sker via JWT-token som skickas i `Authorization`-headern på skyddade requests.

---

## Frontend

### Tech stack
- **React 18** med TypeScript och **Vite** som byggverktyg
- **React Router v7** för klientbaserad routing
- **React Hook Form** för formulärhantering och validering
- **Zustand** för global state-hantering
- **Context API** för temainställningar (dark/light mode)
- **fetch API** för kommunikation med backend

### Sidor
| Sida | Beskrivning |
|------|-------------|
| `JobsPage` | Visar jobbannonser med filtrering och paginering |
| `MyApplicationsPage` | Visar användarens sparade ansökningar (skyddad) |
| `SignUpPage` | Registreringsformulär |
| `SignInPage` | Inloggningsformulär |

### Global state med Zustand
Applikationen använder tre Zustand-stores:

**authStore** — hanterar inloggningsstatus
- Sparar `user`, `token` och `isAuthenticated`
- Persisterar token i localStorage vid sidomladdning
- `login()` och `logout()` actions

**filterStore** — hanterar alla filter
- `textFilter`, `regionFilter`, `employmentType`, `requiresExperience`
- `clearFilters()` återställer alla filter
- Filterval bevaras vid navigering mellan sidor

**jobApplicationStore** — hanterar sparade ansökningar
- Hämtar sparade ansökningar från backend vid sidladdning
- `addApplication()` sparar ett jobb till databasen
- Håller koll på vilka jobb som redan sparats med `savedJobIds`

### Zustand vs Context API
Applikationen använder båda medvetet. Context API används för temat (dark/light mode) eftersom det är ett värde som sällan ändras. Zustand används för auth och filter eftersom de uppdateras ofta och behöver delas mellan många komponenter utan prop drilling.

### Skyddade routes
`ProtectedRoute` kontrollerar `isAuthenticated` från authStore. Om användaren inte är inloggad redirectas de automatiskt till `/signin`. `/my-applications` är skyddad medan `/jobs` är öppen för alla — men spara-funktionen kräver inloggning.

---

## Backend

### Tech stack
- **Express 4** med TypeScript
- **PostgreSQL** som databas med **Drizzle ORM**
- **JWT** (jsonwebtoken) för autentisering
- **bcrypt** för lösenordshashning
- **dotenv** för miljövariabler
- **CORS** för att tillåta frontend-anrop

### API-struktur
```
POST   /auth/signup              ← öppen
POST   /auth/signin              ← öppen, returnerar JWT-token + user

GET    /users                    ← öppen
GET    /users/:id                ← öppen
POST   /users                    ← öppen
DELETE /users/:id                ← öppen

GET    /job-applications         ← skyddad, visar bara egna ansökningar
GET    /job-applications/:id     ← skyddad, 403 om inte din
POST   /job-applications         ← skyddad, userId sätts från token
PUT    /job-applications/:id     ← skyddad
PATCH  /job-applications/:id     ← skyddad
DELETE /job-applications/:id     ← skyddad
```

### Autentisering
- Lösenord lagras krypterade med bcrypt
- Vid inloggning returneras en JWT-token med användar-id och e-post
- Token verifieras i `authMiddleware` via `Authorization: Bearer <token>`-header
- Token är giltig i 24 timmar

---

## Databas

PostgreSQL används som datalager med Drizzle ORM för typsäker databasinteraktion.

```
users
-----
id, name, email (unik), password (hashat), created_at

job_applications
----------------
id, user_id (FK → users.id), job_title, company, 
status, applied_date, notes, created_at
```

`ON DELETE CASCADE` — om en användare raderas, raderas deras ansökningar automatiskt.

---

## Styrkor

- **Tydlig separation** mellan frontend och backend
- **JWT-autentisering** med bcrypt-hashning ger säker inloggning
- **Zustand** gör global state enkel att läsa och uppdatera utan boilerplate. Ingen risk för prop drilling. 
- **Drizzle ORM** som ger typsäker databashantering med TypeScript
- **Filterval bevaras** vid navigering vilket ger bättre UX än lokalt state
- **Responsiv design** med en hamburger menu fungerar på alla skärmstorlekar
- **ProtectedRoute** skyddar känsliga sidor på ett återanvändbart sätt
- **Alla TypeScript-interfaces** samlade i `types.ts` för enkel återanvändning
- **Paginering** implementerad med en dedikerad `Pagination.tsx`-komponent:
  - Visar endast 12 jobb per sida för effektiv rendering
  - Återställer automatiskt till sida 1 när filter ändras
  - Döljer paginering om resultatet ryms på en sida
  - Visar alla sidnummer samt Previous/Next-knappar för snabb navigering

---

## Brister och förbättringsområden

- **Ingen Zod-validering** — inkommande data på backend valideras manuellt, Zod hade gett mer robust validering
- **localStorage för token** — HttpOnly cookies hade varit säkrare
- **Ingen refresh token** — JWT-token går ut efter 24h utan möjlighet att förnya automatiskt
- **Hårdkodade API-URL:er** — `http://localhost:3000` borde ligga i en miljövariabel i frontend
- **Begränsad felhantering** i frontend — felmeddelanden visas med `alert()` istället för ett snyggt UI
- - **Loading-state saknas i Zustand-stores** — asynkrona operationer som 
  `addApplication()` och `fetchApplications()` i Zustand-stores saknar laddningsindikator

## Extra uppgifter

- ✅ **Sparade jobb i Zustand** — `jobApplicationStore` med `savedJobIds` håller koll 
  på vilka jobb som sparats, `JobItem.tsx` uppdateras direkt utan sidomladdning
- ✅ **Animerad loader** — CSS-spinner animation visas vid datahämtning i `JobsPage`
- ✅ **Loading-state för asynkrona operationer** — `JobsPage` och `MyApplicationsPage` 
  visar laddningsindikator vid datahämtning
- ✅ **Skyddad route** — `/my-applications` är skyddad med `ProtectedRoute` och 
  redirectar till `/signin` om användaren inte är inloggad