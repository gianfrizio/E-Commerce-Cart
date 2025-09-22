import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children, products = [] }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      // ignora errori di persistenza su localStorage
    }
  }, [cart])

  function addToCart(productId) {
    setCart(prev => {
      const copy = [...prev]
      const found = copy.find(i => i.productId === productId)
      if (found) found.quantity++
      else copy.push({ productId, quantity: 1 })
      return copy
    })
  }

  function removeFromCart(productId) {
    setCart(prev => {
      const copy = [...prev]
      const idx = copy.findIndex(i => i.productId === productId)
      if (idx === -1) return copy
      if (copy[idx].quantity > 1) copy[idx].quantity--
      else copy.splice(idx, 1)
      return copy
    })
  }

  function clearCart() {
    setCart([])
  }

  function getTotal(passedProducts) {
    const prodList = passedProducts && passedProducts.length ? passedProducts : products
    return cart.reduce((sum, item) => {
      const p = prodList.find(x => x.id === item.productId)
      return sum + (p ? p.price * item.quantity : 0)
    }, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve essere usato all\'interno di CartProvider')
  return ctx
}
