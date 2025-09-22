import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    title: 'Product Catalog',
    products: 'Products',
    category: 'Category:',
    all: 'All',
  searchLabel: 'Search products',
  searchPlaceholder: 'Search products...',
    chooseFile: 'Choose file',
    noFileSelected: 'No file selected',
    categories: {
      'Carta e cancelleria': 'Paper & Stationery',
      'Accessori': 'Accessories',
      'Casa': 'Home',
      'Elettronica': 'Electronics',
      'Libri': 'Books',
      'Sport': 'Sports',
      'Cucina': 'Kitchen',
      'Abbigliamento': 'Clothing'
    },
    adminAdd: 'Admin: Add product',
    name: 'Name',
    price: 'Price',
    categoryLabel: 'Category',
    existingCategories: 'Existing categories:',
    imageUrlLabel: 'Image URL (required for web images)',
    imageFileLabel: 'Or upload image from your PC',
    uploaded: 'Uploaded:',
    addButton: 'Add Product',
  addToCart: 'Add to cart',
  remove: 'Remove',
  cartEmpty: 'Cart is empty',
    clearCart: 'Clear Cart',
    cart: 'Cart',
    total: 'Total',
    footer: 'Project: Interactive product catalog - learning exercise',
    invalidImage: 'Please select a valid image file',
    fileTooLarge: 'File is too large (max 2MB)',
    themeLabel: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    language: 'Language'
  },
  it: {
    title: 'Catalogo Prodotti',
    products: 'Prodotti',
    category: 'Categoria:',
    all: 'Tutte',
  searchLabel: 'Cerca prodotti',
  searchPlaceholder: 'Cerca prodotti...',
    chooseFile: 'Scegli file',
    noFileSelected: 'Nessun file selezionato',
    categories: {
      'Carta e cancelleria': 'Carta e cancelleria',
      'Accessori': 'Accessori',
      'Casa': 'Casa',
      'Elettronica': 'Elettronica',
      'Libri': 'Libri',
      'Sport': 'Sport',
      'Cucina': 'Cucina',
      'Abbigliamento': 'Abbigliamento'
    },
    adminAdd: 'Admin: Aggiungi prodotto',
    name: 'Nome',
    price: 'Prezzo',
    categoryLabel: 'Categoria',
    existingCategories: 'Categorie esistenti:',
    imageUrlLabel: "URL immagine (richiesto per immagini dal web)",
    imageFileLabel: 'Oppure carica immagine dal tuo PC',
    uploaded: 'Caricato:',
    addButton: 'Aggiungi Prodotto',
  addToCart: 'Aggiungi al Carrello',
  remove: 'Rimuovi',
  cartEmpty: 'Carrello vuoto',
    clearCart: 'Svuota Carrello',
    cart: 'Carrello',
    total: 'Totale',
    footer: 'Progetto: Catalogo prodotti interattivo - esercizio didattico',
    invalidImage: "Seleziona un file immagine valido",
    fileTooLarge: 'Il file è troppo grande (max 2MB)',
    themeLabel: 'Tema',
    themeLight: 'Chiaro',
    themeDark: 'Scuro',
    switchToLight: 'Passa a tema chiaro',
    switchToDark: 'Passa a tema scuro',
    language: 'Lingua'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem('lang')
      if (stored) return stored
      if (typeof navigator !== 'undefined') {
        const nav = navigator.language || navigator.userLanguage || 'en'
        return nav.startsWith('it') ? 'it' : 'en'
      }
    } catch (e) {}
    return 'en'
  })

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch (e) {}
  }, [lang])

  function t(key) {
    return (translations[lang] && translations[lang][key]) || translations['en'][key] || key
  }

  function tCategory(catKey) {
    return (translations[lang] && translations[lang].categories && translations[lang].categories[catKey]) || catKey
  }

  const value = { lang, setLang, t, tCategory }
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve essere usato dentro LanguageProvider')
  return ctx
}
