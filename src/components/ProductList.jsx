import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ProductList({ products, search, category, onAdd }) {
  const { t } = useLanguage()
  const filter = (p) => {
    if (search && p.name.toLowerCase().indexOf(search.toLowerCase()) === -1) return false
    if (category && category !== 'all' && p.category !== category) return false
    return true
  }

  return (
    <div id="catalog" className="catalog-grid">
      {products.filter(filter).map(p => (
        <article key={p.id} className="product-card">
          <img src={p.imageUrl} alt={p.name} />
          <div className="product-info">
            <h3>{p.name}</h3>
            <p>€ {p.price}</p>
          </div>
          <button className="btn" onClick={() => onAdd(p.id)}>{t('addToCart')}</button>
        </article>
      ))}
    </div>
  )
}
