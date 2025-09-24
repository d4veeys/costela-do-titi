// src/hooks/useCart.ts
'use client'

import { useState, useEffect } from 'react'
import { Product, Additional, ADDITIONALS, formatPrice } from '@/lib/data'

export interface CartItem {
  id: string
  productId: string
  name: string
  description: string
  basePrice: number
  image?: string
  quantity: number
  customizations?: {
    additionals: string[]
    notes?: string
  }
  flavor?: string
  totalPrice: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar do localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('costela-titi-cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.warn('Erro ao carregar carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('costela-titi-cart', JSON.stringify(items))
      } catch (error) {
        console.warn('Erro ao salvar carrinho:', error)
      }
    }
  }, [items, isLoading])

  const calculateItemPrice = (
    basePrice: number, 
    additionals: string[] = []
  ): number => {
    let total = basePrice
    additionals.forEach(additionalId => {
      const additional = ADDITIONALS.find(a => a.id === additionalId)
      if (additional) {
        total += additional.price
      }
    })
    return total
  }

  const addItem = (
    product: Product, 
    customizations?: { additionals: string[], notes?: string },
    flavor?: string
  ) => {
    const totalPrice = calculateItemPrice(
      product.price, 
      customizations?.additionals
    )

    const cartItem: CartItem = {
      id: `${product.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      name: product.name,
      description: product.description,
      basePrice: product.price,
      image: product.image,
      quantity: 1,
      customizations,
      flavor,
      totalPrice
    }

    setItems(prev => [...prev, cartItem])
    
    return cartItem.id
  }

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0)
  }

  const getItemsCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const generateWhatsAppMessage = (customerData: any, deliveryMode: string) => {
    const subtotal = getSubtotal()
    const itemsCount = getItemsCount()
    
    let message = `🍖 *NOVO PEDIDO - Costela do Titi*\n\n`
    
    // Informações do cliente
    message += `👤 *Cliente:* ${customerData.name}\n`
    message += `📞 *Telefone:* ${customerData.phone}\n`
    message += `📋 *Tipo:* ${deliveryMode === 'local' ? 'Retirar no local' : 'Delivery'}\n\n`

    // Endereço (se delivery)
    if (deliveryMode === 'delivery' && customerData.address) {
      message += `📍 *Endereço:*\n`
      message += `${customerData.address.street}, ${customerData.address.number}`
      if (customerData.address.complement) {
        message += ` - ${customerData.address.complement}`
      }
      message += `\n${customerData.address.neighborhood} - ${customerData.address.city}/${customerData.address.state}`
      message += `\nCEP: ${customerData.address.cep}\n\n`
    }

    // Itens do pedido
    message += `🛒 *Itens (${itemsCount}):*\n`
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.quantity}x)\n`
      
      if (item.flavor) {
        message += `   🥤 Sabor: ${item.flavor}\n`
      }
      
      if (item.customizations?.additionals && item.customizations.additionals.length > 0) {
        const additionalNames = item.customizations.additionals
          .map(id => ADDITIONALS.find(a => a.id === id)?.name)
          .filter(name => name)
        
        if (additionalNames.length > 0) {
          message += `   + ${additionalNames.join(', ')}\n`
        }
      }
      
      if (item.customizations?.notes) {
        message += `   💬 "${item.customizations.notes}"\n`
      }
      
      message += `   💰 ${formatPrice(item.totalPrice * item.quantity)}\n\n`
    })

    // Total
    message += `💵 *TOTAL: ${formatPrice(subtotal)}*\n`
    
    if (deliveryMode === 'delivery') {
      message += `🚗 *Taxa de entrega:* A combinar\n`
    }

    // Observações gerais
    if (customerData.notes) {
      message += `\n📝 *Observações:*\n${customerData.notes}\n`
    }

    message += `\n🕒 *Pedido realizado em:* ${new Date().toLocaleString('pt-BR')}`

    return message
  }

  return {
    items,
    subtotal: getSubtotal(),
    itemsCount: getItemsCount(),
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    generateWhatsAppMessage
  }
}