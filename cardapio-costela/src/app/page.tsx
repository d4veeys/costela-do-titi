'use client'

import { PRODUCTS } from '@/lib/data'
import { useCart } from '@/hooks/useCart'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const { items, addItem, total, itemsCount } = useCart()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Costela do Titi</h1>
          <div className="flex items-center space-x-2">
            <span>Carrinho: {itemsCount}</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Products */}
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      </main>

      {/* Cart */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">{itemsCount} itens</div>
              <div className="font-bold">R$ {total.toFixed(2)}</div>
            </div>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
              onClick={() => {
                const message = `Olá! Gostaria de fazer o pedido:\n\n${items.map(item => `${item.quantity}x ${item.name}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`
                window.open(`https://wa.me/5569992588282?text=${encodeURIComponent(message)}`)
              }}
            >
              Finalizar pelo WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  )
}