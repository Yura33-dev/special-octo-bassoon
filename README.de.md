# 🌱 ProGround - E-Commerce-Plattform

**🌐 Sprachen / Languages:**

- [🇬🇧 English](README.md)

---

Moderne vollständig ausgestattete E-Commerce-Plattform für den Verkauf von Samen
und Pflanzenschutzprodukten mit einem administrativen Content-Management-Panel.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Hauptmerkmale](#-hauptmerkmale)
- [Technologie-Stack](#-technologie-stack)
- [Projektstruktur](#-projektstruktur)
- [Hauptfunktionen](#-hauptfunktionen)
- [Entwicklung](#-entwicklung)

## 🎯 Über das Projekt

ProGround ist ein modernes E-Commerce-Projekt, das für den Verkauf von Samen und
Pflanzenschutzprodukten entwickelt wurde. Das Projekt umfasst einen vollständig
ausgestatteten Online-Shop für Kunden und ein leistungsstarkes
Administrationspanel zur Verwaltung von Inhalten, Bestellungen und
Einstellungen.

Das Projekt unterstützt Mehrsprachigkeit (Ukrainisch und Russisch), verfügt über
ein responsives Design und ist für Suchmaschinen optimiert.

## ✨ Hauptmerkmale

### 🛒 Online-Shop

- **Produktkatalog** mit detaillierten Informationen zu jedem Produkt
- **Kategoriesystem** mit Unterstützung für verschachtelte Kategorien
- **Produktfilterung** nach verschiedenen Parametern (Hersteller, Eigenschaften
  usw.)
- **Warenkorb** mit Zustandsspeicherung in localStorage
- **Bestellabwicklung** mit Auswahl der Liefer- und Zahlungsmethode
- **Produktvergleich** für eine bequeme Auswahl
- **Produktsuche** im Katalog
- **Responsives Design** für alle Geräte

### 👨‍💼 Administrationspanel

- **Produktverwaltung** (Erstellen, Bearbeiten, Löschen)
- **Kategorieverwaltung** mit Unterstützung für hierarchische Struktur
- **Herstellerverwaltung**
- **Filterverwaltung** für den Katalog
- **Bestellverwaltung** mit Archivierungsfunktion
- **Verpackungsverwaltung** mit Preisvarianten
- **Banner- und Sliderverwaltung** für die Startseite
- **Website-Einstellungen** und SEO-Parameter
- **Bildupload** zu AWS S3

### 🌍 Internationalisierung

- Unterstützung für **Ukrainisch** und **Russisch**
- Automatische Erkennung der Benutzersprache
- Sprachumschaltung mit Kontexterhaltung
- Lokalisierte URLs

### 🔐 Sicherheit und Authentifizierung

- Integration mit **Clerk** für die Benutzerverwaltung
- Geschützte Routen für das Administrationspanel
- Datenvalidierung auf Client und Server

## 🛠 Technologie-Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[DaisyUI](https://daisyui.com/)**
- **[Framer Motion](https://www.framer.com/motion/)**
- **[Swiper](https://swiperjs.com/)**
- **[React Quill](https://github.com/zenoamaro/react-quill)**
- **[Formik](https://formik.org/)** + **[Yup](https://github.com/jquense/yup)**
- **[Zustand](https://github.com/pmndrs/zustand)**
- **[next-intl](https://next-intl-docs.vercel.app/)**
- **[Sonner](https://sonner.emilkowal.ski/)**
- **[Lucide React](https://lucide.dev/)**

### Backend

- **[MongoDB](https://www.mongodb.com/)**
- **[Mongoose](https://mongoosejs.com/)**
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)**
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)**

### Infrastruktur und Dienste

- **[AWS S3](https://aws.amazon.com/s3/)**
- **[Clerk](https://clerk.com/)**
- **[Google Tag Manager](https://tagmanager.google.com/)**

### Entwicklungstools

- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[Husky](https://typicode.github.io/husky/)**
- **[lint-staged](https://github.com/okonet/lint-staged)**
- **[Yarn](https://yarnpkg.com/)**

## 📁 Projektstruktur

```
graund-a-new/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Lokalisierte Routen
│   │   ├── (admin)/             # Administrationspanel
│   │   │   ├── dashboard/       # Admin-Seiten
│   │   │   └── _components/     # Admin-Komponenten
│   │   └── (shop)/               # Online-Shop
│   │       ├── catalog/          # Produktkatalog
│   │       ├── checkout/         # Bestellabwicklung
│   │       ├── compare/          # Produktvergleich
│   │       └── _components/      # Shop-Komponenten
│   └── api/                      # API-Routen
├── components/                   # Gemeinsame Komponenten
│   └── shared/                   # Wiederverwendbare Komponenten
├── lib/                          # Utilities und Helfer
│   ├── actions/                  # Server Actions
│   ├── api/                      # API-Funktionen
│   ├── config/                   # Konfiguration
│   ├── constants/                # Konstanten
│   ├── hooks/                    # React Hooks
│   ├── utils/                    # Utilities
│   └── validations/              # Validierungsschemas
├── models/                       # Mongoose-Modelle
├── providers/                    # React Provider (Zustand Stores)
├── types/                        # TypeScript-Typen und -Schnittstellen
├── translations/                 # Übersetzungsdateien (ru.json, uk.json)
├── i18n/                         # Internationalisierungskonfiguration
└── public/                       # Statische Dateien
```

## 🎨 Hauptfunktionen

### Produktverwaltung

- Erstellen und Bearbeiten von Produkten mit mehrsprachigem Inhalt
- Bildupload zu AWS S3
- Konfiguration von Verpackungsvarianten und Preisen
- Verknüpfung mit Kategorien und Herstellern
- Konfiguration von Filtern für Produkte
- Verwaltung von Sichtbarkeit und Labels (Top, Sale)

### Kategorieverwaltung

- Hierarchische Kategoriestruktur (übergeordnete und untergeordnete Kategorien)
- Mehrsprachige Namen und Beschreibungen
- SEO-Einstellungen für jede Kategorie
- Kategoriebild-Upload
- Kategoriesortierung

### Bestellsystem

- Anzeige aller Bestellungen
- Detaillierte Bestellinformationen
- Änderung des Bestellstatus
- Archivierung von Bestellungen
- Filterung und Suche nach Bestellungen

### Warenkorb

- Produkte zum Warenkorb hinzufügen
- Änderung der Produktmengen
- Auswahl der Verpackungsvariante
- Speicherung des Warenkorbs in localStorage
- Berechnung der Gesamtkosten

### Bestellabwicklung

- Bestellformular mit Validierung
- Auswahl der Liefermethode
- Auswahl der Zahlungsmethode
- Senden der Bestellung an den Server
- Bestellbestätigung

## 💻 Entwicklung

### Code-Konventionen

- **TypeScript** wird für die Typisierung verwendet
- Befolgung der **ESLint**- und **Prettier**-Regeln
- Komponenten nach Funktionalität organisiert
- Server Actions für Server-Logik

### Git-Workflow

Das Projekt verwendet **Husky** für die automatische Code-Überprüfung vor dem
Commit. Alle `.ts`- und `.tsx`-Dateien werden automatisch vom Linter geprüft und
formatiert.

## 📝 Lizenz

Dieses Projekt ist privat und für den internen Gebrauch bestimmt.

## 👥 Kontakt

Bei Fragen und Anregungen kontaktieren Sie bitte per E-Mail:
yurii.kasian.25@gmail.com

---
