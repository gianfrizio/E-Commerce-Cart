# E-Commerce Cart — React + Vite

A small interactive product catalog demo built with React and Vite. It includes product listing, search, category filtering, cart management and a minimal admin form to add products (in-memory).

---

## Italiano

Breve descrizione

Un'app dimostrativa che mostra un catalogo di prodotti, consente di cercare, filtrare per categoria, aggiungere prodotti al carrello e gestire il carrello (aggiungi, rimuovi, svuota). Include anche un pannello admin per aggiungere nuovi prodotti (i prodotti sono mantenuti solo in memoria durante la sessione).

Requisiti

- Node.js 16+ e npm
- Browser moderno

Avvio (sviluppo)

```bash
# installa dipendenze
npm install

# avvia il dev server (di solito http://localhost:5173)
npm run dev
```

Come provare

- Usa la barra di ricerca per filtrare i prodotti.
- Seleziona una categoria dal filtro per mostrare solo i prodotti di quella categoria.
- Aggiungi prodotti al carrello, modifica quantità e rimuovi elementi dal pannello carrello.
- Nel pannello admin puoi aggiungere un nuovo prodotto (nome, prezzo, categoria e immagine tramite URL o caricamento dal tuo PC).
- Cambia la lingua con il selettore IT/EN nell'header.
- Cambia il tema (scuro/chiaro) con il pulsante tema.

Localizzazione (i18n)

- Le traduzioni sono gestite in `src/context/LanguageContext.jsx`.
- Le stringhe UI vengono recuperate tramite `t('key')` e le categorie tramite `tCategory(categoryKey)`.
- Per aggiungere o modificare traduzioni, modifica i blocchi `en` e `it` in `LanguageContext.jsx` o estrai i file in `locales/` (opzionale).

Stili

- Gli stili principali si trovano in `src/styles/` (modularizzati in `variables.css`, `base.css`, `layout.css`, `components.css`, importati da `index.css`).
- Il tema scuro/chiaro utilizza CSS variables e viene applicato aggiungendo la classe `light-theme` al `body` quando la modalità chiara è attiva.

Dati di esempio

- I prodotti iniziali sono in `src/data/products.jsx`.
- Le categorie sono prese dal valore `category` di ogni prodotto. Le etichette vengono tradotte a runtime con `tCategory()`.

Note sull'implementazione

- Le immagini caricate dall'utente vengono lette come Data URL e salvate nell'oggetto prodotto in memoria.
- Il carrello è gestito da `src/context/CartContext.jsx` e persiste nello `localStorage` solo per sessione.

Contribuire

- Apri una branch, testa le modifiche e crea una pull request.
- Per piccole modifiche (testi, stili), puoi modificare direttamente i file sotto `src/`.

---

## English

Short description

A small demo app showing a product catalog with search, category filtering, cart management and a minimal admin form to add products (kept in memory). Good for learning React and basic UI patterns.

Requirements

- Node.js 16+ and npm
- Modern browser

Run (development)

```bash
# install dependencies
npm install

# start dev server (usually http://localhost:5173)
npm run dev
```

How to use

- Use the search bar to filter products by name.
- Select a category to filter by category.
- Add products to the cart, change quantities, remove items from the cart panel.
- Use the admin panel to add a new product (name, price, category and image via URL or upload from your PC).
- Switch language with the IT/EN selector in the header.
- Toggle theme (dark / light) with the theme button.

Localization (i18n)

- Translations live in `src/context/LanguageContext.jsx`.
- UI strings are accessed with `t('key')` and categories with `tCategory(categoryKey)`.
- To change or add translations, edit the `en` / `it` translation objects in `LanguageContext.jsx` or extract them to external `locales/` JSON files.

Styles

- Styles are in `src/styles/` (modular CSS files). The entry point is `src/styles/index.css`.
- Theme colors are CSS variables and the theme is switched by toggling `light-theme` on the `body`.

Sample data

- Initial products are in `src/data/products.jsx`.
- Categories are taken from product `category` values and translated at render time.

Implementation notes

- Uploaded images are read as Data URLs and stored on the product object in memory.
- Cart state is managed in `src/context/CartContext.jsx` and persisted in `localStorage` for the session.

Contributing

- Create a branch, run tests (if any), and open a PR.
- For text/style updates, edit files under `src/`.

---

If you want, I can:
- Extract translations into `locales/en.json` and `locales/it.json`.
- Add screenshots and a short demo GIF.
- Add a short test script or basic E2E smoke test.
