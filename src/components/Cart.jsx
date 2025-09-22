import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Cart({ cart, products, onRemove }) {
  const { t } = useLanguage()
  if (cart.length === 0) {
    return <div id="cart" className="cart-list"><p className="muted">{t('cartEmpty')}</p></div>
  }

  return (
    <div id="cart" className="cart-list">
      {cart.map(item => {
        const product = products.find(p => p.id === item.productId)
        if (!product) return null
        return (
          <div key={item.productId} className="cart-item">
            <div className="meta">
              <div>{product.name} x {item.quantity}</div>
              <div>€ {product.price * item.quantity}</div>
            </div>
            <button className="remove-btn" onClick={() => onRemove(item.productId)}>{t('remove')}</button>
          </div>
        )
      })}
    </div>
  )
}
