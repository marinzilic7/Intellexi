# 📈 Tečajna Lista – Projektni Zadatak - Intellexi

Ova aplikacija omogućuje upravljanje i pregled tečajne liste valuta. Sastoji se od klijentskog i serverskog dijela te omogućuje sljedeće funkcionalnosti:

## 🔧 Backend funkcionalnosti

### ➕ Dohvat svih tečajnica
- **HTTP metoda:** `GET`
- **URI:** `/rates`
- **Opis:** Vraća sve tečajnice iz baze s mogućnošću:
  - Filtriranja po:
    - datumu (od, do, raspon)
    - šifri valute
    - nazivu valute
  - Paginacije
  - Sortiranja po datumu primjene

### 🔍 Dohvat pojedinačne tečajnice
- **HTTP metoda:** `GET`
- **URI:** `/rates/{id}`
- **Opis:** Dohvaća detalje tečajnice prema ID-u. Ako tečajnica ne postoji, vraća informaciju o pogrešci.

### 💾 Spremanje tečajnica
- **HTTP metoda:** `POST`
- **URI:** `/rates`
- **Opis:** Sprema novu tečajnicu u bazu ako ne postoji već za taj dan i valutu.

### 📝 Ažuriranje tečajnice
- **HTTP metoda:** `PUT`
- **URI:** `/rates/{id}`
- **Opis:** Ažurira podatke postojeće tečajnice (datum, valuta, tečajevi).

### 📝 Brisanje tečajnice
- **HTTP metoda:** `DELETE`
- **URI:** `/rates/{id}`
- **Opis:** Brisanje tečajnice iz baze.

### 🕒 Automatski unos tečajnica
- Svakog dana u **16:30** pokreće se job koji:
  - Dohvaća aktualne tečajnice s HNB API-ja
  - Sprema ih u bazu

## 💻 Frontend funkcionalnosti

### 📄 Pregled tečajnica
- Prikaz tečajnica u tablici
- Mogućnost filtriranja prema svim dostupnim kriterijima

### 📑 Detalji tečajnice
- Prikaz:
  - datuma
  - šifre valute
  - naziva valute
  - kupovni, srednji, prodajni tečaj

### ➕ Dodavanje nove tečajnice
- Forma za unos nove tečajnice s validacijom:
  - datum (dd.MM.yyyy.)
  - string vrijednosti za valutu i šifru
  - decimalni brojevi za tečajeve

### ✏️ Uređivanje i 🗑️ brisanje tečajnica
- Mogućnost uređivanja svih polja tečajnice
- Brisanje dostupno i u prikazu detalja i tabličnom pregledu

### 🔄 Kalkulator konverzije valuta
- Izračun konverzije iz jedne valute u drugu
- Odabir:
  - datuma tečaja
  - vrste tečaja (kupovni, srednji, prodajni)

### 📊 Grafički prikaz kretanja valute
- Prikaz kretanja srednjeg tečaja u odnosu na drugu valutu 
- Odabir vremenskog raspona:
  - posljednjih 7 dana
  - posljednjih 30 dana

## 🛠️ Tehnologije

### Frontend
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/) – za upravljanje rutama
- [Bootstrap](https://getbootstrap.com/) – za stilizaciju i responzivni dizajn
- [Recharts](https://recharts.org/) – grafički prikaz 

### Backend
- [Java](https://www.java.com/en/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [H2](https://www.h2database.com/html/main.html) (in-memory) baza podataka – koristi se za pohranu tečajnica bez potrebe za dodatnim setupom baze

### Ostalo
- Cron job – automatski unos tečajnica u 16:30
- API: Hrvatska narodna banka (HNB)
- **Docker** – kontejnerizacija aplikacije i baze podataka za jednostavno pokretanje i razvoj

## ▶️ Pokretanje projekta

Projekt možeš pokrenuti pomoću **Docker Compose** naredbe, što omogućuje jednostavnu instalaciju i konfiguraciju svih potrebnih servisa:

```bash
docker compose up

```


### URL ZA FRONTEND 
- **Frontend:** - *http://localhost:5173/*

*Napomena: Nakon pokretanja projekta, baza se automatski puni tečajnicama za današnji dan, kao i tečajnicama potrebnima za grafički prikaz za razdoblje od današnjeg dana unatrag 30 dana.*

