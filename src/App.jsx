import React, { useEffect, useState, useRef } from 'react'
import SearchBar from './components/molecules/SearchBar'
import ProductGrid from './components/organisms/ProductGrid'
import CartPanel from './components/organisms/CartPanel'
import Button from './components/atoms/Button'

import initialProducts from './data/products'
import { CartProvider, useCart } from './context/CartContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
export default function App() {
  // i prodotti sono gestiti dentro InnerApp; per fornirli al CartProvider
  // inizializziamo i prodotti qui in modo da poterli passare come prop.
  const [products, setProducts] = useState(initialProducts)

  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider products={products}>
          <InnerApp products={products} setProducts={setProducts} />
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

function InnerApp({ products, setProducts }) {
  const { t, tCategory } = useLanguage()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const { cart, clearCart, getTotal } = useCart()

  useEffect(() => {
    // segnaposto se vogliamo persistere lo stato in futuro
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category)))

  function addProduct(product) {
    setProducts(prev => {
      const maxId = prev.reduce((m, p) => Math.max(m, p.id), 0)
      return [...prev, { ...product, id: maxId + 1 }]
    })
  }

  const total = getTotal(products)

  return (
    <div>
      <header>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', padding: '0 1rem'}}>
          <h1>{t('title')}</h1>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>
      <main className="container">
        <section id="catalog-section">
          <h2>{t('products')}</h2>
          <SearchBar value={search} onChange={e => setSearch(e.target.value)} />

          <div className="filter-bar">
            <label htmlFor="category-select">{t('category')}</label>
            <select id="category-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="all">{t('all')}</option>
              {categories.map(c => <option key={c} value={c}>{tCategory(c)}</option>)}
            </select>
          </div>

          <section id="admin-panel" className="admin-panel">
            <h3>{t('adminAdd')}</h3>
            <AddProductForm onAdd={addProduct} categories={categories} />
          </section>

          <ProductGrid products={products} search={search} category={category} />
        </section>

        <aside id="cart-section">
          <h2>{t('cart')}</h2>
          <div className="cart-controls">
            <Button id="clear-cart-btn" className="btn clear-btn" onClick={clearCart}>{t('clearCart')}</Button>
          </div>
          <CartPanel products={products} />
          <div id="total" className="total-area">{t('total')}: € {total}</div>
        </aside>
      </main>
      <footer>
        <p>{t('footer')}</p>
      </footer>
    </div>
  )
}

function AddProductForm({ onAdd, categories }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const { t, tCategory } = useLanguage()
  const fileInputRef = useRef()

  // gestisce l'upload di file dal PC dell'utente: converte in data URL
  function onFileChange(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
  // validazione di base: tipo immagine e dimensione massima 2MB
    if (!file.type.startsWith('image/')) {
      alert(t('invalidImage'))
      return
    }
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      alert(t('fileTooLarge'))
      return
    }
    const reader = new FileReader()
    reader.onload = function(ev) {
      setImageUrl(ev.target.result)
    }
    reader.readAsDataURL(file)
    setFileName(file.name)
  }

  function submit(e) {
    e.preventDefault()
    const p = { name: name.trim(), price: parseFloat(price), category: category.trim() || 'Generico', imageUrl: imageUrl.trim() || 'https://via.placeholder.com/180x120?text=No+Image' }
    if (!p.name || isNaN(p.price)) return
    onAdd(p)
    setName(''); setPrice(''); setCategory(''); setImageUrl('')
  }

  return (
    <form id="add-product-form" onSubmit={submit}>
      <div className="form-row">
        <label htmlFor="prod-name">{t('name')}</label>
        <input id="prod-name" value={name} onChange={e => setName(e.target.value)} type="text" required />
      </div>
      <div className="form-row">
        <label htmlFor="prod-price">{t('price')}</label>
        <input id="prod-price" value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" step="0.01" required />
      </div>
      <div className="form-row">
        <label htmlFor="prod-category">{t('categoryLabel')}</label>
        <input id="prod-category" value={category} onChange={e => setCategory(e.target.value)} type="text" list="category-list" required />
        <small id="category-hint" className="category-hint">{t('existingCategories')} {categories.map(c => tCategory(c)).join(', ')}</small>
        <datalist id="category-list">
          {categories.map(c => <option key={c} value={c} />)}
        </datalist>
      </div>
      <div className="form-row">
        <label htmlFor="prod-image-url">{t('imageUrlLabel')}</label>
        <input id="prod-image-url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} type="url" placeholder="https://..." />
        <div className="file-upload">
          <label>{t('imageFileLabel')}</label>
          <div className="file-controls">
            <input
              id="prod-image-file"
              ref={fileInputRef}
              onChange={onFileChange}
              type="file"
              accept="image/*"
              style={{display: 'none'}}
            />
            <button type="button" className="btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>{t('chooseFile')}</button>
            <small className="file-name">{fileName ? `${t('uploaded')} ${fileName}` : t('noFileSelected')}</small>
          </div>
        </div>
      </div>
      <div className="form-row form-actions">
        <button type="submit" className="btn">{t('addButton')}</button>
      </div>
    </form>
  )
}

// toggle per il tema scuro/chiaro
function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()
  const { t } = useLanguage()
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleTheme()
    }
  }

  return (
    <div className="theme-toggle">
      <button
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? t('switchToLight') : t('switchToDark')}
        title={isDark ? t('switchToLight') : t('switchToDark')}
        tabIndex={0}
        onKeyDown={handleKey}
        className={`theme-switch ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
      >
        <span className="switch-knob" />
        <SunIcon className="icon sun" aria-hidden />
        <MoonIcon className="icon moon" aria-hidden />
      </button>
    </div>
  )
}

function LanguageSelector() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className="lang-segment" role="tablist" aria-label={t('language')}>
      <button
        role="tab"
        aria-selected={lang === 'it'}
        className={`seg-btn ${lang === 'it' ? 'active' : ''}`}
        onClick={() => setLang('it')}
      >IT</button>
      <button
        role="tab"
        aria-selected={lang === 'en'}
        className={`seg-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
      >EN</button>
    </div>
  )
}
