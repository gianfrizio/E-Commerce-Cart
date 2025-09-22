import React from 'react'
import ProductCard from '../molecules/ProductCard'

export default function ProductGrid({ products, search, category, onAdd }) {
  const filter = (p) => {
    if (search && p.name.toLowerCase().indexOf(search.toLowerCase()) === -1) return false
    if (category && category !== 'all' && p.category !== category) return false
    return true
  }

  return (
    <div id="catalog" className="catalog-grid">
      {products.filter(filter).map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  )
}
