import React from 'react'
import Image from '../atoms/Image'
import Button from '../atoms/Button'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { t, tCategory } = useLanguage()
  return (
    <article className="product-card">
      <Image src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>€ {product.price} <span className="category">{tCategory(product.category)}</span></p>
      </div>
      <Button className="btn" onClick={() => addToCart(product.id)}>{t('addToCart')}</Button>
    </article>
  )
}
