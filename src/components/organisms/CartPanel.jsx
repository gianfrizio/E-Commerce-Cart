import React from 'react'
import Button from '../atoms/Button'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'

export default function CartPanel({ products }) {
  const { cart, removeFromCart } = useCart()
  const { t } = useLanguage()
  if (cart.length === 0) return <div id="cart" className="cart-list"><p className="muted">{t('cartEmpty')}</p></div>

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
            <Button className="remove-btn" onClick={() => removeFromCart(item.productId)}>{t('remove')}</Button>
          </div>
        )
      })}
    </div>
  )
}
