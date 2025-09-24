'use client'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { CartItem } from '@/hooks/useCart'
import { formatPrice } from '@/lib/data'
import Image from 'next/image'

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  subtotal: number
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onProceedToCheckout: () => void
}

export function Cart({
  isOpen,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}: CartProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <ShoppingBag size={20} />
            <span>Seu Pedido</span>
            {items.length > 0 && (
              <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1">
                {items.length}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Carrinho vazio
              </h3>
              <p className="text-gray-600 mb-6">
                Adicione alguns deliciosos sanduíches ao seu pedido!
              </p>
              <button
                onClick={onClose}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex space-x-3">
                    {/* Image */}
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        '🍖'
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      
                      {item.flavor && (
                        <p className="text-sm text-gray-600 mb-1">
                          Sabor: {item.flavor}
                        </p>
                      )}

                      {item.customizations?.additionals && item.customizations.additionals.length > 0 && (
                        <p className="text-sm text-gray-600 mb-1">
                          + Adicionais
                        </p>
                      )}

                      {item.customizations?.notes && (
                        <p className="text-sm text-gray-600 mb-2 italic">
                          "{item.customizations.notes}"
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary-600">
                          {formatPrice(item.totalPrice * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors ml-2"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  )
}