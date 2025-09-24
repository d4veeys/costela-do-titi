'use client'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { Cart } from '@/components/Cart'
import { CustomizeModal } from '@/components/CustomizeModal'
import { CheckoutModal } from '@/components/CheckoutModal'
import { useCart } from '@/hooks/useCart'
import { PRODUCTS, getProductsByCategory, Product } from '@/lib/data'

export default function HomePage() {
  const [deliveryMode, setDeliveryMode] = useState<'local' | 'delivery'>('local')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customizeProduct, setCustomizeProduct] = useState<Product | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('sandwiches')
  
  const cart = useCart()

  const categories = [
    { id: 'sandwiches', name: 'Sanduíches', icon: '🍖' },
    { id: 'drinks', name: 'Bebidas', icon: '🥤' },
    { id: 'sides', name: 'Acompanhamentos', icon: '🍟' }
  ]

  const handleAddToCart = (product: Product) => {
    if (product.flavors && product.flavors.length > 0) {
      setCustomizeProduct(product)
    } else {
      cart.addItem(product)
    }
  }

  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  if (cart.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto animate-pulse">
            🍖
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        deliveryMode={deliveryMode}
        onDeliveryModeChange={setDeliveryMode}
        cartItemsCount={cart.itemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap
                ${activeCategory === category.id 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getProductsByCategory(activeCategory).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onCustomize={product.customizable ? setCustomizeProduct : undefined}
            />
          ))}
        </div>

        {/* Empty State */}
        {getProductsByCategory(activeCategory).length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Esta categoria não possui produtos no momento.
            </p>
          </div>
        )}
      </main>

      {/* Fixed Cart Button (Mobile) */}
      {cart.itemsCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transform transition-all duration-200 active:scale-95"
          >
            <div className="flex items-center space-x-2">
              <span>Carrinho: {cart.itemsCount}</span>
              <span>R$ {cart.subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </button>
        </div>
      )}

      {/* Modals */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CustomizeModal
        product={customizeProduct}
        isOpen={!!customizeProduct}
        onClose={() => setCustomizeProduct(null)}
        onAddToCart={(product, customizations, flavor) => {
          cart.addItem(product, customizations, flavor)
          setCustomizeProduct(null)
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        deliveryMode={deliveryMode}
        items={cart.items}
        subtotal={cart.subtotal}
        onOrderComplete={cart.clearCart}
        generateWhatsAppMessage={cart.generateWhatsAppMessage}
      />
    </div>
  )
}