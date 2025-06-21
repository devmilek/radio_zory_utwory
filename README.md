# Radio Żory - System Rozliczeniowy Utworów

Aplikacja internetowa do zarządzania bazą danych utworów muzycznych z możliwością eksportu danych do arkusza kalkulacyjnego.

## Opis Projektu

Aplikacja została stworzona w celu zarządzania informacjami o utworach muzycznych. Umożliwia:

- Dodawanie nowych utworów do bazy danych
- Edycję istniejących utworów
- Usuwanie utworów z bazy danych
- Filtrowanie i wyszukiwanie utworów
- Eksport wybranych utworów do formatów CSV i JSON
- Wyświetlanie danych w paginowanej tabeli

## Struktura Bazy Danych

Aplikacja wykorzystuje prostą tabelę SQL bez relacji, zawierającą następujące pola:

- **id** - automatycznie generowany identyfikator
- **tytuł utworu** - nazwa utworu
- **wykonawca** - artysta wykonujący utwór
- **nazwa albumu** - album, na którym znajduje się utwór
- **autor tekstu** - osoba, która napisała tekst
- **kompozytor/autor muzyki** - twórca muzyki
- **czas trwania** - długość utworu w formacie min:sec
- **wydawca** - wydawca fonogramu
- **rok wydania** - rok publikacji
- **nr katalogowy fonogramu** - numer katalogowy całego albumu
- **nr katalogowy utworu** - numer katalogowy konkretnego utworu

## Technologie

- **Next.js** - framework React do budowy aplikacji webowych
- **Drizzle ORM** - ORM do zarządzania bazą danych
- **SQLite** - baza danych
- **TanStack Table** - biblioteka do tworzenia zaawansowanych tabel
- **nuqs** - zarządzanie parametrami URL do filtrowania
- **Bun** - runtime JavaScript (opcjonalnie Node.js)

## Instalacja i Uruchomienie

### Wymagania

- Node.js 18+ lub Bun
- Git

### Kroki instalacji

1. **Sklonuj repozytorium:**

```bash
git clone <url-repozytorium>
cd radio_zory_rozliczenia
```

2. **Skonfiguruj zmienne środowiskowe:**

```bash
# Zmień nazwę pliku z .example.env na .env
mv .example.env .env
```

3. **Zainstaluj zależności:**

```bash
# Używając Bun (zalecane)
bun install

# lub używając npm
npm install
```

4. **Utwórz bazę danych:**

```bash
# Używając Bun
bunx drizzle-kit push

# lub używając npm
npx drizzle-kit push
```

### Uruchomienie w trybie deweloperskim

```bash
# Używając Bun
bun run dev

# lub używając npm
npm run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000)

### Budowanie i uruchomienie produkcyjne

```bash
# Budowanie aplikacji
bun run build  # lub npm run build

# Uruchomienie wersji produkcyjnej
bun run start  # lub npm run start
```

## Funkcjonalności

### Zarządzanie Utworami

- **Dodawanie:** Kliknij przycisk "Dodaj utwór" aby dodać nowy rekord
- **Edycja:** Kliknij ikonę edycji przy wybranym utworze
- **Usuwanie:** Kliknij ikonę kosza aby usunąć utwór

### Filtrowanie i Wyszukiwanie

- Użyj paska wyszukiwania do filtrowania utworów
- Zastosuj filtry zaawansowane dostępne w interfejsie tabeli
- Parametry filtrowania są zapisywane w URL

### Eksport Danych

- Wybierz utwory za pomocą checkboxów
- Kliknij przycisk "Eksportuj"
- Dostępne formaty: CSV, JSON
- Każde pole jest eksportowane do osobnej kolumny

### Paginacja

- Nawiguj przez strony za pomocą kontrolek paginacji
- Zmień liczbę elementów na stronę
- Przejdź bezpośrednio do konkretnej strony

## Wsparcie

Aplikacja jest przygotowana do uruchomienia lokalnego i nie wymaga żadnych zabezpieczeń ani logowania. Wszystkie dane są przechowywane lokalnie w pliku SQLite.
